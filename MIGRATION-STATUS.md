# SlowBike Gubbio - Wix to Open Source Migration Status

## 📊 Current Status: Demo Created, Awaiting Decision

### ✅ What's Been Done

1. **Analyzed Wix HTML Structure**
   - Extracted all CSS (2657 lines) from `pagine/wixpages/home.html`
   - Identified Wix "Thunderbolt" framework usage
   - Cataloged all 27 images from Wix CDN
   - Created extraction utility (`extract_wix_content.py`)

2. **Created Standalone Demo** 
   - Built `home-standalone-demo.html` as proof of concept
   - Shows how a clean, standalone version looks
   - No Wix dependencies whatsoever
   - Maintains same visual style and brand colors

### 🎨 Demo Features

The demo page includes:
- ✅ Responsive header with navigation
- ✅ Hero section: "pedala con noi nel territorio di Gubbio"
- ✅ 6 route cards with images and descriptions
- ✅ Partners section
- ✅ Footer
- ✅ Mobile responsive
- ✅ Smooth animations and transitions
- ✅ Clean, maintainable code

### 🤔 Decision Needed: Two Approaches

#### Option A: Clean Rebuild (RECOMMENDED) ⭐
**What I've demonstrated with the demo**

Pros:
- ✅ Clean, readable HTML/CSS/JS
- ✅ Full control over functionality
- ✅ Easy to maintain and update
- ✅ Modern best practices
- ✅ No Wix framework bloat
- ✅ Proven to work (demo exists!)

Cons:
- ⏱️ Requires manual recreation of each page
- ⏱️ Need to verify visual match with original

Effort: Medium (but sustainable long-term)

#### Option B: Extract Wix JavaScript
**Try to make existing Wix code work standalone**

Pros:
- 🔍 Preserves exact Wix functionality

Cons:
- ❌ Very complex (56 script blocks)
- ❌ Depends on Wix "Thunderbolt" framework
- ❌ Hard to debug when issues arise
- ❌ Difficult to maintain
- ❌ May still need Wix CDN/services

Effort: High (with high technical debt)

### 📋 Next Steps (If Option A Chosen)

1. **Replace Index Page**
   - Remove iframe from `index.html`
   - Integrate standalone home page
   - Keep preloader animation

2. **Create All Subpages** (11 pages total)
   - percorsi.html
   - blog.html (needs blog system)
   - contattaci.html (contact form)
   - bevelle.html, bevello.html
   - laghetti-scagliae.html
   - mauretta.html
   - montecucco.html
   - tourcastelli.html
   - valdichiascio.html

3. **Handle Assets**
   - Download images to `/images` folder
   - Or keep on Wix CDN (they'll keep working)

4. **Blog System**
   - Create simple static blog
   - Or use lightweight CMS

5. **Testing**
   - Visual comparison with original
   - Cross-browser testing
   - Mobile testing
   - Performance optimization

### 📊 Estimated Timeline (Option A)

- Home page integration: 1-2 hours
- Each subpage: 1-2 hours (11 pages = 11-22 hours)
- Blog system: 3-5 hours
- Testing & refinement: 5-10 hours
- **Total: ~20-40 hours of work**

### 🖼️ What I Need From You

1. **Choose Option A or B**
2. **Screenshot** of the live site for visual reference
3. **Priority order** for pages (if phased approach preferred)
4. **Blog content** - how many posts? how to export?
5. **Asset preference** - download locally or keep on Wix CDN?

### 📁 Files Created So Far

```
css/
  ├── extracted-wix.css (Wix CSS reference)
  └── standalone-home.css (Clean custom CSS)
js/
  ├── standalone-home.js (Clean custom JS)
images/
  └── wix-image-urls.txt (Catalog of images)
home-standalone-demo.html (Demo page)
extract_wix_content.py (Utility script)
```

### 🚀 Ready to Proceed

I'm ready to move forward as soon as you:
1. Confirm which option you prefer (I recommend Option A)
2. Provide the screenshot for visual reference
3. Answer the questions above

The demo proves that Option A works well and produces clean, maintainable code!
