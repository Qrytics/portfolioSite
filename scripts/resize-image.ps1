# Downscale a raster image in place-adjacent (writes to -Out), using only Windows' built-in
# System.Drawing. This exists because ffmpeg is not on PATH and the oversized-PNG work in the
# media plan is otherwise blocked: several images in `static/` are 3-5x larger than the size any
# CSS rule ever renders them at, which is pure wasted transfer on a phone.
#
# System.Drawing cannot write WebP or AVIF, so this is a resize-only tool. Resizing is the larger
# share of the win for the assets in question (a 750px source painted into a 160px box is a 4.7x
# oversample); re-encoding to WebP on top of it is a further gain to make once ffmpeg is present.
#
# Usage:
#   powershell -NoProfile -File scripts/resize-image.ps1 -In static/x.png -Out static/x-small.png -Width 320
#
# Height is derived from the source aspect ratio so nothing is ever distorted. If -Width is not
# smaller than the source, the script refuses rather than silently upscaling.

param(
    [Parameter(Mandatory = $true)][string]$In,
    [Parameter(Mandatory = $true)][string]$Out,
    [Parameter(Mandatory = $true)][int]$Width,
    # 'png' keeps the alpha channel; 'jpeg' is for opaque photographs and screenshots, where PNG's
    # lossless encoding costs 5-8x the bytes for no visible benefit. JPEG has no alpha, so anything
    # with transparency must stay png or it gains a black background.
    [ValidateSet('png', 'jpeg')][string]$Format = 'png',
    [ValidateRange(1, 100)][int]$Quality = 82
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$inPath = (Resolve-Path -LiteralPath $In).Path
$outPath = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $Out))

$src = [System.Drawing.Image]::FromFile($inPath)
try {
    # `-gt`, not `-ge`: passing the source's own width is a legitimate request, because it means
    # "re-encode without resampling" - which is the whole job for a photo that is already the right
    # number of pixels but was saved as PNG.
    if ($Width -gt $src.Width) {
        throw "Refusing to upscale: source is $($src.Width)px wide, requested $Width px."
    }

    $height = [int][Math]::Round($src.Height * ($Width / [double]$src.Width))
    $dst = New-Object System.Drawing.Bitmap $Width, $height

    try {
        $g = [System.Drawing.Graphics]::FromImage($dst)
        try {
            # HighQualityBicubic plus the matching pixel-offset mode is what keeps the edges of a
            # flat-colour graphic clean at this reduction; the default NearestNeighbor-ish path
            # produces visible stair-stepping on the arrow outlines.
            $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
            # Transparent source, transparent target: without this the alpha channel is composited
            # onto black and every one of these icons gains a dark halo on a light background. For
            # JPEG the same call has to lay down white instead, because JPEG drops alpha and would
            # otherwise flatten any transparent margin to black.
            if ($Format -eq 'jpeg') {
                $g.Clear([System.Drawing.Color]::White)
            } else {
                $g.Clear([System.Drawing.Color]::Transparent)
            }
            # `WrapMode = TileFlipXY` is not optional. The plain `DrawImage($src,0,0,w,h)` overload
            # lets the bicubic kernel sample past the source edge, where it finds the transparent
            # backdrop and blends it in - so a fully opaque input came out with a semi-transparent
            # 1-2px border (measured: alpha 255 -> 219). On a poster that means the page background
            # bleeding through the frame of every image. Clamping the sampler to a mirrored edge
            # keeps the border opaque.
            $attrs = New-Object System.Drawing.Imaging.ImageAttributes
            try {
                $attrs.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)
                $destRect = New-Object System.Drawing.Rectangle 0, 0, $Width, $height
                $g.DrawImage($src, $destRect, 0, 0, $src.Width, $src.Height,
                    [System.Drawing.GraphicsUnit]::Pixel, $attrs)
            } finally {
                $attrs.Dispose()
            }
        } finally {
            $g.Dispose()
        }

        if ($Format -eq 'jpeg') {
            # The quality level only takes effect through an EncoderParameters set; ImageFormat::Jpeg
            # on its own silently encodes at the default 75.
            $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
                Where-Object { $_.MimeType -eq 'image/jpeg' }
            $params = New-Object System.Drawing.Imaging.EncoderParameters 1
            $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
                [System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)
            try {
                $dst.Save($outPath, $codec, $params)
            } finally {
                $params.Dispose()
            }
        } else {
            $dst.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
        }
    } finally {
        $dst.Dispose()
    }

    $before = (Get-Item -LiteralPath $inPath).Length
    $after = (Get-Item -LiteralPath $outPath).Length
    $pct = [int][Math]::Round((1 - ($after / [double]$before)) * 100)
    # ASCII only: Windows PowerShell 5.1 reads .ps1 files as ANSI unless there is a BOM, so a UTF-8
    # em dash here is decoded as mojibake that includes a quote character and breaks the parse.
    Write-Output "$In ($($src.Width)x$($src.Height), $before B) -> $Out (${Width}x${height}, $after B) - $pct% smaller"
} finally {
    $src.Dispose()
}
