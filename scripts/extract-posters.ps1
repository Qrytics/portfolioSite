# Extract first frame from each MP4 in static/gifs/ as poster PNG.
# Requires ffmpeg on PATH. Run from repo root: .\scripts\extract-posters.ps1

$gifsDir = Join-Path $PSScriptRoot "..\static\gifs"
$mp4s = Get-ChildItem -Path $gifsDir -Filter "*.mp4"

foreach ($mp4 in $mp4s) {
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($mp4.Name)
    $posterPath = Join-Path $gifsDir "$baseName-poster.png"
    Write-Host "Extracting poster: $($mp4.Name) -> $baseName-poster.png ..."
    & ffmpeg -y -i $mp4.FullName -vframes 1 -q:v 2 $posterPath 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  Done."
    } else {
        Write-Host "  Failed (exit code $LASTEXITCODE)"
    }
}

Write-Host "`nPosters saved to static/gifs/*-poster.png"
