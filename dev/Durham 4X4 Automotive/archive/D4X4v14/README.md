Durham 4x4 Automotive v14 (Video Hero)

 Purpose: Showcase a self-hosted hero background video while keeping v12 layout and spacing intact.
 Key differences from v12:
  - Uses a `<video class="hero-video">` layered behind `.hero-overlay` inside `.hero-media`.
  - Keeps `.hero` and `.hero-overlay` min-height: `calc(100vh - 140px)` to match v12.
  - Reuses v12 images via `../D4X4v12/img/...` to avoid duplication.

 Current behavior (placeholder-only mode):
  - Uses CC0 placeholder clips (MDN flower) for both mobile and desktop sources.
  - Honors user preferences: video is hidden for `prefers-reduced-motion` and disabled for `Save-Data`.
  - Pauses when off-screen and when the tab is hidden; resumes when visible.

 Recommended final sources (best compatibility):
  - MP4 (H.264) and WebM (VP9/AV1), provided in 720p (mobile) and 1080p (desktop).

 Add your encoded files to `dev/Durham 4X4 Automotive/D4X4v14/img/` and then uncomment the project `<source>` tags in `index.html` and remove the placeholder sources.

 Encoding with ffmpeg (macOS):

 MP4 (1080p, 30fps, faststart, muted):
 ```bash
 ffmpeg -i input.mov -an -c:v libx264 -profile:v high -pix_fmt yuv420p -movflags +faststart -vf "scale=1920:-2,fps=30" -crf 22 -preset veryfast your-video-1080p.mp4
 ```

 WebM (VP9):
 ```bash
 ffmpeg -i input.mov -an -c:v libvpx-vp9 -b:v 0 -crf 32 -pix_fmt yuv420p -vf "scale=1920:-2,fps=30" your-video-1080p.webm
 ```

 Notes:
 - Place files in `dev/Durham 4X4 Automotive/D4X4v14/img/` and add `<source>` entries in `index.html`. Browsers pick the first compatible source.
 - For bandwidth and performance, consider serving videos from a CDN (Cloudflare/Bunny/S3+CloudFront). GitHub Pages can serve small videos but isn’t ideal for large media or spikes.
 - A poster image is used as a fallback; reduced motion users won’t see the video (`@media (prefers-reduced-motion: reduce)`).

Authoring guidelines (produce a great hero loop)
- Duration: 6–12 seconds, seamless loop if possible (trim start/end to avoid jumps).
- Composition: Action centered; keep key content within the central 60% to avoid cropping from `object-fit: cover`.
- Resolution: Target 1920×1080 (1080p). Also produce a 1280×720 (720p) mobile-friendly version.
- Framerate: 24–30 fps (match source; avoid 60 fps unless necessary).
- Codecs:
    - MP4: H.264 (high profile), yuv420p. Leave audio off (`-an`) for autoplay.
    - WebM: VP9 (or AV1 if you’re comfortable), yuv420p.
- Bitrate/quality:
    - MP4: CRF 20–24 with `-preset veryfast` to `slow` depending on build time; expect ~3–8 MB for ~10s 1080p.
    - WebM: CRF 28–34 with 2-pass or `-b:v 0` CQ mode; similar or smaller than MP4.
- Flags: `-movflags +faststart` for MP4 to move moov atom to file head.
- Looping: Avoid hard cuts; crossfade, boomerang, or match first/last frame to minimize seams.
- Autoplay: Keep it muted and short; audio is intentionally omitted.

Swapping in your final files
1) Export these files into `dev/Durham 4X4 Automotive/D4X4v14/img/`:
   - `your-video-720p.mp4`, `your-video-720p.webm`
   - `your-video-1080p.mp4`, `your-video-1080p.webm`
2) In `index.html`, uncomment the four project `<source>` tags (720p/1080p MP4/WebM) and remove the MDN placeholder sources.
3) Verify playback in current Safari, Chrome, and Firefox on macOS and iOS.

Mobile/desktop variants (recommended)
- 720p (mobile): 1280×720 at 24–30 fps; names: `your-video-720p.{mp4,webm}`
- 1080p (desktop): 1920×1080 at 24–30 fps; names: `your-video-1080p.{mp4,webm}`

ffmpeg presets
- 720p MP4:
```bash
ffmpeg -i input.mov -an -c:v libx264 -profile:v high -pix_fmt yuv420p -movflags +faststart -vf "scale=1280:-2,fps=30" -crf 22 -preset veryfast your-video-720p.mp4
```
- 720p WebM:
```bash
ffmpeg -i input.mov -an -c:v libvpx-vp9 -b:v 0 -crf 32 -pix_fmt yuv420p -vf "scale=1280:-2,fps=30" your-video-720p.webm
```
- 1080p MP4:
```bash
ffmpeg -i input.mov -an -c:v libx264 -profile:v high -pix_fmt yuv420p -movflags +faststart -vf "scale=1920:-2,fps=30" -crf 22 -preset veryfast your-video-1080p.mp4
```
- 1080p WebM:
```bash
ffmpeg -i input.mov -an -c:v libvpx-vp9 -b:v 0 -crf 32 -pix_fmt yuv420p -vf "scale=1920:-2,fps=30" your-video-1080p.webm
```

Example source block (mobile-first, no MOV fallback)
```html
<video class="hero-video" autoplay muted playsinline loop preload="metadata" poster="../D4X4v12/img/durham-4x4-automotive.jpg">
    <!-- Mobile -->
    <source src="img/your-video-720p.webm" type="video/webm" media="(max-width: 767px)">
    <source src="img/your-video-720p.mp4" type="video/mp4" media="(max-width: 767px)">
    <!-- Desktop -->
    <source src="img/your-video-1080p.webm" type="video/webm" media="(min-width: 768px)">
    <source src="img/your-video-1080p.mp4" type="video/mp4" media="(min-width: 768px)">
    Your browser does not support the video tag.
    </video>
```
