[CmdletBinding()]
param(
  [string]$Version,
  [string]$AppAsarPath
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$manifestPath = Join-Path $PSScriptRoot "patch-manifest.json"
$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json

if (-not $AppAsarPath) {
  $AppAsarPath = Join-Path $PSScriptRoot "app.asar"
}

if (-not $Version) {
  $Version = $manifest.patchVersion
}

$resolvedAsar = (Resolve-Path -LiteralPath $AppAsarPath).Path
$actualHash = (Get-FileHash -LiteralPath $resolvedAsar -Algorithm SHA256).Hash
if ($actualHash -ne $manifest.patchedSha256) {
  throw "app.asar SHA-256이 patch-manifest.json과 다릅니다. 매니페스트를 갱신하고 다시 시도하세요."
}

$releaseDir = Join-Path $PSScriptRoot "release"
$stageDir = Join-Path $releaseDir ("stage-" + [guid]::NewGuid().ToString("N"))
$resourcesDir = Join-Path $stageDir "resources"
$licensesDir = Join-Path $stageDir "licenses"
$safeVersion = $Version -replace '[^0-9A-Za-z._-]', '-'
$zipPath = Join-Path $releaseDir "AntimatterDimensions_KoreanPatch_$safeVersion.zip"

New-Item -ItemType Directory -Force -Path $resourcesDir, $licensesDir | Out-Null
Copy-Item -LiteralPath $resolvedAsar -Destination (Join-Path $resourcesDir "app.asar")
Copy-Item -LiteralPath (Join-Path $repoRoot "README.md") -Destination (Join-Path $stageDir "README.md")
Copy-Item -LiteralPath (Join-Path $PSScriptRoot "README.txt") -Destination (Join-Path $stageDir "한글패치_설치방법.txt")
Copy-Item -LiteralPath (Join-Path $repoRoot "ATTRIBUTION.md") -Destination (Join-Path $stageDir "ATTRIBUTION.md")
Copy-Item -LiteralPath (Join-Path $repoRoot "public\licenses\Galmuri-OFL-1.1.txt") `
  -Destination (Join-Path $licensesDir "Galmuri-OFL-1.1.txt")
Copy-Item -LiteralPath $manifestPath -Destination (Join-Path $stageDir "patch-manifest.json")

if (Test-Path -LiteralPath $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}

Compress-Archive -Path (Join-Path $stageDir "*") -DestinationPath $zipPath -CompressionLevel Optimal
Remove-Item -LiteralPath $stageDir -Recurse -Force

Write-Host "배포 ZIP 생성 완료: $zipPath"
Write-Host "app.asar SHA-256: $actualHash"
