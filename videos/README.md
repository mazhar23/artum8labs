# Hero Video Background Directory

This directory contains the video files used for the hero section background video.

## How to Add Your Hero Video:

1. **Add your video files** to this directory:
   - `hero-background.mp4` (primary video file)
   - `hero-background.webm` (optional, for better browser support)

2. **Video Specifications:**
   - **Format:** MP4 (H.264) and/or WebM
   - **Resolution:** 1920x1080 (Full HD) or higher
   - **Duration:** 10-30 seconds (will loop seamlessly)
   - **File Size:** Keep under 10MB for optimal loading
   - **Content:** Tech-focused, professional, subtle movement

3. **Optional Poster Image:**
   - Add `../images/hero-poster.jpg` for loading states
   - **Format:** JPG or PNG
   - **Resolution:** 1920x1080
   - **Content:** Static frame from your video

## Video Features Implemented:

✅ **Full-Screen Background Video**
- Auto-play, muted, looping
- 30% opacity for text readability
- Hardware acceleration enabled

✅ **Smart Video Overlay System**
- Gradient overlay (black/70 to black/80)
- Backdrop blur integration
- Optimal text contrast maintained

✅ **Professional Implementation**
- Poster image fallback
- Multiple video format support
- Accessibility compliance
- Reduced motion support

✅ **Cross-Platform Compatibility**
- Desktop: Full cinematic experience
- Mobile: Optimized with playsInline
- Low-bandwidth: Graceful poster fallback

## Current Setup:
- Video positioned behind hero content
- 30% opacity with gradient overlays
- Seamless looping animation
- Enhanced particle effects over video

Simply drop your MP4 video file as `hero-background.mp4` in this directory, and it will automatically appear as the hero background!