# Aaron Mulvihill - Personal Website

A clean, modern personal website built with Jekyll, showcasing podcasts, financial writing, coding projects, videos, and photos.

## Quick Start

```bash
# Install dependencies
bundle install

# Run local development server
bundle exec jekyll serve

# Visit http://localhost:4000
```

## Tech Stack

- **Jekyll** - Static site generator
- **Liquid** - Templating language
- **CSS3** - Custom styling with CSS variables for theming
- **No JavaScript frameworks** - Vanilla JS for theme toggle and scrollspy
- **GitHub Pages compatible** - Can be deployed directly to GitHub Pages

## Project Structure

```
personal-site/
├── _data/
│   └── photos.yml              # Photo gallery data (edit to add/remove photos)
├── _includes/
│   ├── header.html             # Site header with navigation
│   ├── footer.html             # Site footer
│   └── scrollspy.html          # Side navigation menu
├── _layouts/
│   ├── default.html            # Base layout template
│   └── post.html               # Blog post layout
├── _posts/                     # Blog posts (Markdown files)
├── assets/
│   ├── css/
│   │   └── main.css            # All styles (CSS variables for theming)
│   ├── images/
│   │   ├── profile.jpg         # Profile picture (160x160px recommended)
│   │   ├── photos/             # Photo gallery images
│   │   ├── icon-linkedin.svg   # LinkedIn icon
│   │   └── icon-github.svg     # GitHub icon
│   └── js/                     # JavaScript files
├── _config.yml                 # Jekyll configuration
├── index.html                  # Homepage (main content)
├── writing.html                # Writing/blog page
└── Gemfile                     # Ruby dependencies
```

## Maintaining Your Website

### 1. Updating Profile Information

**Edit:** `index.html`

- **Profile text:** Lines 24-31 (name, tagline, bio)
- **Social links:** Lines 14-19 (LinkedIn, GitHub)
- **JPMorgan bio link:** Line 12

### 2. Job History

**Edit:** `index.html` lines 35-45

Add/remove job entries:
```html
<li><span class="year">2025 - Now:</span> Your Position @ Company</li>
```

### 3. Adding Podcasts

**Edit:** `index.html` podcast section (around line 55)

Add new podcast tile:
```html
<a href="YOUTUBE_URL" target="_blank" rel="noopener" class="podcast-tile">
  <img src="https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg" alt="Podcast episode">
  <div class="tile-content">
    <h3>Episode Title</h3>
  </div>
</a>
```

### 4. Financial Writing

**Edit:** `index.html` financial-writing section (around line 68)

Add new article:
```html
<li>
  <a href="ARTICLE_URL" target="_blank" rel="noopener">
    <h3>Article Title</h3>
    <p>Brief description of the article.</p>
    <span class="meta">Publication or Date</span>
  </a>
</li>
```

### 5. Coding Projects

**Edit:** `index.html` coding-projects section (around line 102)

Add new project card:
```html
<a href="PROJECT_URL" class="project-card">
  <h3>Project Name</h3>
  <p>Project description</p>
  <div class="tags">
    <span class="tag">Tech1</span>
    <span class="tag">Tech2</span>
  </div>
</a>
```

### 6. Videos

**Edit:** `index.html` videos section (around line 143)

Add new video:
```html
<a href="YOUTUBE_URL" target="_blank" rel="noopener" class="video-card">
  <img src="https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg" alt="Video thumbnail" class="video-thumbnail">
  <div class="video-content">
    <h3>Video Title</h3>
  </div>
</a>
```

### 7. Photos

**The easiest way to manage photos!**

1. Add image to `assets/images/photos/`
2. Edit `_data/photos.yml`:

```yaml
- image: photos/your-image.jpg
  caption: Description of what you're doing in the photo
  alt: Alt text for accessibility
  project: Project Name (optional)
```

See `PHOTOS_README.md` for detailed instructions.

### 8. Profile Picture

Replace `assets/images/profile.jpg` with your photo (recommended: 160x160px or larger, square aspect ratio).

### 9. GitHub Contributions Chart

**Auto-updates!** The chart automatically pulls your latest GitHub contributions via ghchart.rshah.org.

To change the color, edit `index.html` line 50:
```html
<!-- Change 0066cc to any hex color -->
<img src="https://ghchart.rshah.org/0066cc/moltovivo" ...>
```

## Styling & Theming

### Colors

**Edit:** `assets/css/main.css` (lines 2-28)

The site uses CSS variables for easy theming:

```css
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --link-color: #0066cc;
  /* ... etc */
}
```

Dark mode variables are defined under `[data-theme="dark"]`.

### Layout Changes

- **Max width:** Change `--max-width` variable (currently 900px)
- **Fonts:** Change `--font-sans` and `--font-mono` variables
- **Sections:** Each section has its own CSS class (search for `/* Section Name */` in main.css)

## Common Development Tasks

### Adding a New Section

1. Add HTML to `index.html`:
```html
<section id="new-section">
  <h2>New Section</h2>
  <!-- content -->
</section>
```

2. Add to scrollspy navigation in `_includes/scrollspy.html`:
```html
<li><a href="#new-section" class="scrollspy-link">New Section</a></li>
```

3. Add CSS styling in `assets/css/main.css`

### Creating Blog Posts

Create a file in `_posts/` following the naming convention: `YYYY-MM-DD-title.md`

```markdown
---
layout: post
title: "Your Post Title"
date: 2025-01-10
---

Your content here...
```

### Changing the Theme Toggle

The theme toggle logic is in the default layout. Edit `_layouts/default.html` to customize.

## Deployment

### GitHub Pages

1. Push to GitHub
2. Go to repository Settings → Pages
3. Select branch (usually `main`) and folder (`/ root`)
4. Your site will be live at `https://yourusername.github.io/repository-name/`

Update `_config.yml`:
```yaml
url: "https://yourusername.github.io"
baseurl: "/repository-name"
```

### Other Hosting (Netlify, Vercel, etc.)

1. Connect your GitHub repository
2. Build command: `bundle exec jekyll build`
3. Publish directory: `_site`

## Development Notes

### Key Files to Know

- **`index.html`** - 90% of your content updates will be here
- **`assets/css/main.css`** - All styling in one file (~550 lines)
- **`_data/photos.yml`** - Photo gallery management
- **`_config.yml`** - Site configuration
- **`_layouts/default.html`** - Wraps all pages, contains theme toggle

### Design Philosophy

- **Simplicity:** No JavaScript frameworks, minimal dependencies
- **Maintainability:** Content in HTML/YAML, easy to update
- **Responsive:** Mobile-first design with clean breakpoints
- **Accessible:** Semantic HTML, ARIA labels, alt text
- **Fast:** Static site, optimized images, minimal assets

### CSS Organization

The CSS is organized in this order:
1. Variables (theming)
2. Reset & Base
3. Header
4. Page Container
5. About Section
6. Content Sections (podcasts, writing, projects, etc.)
7. Footer
8. Responsive (media queries)

Each section is clearly commented with `/* Section Name */`.

### Adding Custom JavaScript

Add JS files to `assets/js/` and include in `_layouts/default.html`:

```html
<script src="{{ '/assets/js/your-script.js' | relative_url }}"></script>
```

### Performance Tips

- **Images:** Keep under 200KB, use WebP format
- **Thumbnails:** YouTube thumbnails are auto-optimized
- **CSS:** Already minified in production
- **No external dependencies** except GitHub contribution chart

## Troubleshooting

**Site not updating?**
- Clear browser cache
- Restart Jekyll server
- Check `_site/` folder is being regenerated

**Images not showing?**
- Verify file paths (case-sensitive on Linux/Mac)
- Check `assets/images/` directory structure
- Use `{{ '/assets/...' | relative_url }}` for paths

**Styles not applying?**
- Hard refresh browser (Ctrl+F5)
- Check CSS syntax in main.css
- Verify CSS variables are defined

**Jekyll errors?**
- Run `bundle update`
- Check YAML frontmatter syntax
- Verify Liquid template syntax

## Need Help?

1. Jekyll Docs: https://jekyllrb.com/docs/
2. Liquid Syntax: https://shopify.github.io/liquid/
3. GitHub Pages: https://docs.github.com/pages

## Quick Reference

```bash
# Development
bundle exec jekyll serve          # Run dev server
bundle exec jekyll build          # Build static site

# Dependencies
bundle install                     # Install gems
bundle update                      # Update gems

# Clean
bundle exec jekyll clean          # Remove _site folder
```

---

**Last Updated:** January 2025
**Jekyll Version:** 4.x
**Ruby Version:** 2.7+
