param(
  [string]$GameDirectory
)

$ErrorActionPreference = "Stop"
$releaseDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path
$manifestPath = Join-Path $releaseDirectory "patch-manifest.json"
$packagePath = Join-Path $releaseDirectory "app.asar"

function Find-GameDirectory {
  param([string]$RequestedPath)

  if ($RequestedPath) {
    return [IO.Path]::GetFullPath($RequestedPath)
  }

  $candidates = [Collections.Generic.List[string]]::new()
  $candidates.Add("C:\Program Files (x86)\Steam\steamapps\common\Antimatter Dimensions")
  $candidates.Add("C:\Program Files\Steam\steamapps\common\Antimatter Dimensions")

  $steamRoots = @(
    "C:\Program Files (x86)\Steam",
    "C:\Program Files\Steam"
  )
  foreach ($steamRoot in $steamRoots) {
    $libraryFile = Join-Path $steamRoot "steamapps\libraryfolders.vdf"
    if (-not (Test-Path -LiteralPath $libraryFile)) { continue }
    $libraryText = Get-Content -LiteralPath $libraryFile -Raw
    foreach ($match in [regex]::Matches($libraryText, '"path"\s+"([^"]+)"')) {
      $libraryRoot = $match.Groups[1].Value.Replace('\\', '\')
      $candidates.Add((Join-Path $libraryRoot "steamapps\common\Antimatter Dimensions"))
    }
  }

  foreach ($candidate in $candidates | Select-Object -Unique) {
    if (Test-Path -LiteralPath (Join-Path $candidate "Antimatter Dimensions.exe")) {
      return [IO.Path]::GetFullPath($candidate)
    }
  }

  throw "Antimatter Dimensions 설치 폴더를 찾지 못했습니다. -GameDirectory 매개변수로 직접 지정하세요."
}

function Stop-GameProcesses {
  param([string]$ResolvedGameDirectory)

  $processes = Get-CimInstance Win32_Process | Where-Object {
    $_.ExecutablePath -and
    $_.ExecutablePath.StartsWith($ResolvedGameDirectory, [StringComparison]::OrdinalIgnoreCase)
  }
  foreach ($process in $processes) {
    Stop-Process -Id $process.ProcessId -Force
  }
}

if (-not (Test-Path -LiteralPath $manifestPath)) {
  throw "patch-manifest.json이 없습니다. 배포 파일을 다시 내려받으세요."
}
if (-not (Test-Path -LiteralPath $packagePath)) {
  throw "app.asar가 없습니다. 배포 파일을 다시 내려받으세요."
}

$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
$resolvedGameDirectory = Find-GameDirectory $GameDirectory
$resourcesDirectory = Join-Path $resolvedGameDirectory "resources"
$installedAsar = Join-Path $resourcesDirectory "app.asar"
$originalBackup = Join-Path $resourcesDirectory "app.asar.korean-original"
$temporaryAsar = Join-Path $resourcesDirectory "app.asar.korean-installing"
$sidecarDirectory = Join-Path $resourcesDirectory "app.asar.unpacked\node_modules\greenworks"

if (-not (Test-Path -LiteralPath $installedAsar)) {
  throw "게임의 app.asar를 찾지 못했습니다: $installedAsar"
}
if (-not (Test-Path -LiteralPath $sidecarDirectory)) {
  throw "Greenworks 사이드카를 찾지 못했습니다. Steam에서 게임 파일 무결성을 검사한 뒤 다시 시도하세요."
}

$sidecarCount = @(Get-ChildItem -LiteralPath $sidecarDirectory -Recurse -File).Count
if ($sidecarCount -lt [int]$manifest.minimumGreenworksFiles) {
  throw "Greenworks 사이드카가 불완전합니다($sidecarCount개). Steam 파일 무결성 검사가 필요합니다."
}

$packageHash = (Get-FileHash -LiteralPath $packagePath -Algorithm SHA256).Hash
if ($packageHash -ne $manifest.patchedSha256) {
  throw "배포 app.asar의 해시가 일치하지 않습니다. 파일이 손상되었을 수 있습니다."
}

$installedHash = (Get-FileHash -LiteralPath $installedAsar -Algorithm SHA256).Hash
if ($installedHash -eq $manifest.patchedSha256) {
  Write-Host "한국어 패치 $($manifest.patchVersion)이(가) 이미 설치되어 있습니다."
  exit 0
}

$allowedOriginals = @($manifest.supportedOriginalSha256)
$hasValidBackup = $false
if (Test-Path -LiteralPath $originalBackup) {
  $backupHash = (Get-FileHash -LiteralPath $originalBackup -Algorithm SHA256).Hash
  $hasValidBackup = $allowedOriginals -contains $backupHash
  if (-not $hasValidBackup) {
    throw "기존 원본 백업의 해시가 지원 버전과 다릅니다. 백업을 덮어쓰지 않았습니다."
  }
}

if (-not ($allowedOriginals -contains $installedHash) -and -not $hasValidBackup) {
  throw "지원하지 않는 게임 버전이거나 app.asar가 이미 수정되어 있습니다. Steam 파일을 복구한 뒤 다시 시도하세요."
}

Stop-GameProcesses $resolvedGameDirectory

if (-not $hasValidBackup) {
  Copy-Item -LiteralPath $installedAsar -Destination $originalBackup
  $backupHash = (Get-FileHash -LiteralPath $originalBackup -Algorithm SHA256).Hash
  if (-not ($allowedOriginals -contains $backupHash)) {
    throw "원본 백업 검증에 실패했습니다. 설치를 중단합니다."
  }
}

Copy-Item -LiteralPath $packagePath -Destination $temporaryAsar -Force
$temporaryHash = (Get-FileHash -LiteralPath $temporaryAsar -Algorithm SHA256).Hash
if ($temporaryHash -ne $manifest.patchedSha256) {
  throw "임시 설치 파일 검증에 실패했습니다. 기존 게임 파일은 변경하지 않았습니다."
}
Copy-Item -LiteralPath $temporaryAsar -Destination $installedAsar -Force
Remove-Item -LiteralPath $temporaryAsar -Force

$finalHash = (Get-FileHash -LiteralPath $installedAsar -Algorithm SHA256).Hash
if ($finalHash -ne $manifest.patchedSha256) {
  throw "설치 후 검증에 실패했습니다. Restore-Original.cmd를 실행해 복구하세요."
}

Copy-Item -LiteralPath $manifestPath -Destination (Join-Path $resourcesDirectory "korean-patch-manifest.json") -Force
Write-Host "Antimatter Dimensions 한국어 패치 $($manifest.patchVersion) 설치가 완료되었습니다."
Write-Host "원본 백업: $originalBackup"

