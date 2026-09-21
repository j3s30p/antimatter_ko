param(
  [string]$GameDirectory
)

$ErrorActionPreference = "Stop"
$releaseDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path
$manifestPath = Join-Path $releaseDirectory "patch-manifest.json"

function Find-GameDirectory {
  param([string]$RequestedPath)

  if ($RequestedPath) { return [IO.Path]::GetFullPath($RequestedPath) }

  $candidates = [Collections.Generic.List[string]]::new()
  $candidates.Add("C:\Program Files (x86)\Steam\steamapps\common\Antimatter Dimensions")
  $candidates.Add("C:\Program Files\Steam\steamapps\common\Antimatter Dimensions")
  foreach ($steamRoot in @("C:\Program Files (x86)\Steam", "C:\Program Files\Steam")) {
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

$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
$resolvedGameDirectory = Find-GameDirectory $GameDirectory
$resourcesDirectory = Join-Path $resolvedGameDirectory "resources"
$installedAsar = Join-Path $resourcesDirectory "app.asar"
$originalBackup = Join-Path $resourcesDirectory "app.asar.korean-original"
$temporaryAsar = Join-Path $resourcesDirectory "app.asar.korean-restoring"

if (-not (Test-Path -LiteralPath $originalBackup)) {
  throw "복구용 원본 백업이 없습니다. Steam의 게임 파일 무결성 검사를 이용하세요."
}
$backupHash = (Get-FileHash -LiteralPath $originalBackup -Algorithm SHA256).Hash
if (-not (@($manifest.supportedOriginalSha256) -contains $backupHash)) {
  throw "원본 백업 해시가 지원 버전과 다릅니다. 안전을 위해 복구를 중단합니다."
}

$processes = Get-CimInstance Win32_Process | Where-Object {
  $_.ExecutablePath -and
  $_.ExecutablePath.StartsWith($resolvedGameDirectory, [StringComparison]::OrdinalIgnoreCase)
}
foreach ($process in $processes) {
  Stop-Process -Id $process.ProcessId -Force
}

Copy-Item -LiteralPath $originalBackup -Destination $temporaryAsar -Force
if ((Get-FileHash -LiteralPath $temporaryAsar -Algorithm SHA256).Hash -ne $backupHash) {
  throw "임시 복구 파일 검증에 실패했습니다. 기존 게임 파일은 변경하지 않았습니다."
}
Copy-Item -LiteralPath $temporaryAsar -Destination $installedAsar -Force
Remove-Item -LiteralPath $temporaryAsar -Force

if ((Get-FileHash -LiteralPath $installedAsar -Algorithm SHA256).Hash -ne $backupHash) {
  throw "복구 후 검증에 실패했습니다. Steam의 게임 파일 무결성 검사를 이용하세요."
}

Write-Host "Steam 원본 app.asar 복구가 완료되었습니다."
Write-Host "복구용 백업은 향후 사용을 위해 그대로 보존했습니다: $originalBackup"

