# Convert all GIFs in static/gifs/ to MP4 (smaller, faster to load).
# Requires ffmpeg on PATH. Install with: winget install Gyan.FFmpeg
# Run from repo root: .\scripts\gif-to-mp4.ps1

$gifsDir = Join-Path $PSScriptRoot "..\static\gifs"
$gifs = Get-ChildItem -Path $gifsDir -Filter "*.gif"

if ($gifs.Count -eq 0) {
    Write-Host "No GIF files found in static/gifs/"
    exit 0
}

foreach ($gif in $gifs) {
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($gif.Name)
    $mp4Path = Join-Path $gifsDir "$baseName.mp4"
    Write-Host "Converting $($gif.Name) -> $baseName.mp4 ..."
    & ffmpeg -y -i $gif.FullName -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" $mp4Path 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  Done: $baseName.mp4"
    } else {
        Write-Host "  Failed (exit code $LASTEXITCODE)"
    }
}

Write-Host "`nAll done. MP4s are in static/gifs/ alongside the originals."
