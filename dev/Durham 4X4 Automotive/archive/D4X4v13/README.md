Durham 4x4 Automotive v13 (Video Hero)

- Purpose: Showcase a drop-in video background for the hero while keeping v12 layout and spacing intact.
- Key differences from v12:
  - Adds a `<video class="hero-media">` element layered behind the `.hero-overlay`.
  - Keeps `.hero` and `.hero-overlay` min-height: `calc(100vh - 140px)` to match v12.
  - Uses v12 images by referencing `../D4X4v12/img/...` so no duplication needed.

Add your video files to `dev/Durham 4X4 Automotive/D4X4v13/img/` or update the `src` paths in `index.html` accordingly.
