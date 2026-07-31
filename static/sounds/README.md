# Sound Effects

This directory contains sound effects for the portfolio site.

## Required Sound Files

Download CC0 (public domain) sounds from [freesound.org](https://freesound.org) and place them here:

1. **tick.mp3** (~50ms, <15KB) - Short mechanical click for timeline reveals
   - Search: "mechanical click subtle" or "tick soft"
   - Example: https://freesound.org/search/?q=mechanical+click

2. **pop.mp3** (~100ms, <20KB) - Soft pop/bubble for GitHub confetti
   - Search: "bubble pop soft" or "pop subtle"
   - Example: https://freesound.org/search/?q=bubble+pop

3. **key.mp3** (~30ms, <10KB) - Mechanical keyboard click for typing test
   - Search: "keyboard mechanical" or "keypress"
   - Example: https://freesound.org/search/?q=keyboard+mechanical

4. **complete.mp3** (~200ms, <25KB) - Success chime for typing completion
   - Search: "success chime" or "positive notification"
   - Example: https://freesound.org/search/?q=success+chime

5. **start.mp3** (~150ms, <20KB) - Game start beep
   - Search: "retro game beep" or "8bit start"
   - Example: https://freesound.org/search/?q=8bit+beep

6. **gameover.mp3** (~300ms, <30KB) - Game over tone
   - Search: "game over 8bit" or "retro fail"
   - Example: https://freesound.org/search/?q=game+over+8bit

7. **click.mp3** (~40ms, <12KB) - UI click sound
   - Search: "ui click" or "button click"
   - Example: https://freesound.org/search/?q=ui+click

## Processing

After downloading, process with:
```bash
# Convert to MP3 (stereo, 128kbps)
ffmpeg -i input.wav -codec:a libmp3lame -b:a 128k -ac 2 output.mp3

# Normalize volume to -3dB
ffmpeg -i input.mp3 -filter:a "volume=-3dB" output.mp3

# Trim silence
ffmpeg -i input.mp3 -af silenceremove=1:0:-50dB output.mp3
```

## License

All sounds should be CC0 (public domain) or have compatible licensing.
Add attribution in this file if required by the license.

## Fallback

The site will function perfectly without sound files - they enhance the experience but are not required.
