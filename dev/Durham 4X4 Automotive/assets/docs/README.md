# Durham 4X4 Automotive Website Documentation

## Overview
Durham 4X4 Automotive is a professional automotive service website specializing in Jeep repairs, maintenance, and customizations. This documentation covers the complete website structure, functionality, and important implementation notes.

---

## 🏗️ **Website Architecture**

### **Version History & Structure**
- **Current Version**: v15 (Latest implementation)
- **Base Version**: Built upon v14 with video hero functionality
- **Legacy**: References v12 for image assets and layout consistency
- **File Structure**:
  ```
  Durham 4X4 Automotive/
  ├── D4X4v15/ (Current)
  │   ├── index.html (Main landing page)
  │   ├── common-problems.html (Jeep model guides)
  │   ├── css/
  │   │   ├── main.css (Primary styles)
  │   │   └── reset.css (CSS normalization)
  │   ├── img/ (Local image assets)
  │   └── README.md (This file)
  ├── D4X4v14/ (Video hero implementation)
  └── D4X4v12/ (Image assets reference)
  ```

---

## 🎨 **Key Design Features**

### **1. Video Hero Section** ⚠️ **CRITICAL IMPLEMENTATION**
- **Location**: Main hero section at top of homepage
- **Functionality**: Auto-playing background video with smart fallback
- **Important Notes**:
  - Video starts **completely hidden** (opacity: 0) to prevent flash
  - Only fades in when video is ready to play
  - Falls back to background image ONLY if video fails
  - Respects user preferences (Save-Data, reduced motion)

```html
<!-- Video implementation - DO NOT add poster attribute initially -->
<video class="hero-video" autoplay muted playsinline loop preload="auto" 
       disablepictureinpicture aria-hidden="true" 
       data-poster="../D4X4v12/img/durham-4x4-automotive.jpg">
  <!-- Sources here -->
</video>
```

**🚨 CRITICAL CSS Requirements**:
```css
.hero-media .hero-video {
  opacity: 0; /* Start hidden - prevents flash */
  transition: opacity 0.5s ease-in-out;
}

.hero.video-failed {
  background-image: url('../../D4X4v12/img/durham-4x4-automotive.jpg');
}
```

### **2. Modern Service Cards** 🎯 **LAYOUT SYSTEM**
- **Design**: Modern card-based layout with hover animations
- **Responsive Grid**: 
  - Mobile: Single column
  - Tablet (768px+): Two columns with special positioning
  - Desktop (1200px+): Two columns with special positioning

**Card Layout Structure**:
```html
<section class="feature-category-cards">
  <article class="service-card featured-card">   <!-- Top: Full width -->
    <h2>4x4 Suspension Lifts</h2>
  </article>
  <article class="service-card">                 <!-- Middle left -->
    <h2>Engine Diagnostics</h2>
  </article>
  <article class="service-card">                 <!-- Middle right -->
    <h2>Transmission Repair</h2>
  </article>
  <article class="service-card bottom-card">     <!-- Bottom: Full width -->
    <h2>Regular Maintenance</h2>
  </article>
</section>
```

**🎯 Special CSS Classes**:
- `.featured-card`: First card, full width, aspect-ratio: 2/1
- `.bottom-card`: Last card, full width, aspect-ratio: 8/3
- Regular cards: aspect-ratio: 16/10

### **3. Interactive Review Carousel** 🔄 **AUTO-ROTATING**
- **Auto-advance**: 15 seconds per review
- **Progress Bar**: Visual indicator of time remaining
- **Manual Control**: Dots for direct navigation
- **Accessibility**: Keyboard navigation support
- **Schema Markup**: Rich snippets for reviews

**⚠️ JavaScript Dependencies**:
```javascript
// Review carousel requires these elements:
// .review-card (individual reviews)
// .dot (navigation dots)
// #progressBar (progress indicator)
```

---

## 📱 **Responsive Design Breakpoints**

### **Mobile First Approach**
```css
/* Default: Mobile (< 768px) */
.feature-category-cards {
  grid-template-columns: 1fr;
}

/* Tablet (768px - 1199px) */
@media (min-width: 768px) {
  .feature-category-cards {
    grid-template-columns: 1fr 1fr;
  }
  /* Featured and bottom cards span full width */
  .featured-card, .bottom-card {
    grid-column: 1 / -1;
  }
}

/* Desktop (1200px+) */
@media (min-width: 1200px) {
  .menu-icon { display: none; }        /* Hide hamburger */
  .menu ul { display: flex; }          /* Show desktop nav */
}
```

---

## 🖼️ **Asset Management System**

### **Image Path Strategy**
- **Current Images**: Stored in `D4X4v15/img/`
- **Legacy Images**: Referenced from `../D4X4v12/img/`
- **Icons & Graphics**: SVG format preferred
- **Background Images**: JPG format, optimized for web

**🔧 Path Update Process**:
```bash
# Copy images from v12 to v15
cp "../D4X4v12/img/filename.jpg" "img/"

# Update references in CSS
# FROM: url('../../D4X4v12/img/filename.jpg')
# TO:   url('../img/filename.jpg')

# Update references in HTML
# FROM: src="../D4X4v12/img/filename.jpg"
# TO:   src="img/filename.jpg"
```

---

## 🎬 **Video Implementation Guide**

### **Current Status**: Using placeholder videos
- **Temporary Sources**: MDN CC0 flower videos
- **Final Implementation**: Replace with automotive content

### **Recommended Video Specifications**:
```bash
# Mobile version (720p)
ffmpeg -i input.mov -an -c:v libx264 -profile:v high -pix_fmt yuv420p \
       -movflags +faststart -vf "scale=1280:-2,fps=30" -crf 22 \
       -preset veryfast your-video-720p.mp4

# Desktop version (1080p)
ffmpeg -i input.mov -an -c:v libx264 -profile:v high -pix_fmt yuv420p \
       -movflags +faststart -vf "scale=1920:-2,fps=30" -crf 22 \
       -preset veryfast your-video-1080p.mp4
```

**🎯 Video Requirements**:
- **Duration**: 6-12 seconds, seamless loop
- **Audio**: None (muted for autoplay compliance)
- **Format**: MP4 (H.264) + WebM (VP9) for compatibility
- **Composition**: Center important content (avoid edges)

---

## 🧭 **Navigation System**

### **Desktop Navigation**
- **Logo**: Positioned absolutely, top-left
- **Phone Number**: Next to logo, clickable
- **Menu Items**: Horizontal pills with hover effects
- **Active State**: Red background for current page

### **Mobile Navigation** 📱 **HAMBURGER MENU**
- **Trigger**: Three-line hamburger icon
- **Animation**: Smooth slide-in from right
- **Layout**: Split design with contact info and menu
- **Auto-close**: Closes on link click or window resize

**🔧 JavaScript Requirements**:
```javascript
// Required elements:
// #menuIcon (hamburger button)
// #mobile-menu (slide-out menu)
// .hamburger (animated icon)
```

---

## 🎨 **Color Scheme & Branding**

### **CSS Custom Properties**:
```css
:root {
  --primary: #202020;           /* Dark background */
  --primary-red: #be0000;       /* Brand red (CTAs, active states) */
  --primary-black: #313133;     /* Content black */
  --primary-blue: #007ebe;      /* Accent blue (buttons) */
  --dark-gray: #666;            /* Secondary text */
}
```

### **Typography Stack**:
- **Primary**: "Roboto" (body text, most UI)
- **Headers**: "Oswald" (service card titles, contrasting elements)
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold)

---

## 📋 **Content Sections Guide**

### **1. Hero Section**
- **Primary Headline**: Catchy, personality-driven
- **Secondary Headline**: Service area and credibility
- **CTA Button**: "Book an Appointment" (primary action)

### **2. Service Cards**
- **Four Main Services**: Suspension, Engine, Transmission, Maintenance
- **Hover Effects**: Image scale, color changes, icon animation
- **CTA Links**: "Learn More" with arrow icons

### **3. Feature Article**
- **Brand Story**: Personal service, expertise, community
- **Secondary CTA**: "Get a Free Quote"

### **4. Customer Reviews** ⭐ **AUTO-ROTATING**
- **Schema Markup**: SEO-optimized review data
- **Star Ratings**: Visual 5-star display
- **Customer Info**: Name, vehicle, service type
- **Google CTA**: Link to leave reviews

### **5. Jeep Model Gallery**
- **Model Icons**: CJ, YJ, TJ, LJ, JK, JL generations
- **Links**: Connect to common-problems.html
- **Accessibility**: Proper alt text and ARIA labels

---

## 🔧 **Maintenance & Updates**

### **Regular Tasks**:
1. **Review Updates**: Add new customer testimonials
2. **Service Content**: Update service descriptions
3. **Image Optimization**: Compress new images
4. **Performance**: Monitor video loading times

### **Asset Updates**:
```bash
# When adding new images:
1. Place in D4X4v15/img/ directory
2. Update paths in HTML/CSS
3. Test on mobile and desktop
4. Verify accessibility alt text

# When updating videos:
1. Test autoplay functionality
2. Verify fallback background works
3. Check mobile performance
4. Test with Save-Data enabled
```

---

## 🚨 **Critical Implementation Notes**

### **⚠️ DO NOT**:
- Add `poster` attribute to video element initially
- Remove opacity transitions from video CSS
- Change video preload to "metadata" (use "auto")
- Remove error handling from video JavaScript

### **✅ ALWAYS ENSURE**:
- Video starts with opacity: 0
- Fallback background only shows on error
- Mobile navigation closes on window resize
- Review carousel has proper ARIA labels
- All images have meaningful alt text

### **🔍 Testing Checklist**:
- [ ] Video loads without flash
- [ ] Fallback background appears if video fails
- [ ] Cards display properly at all breakpoints
- [ ] Mobile menu opens/closes smoothly
- [ ] Review carousel auto-advances
- [ ] All links are functional
- [ ] Page loads quickly on mobile

---

## 📞 **Support & Contact Information**

### **Business Details**:
- **Phone**: (905) 435-9999
- **Service Area**: Durham Region/GTA
- **Specialization**: Jeep vehicles (all generations)
- **Services**: Repairs, maintenance, customizations

### **Technical Contact**:
For website updates or technical issues, refer to the development team or the original implementation documentation.

---

*Last Updated: September 2025*
*Version: 15.0*
*Status: Production Ready*tive v14 (Video Hero)

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
