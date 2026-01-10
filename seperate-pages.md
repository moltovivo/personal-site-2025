# Option 2: Separate Pages with Jekyll Data Files

This document outlines how to implement a "Show All" feature using Jekyll data files - the most maintainable approach for your website.

## Overview

Instead of editing HTML directly, you'll store all content in YAML files in `_data/`. The home page will show a limited number of items (e.g., 4 articles), with a "Show all →" link to a dedicated page that displays everything.

**Key Benefit:** Edit content in ONE place, and both pages automatically update.

## Implementation Steps

### Step 1: Create Data Files

Create YAML files in `_data/` for each content type:

**`_data/articles.yml`**
```yaml
- title: "What is the outlook for hedge funds in 2026?"
  url: "https://am.jpmorgan.com/us/en/asset-management/adv/insights/..."
  description: "Examining why hedge funds are becoming increasingly attractive investments..."
  image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"

- title: "Will nuclear power AI data centers?"
  url: "https://am.jpmorgan.com/us/en/asset-management/adv/insights/..."
  description: "Examining whether nuclear power can meet the surging electricity demands..."
  image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop"

# ... add all 9 articles
```

**`_data/podcasts.yml`**
```yaml
- title: "Episode 2"
  url: "https://www.youtube.com/watch?v=QsXHPeufRjY"
  video_id: "QsXHPeufRjY"

- title: "Episode 3"
  url: "https://www.youtube.com/watch?v=L0MxOHMGDQI"
  video_id: "L0MxOHMGDQI"

# ... add all episodes
```

**`_data/videos.yml`**
```yaml
- title: "Featured Video"
  url: "https://www.youtube.com/watch?v=_LB8nWMrZos"
  video_id: "_LB8nWMrZos"

# ... add more videos
```

### Step 2: Update Home Page (index.html)

Replace the hardcoded article section with Liquid template:

```html
<section id="financial-writing">
  <h2>Financial Writing</h2>
  <div class="article-grid">
    {% for article in site.data.articles limit:4 %}
    <a href="{{ article.url }}" target="_blank" rel="noopener" class="article-card">
      <img src="{{ article.image }}" alt="{{ article.title }}" class="article-image">
      <div class="article-content">
        <h3>{{ article.title }}</h3>
        <p>{{ article.description }}</p>
      </div>
    </a>
    {% endfor %}
  </div>
  <a href="{{ '/writing/' | relative_url }}" class="show-all-link">Show all articles →</a>
</section>
```

Do similar for podcasts and videos:

```html
<section id="podcasts">
  <h2>Podcasts</h2>
  <div class="podcast-scroll">
    {% for podcast in site.data.podcasts limit:3 %}
    <a href="{{ podcast.url }}" target="_blank" rel="noopener" class="podcast-tile">
      <img src="https://img.youtube.com/vi/{{ podcast.video_id }}/hqdefault.jpg" alt="Podcast episode">
      <div class="tile-content">
        <h3>{{ podcast.title }}</h3>
      </div>
    </a>
    {% endfor %}
  </div>
  <a href="{{ '/podcasts/' | relative_url }}" class="show-all-link">Show all episodes →</a>
</section>
```

### Step 3: Create Dedicated Pages

**`writing.html`**
```html
---
layout: default
title: Financial Writing
---

<section id="financial-writing">
  <h1>Financial Writing</h1>
  <p class="section-description">Insights on alternative investments, markets, and the economy.</p>

  <div class="article-grid">
    {% for article in site.data.articles %}
    <a href="{{ article.url }}" target="_blank" rel="noopener" class="article-card">
      <img src="{{ article.image }}" alt="{{ article.title }}" class="article-image">
      <div class="article-content">
        <h3>{{ article.title }}</h3>
        <p>{{ article.description }}</p>
      </div>
    </a>
    {% endfor %}
  </div>
</section>
```

**`podcasts.html`**
```html
---
layout: default
title: Podcasts
---

<section id="podcasts">
  <h1>Podcasts</h1>
  <p class="section-description">Conversations with investors exploring markets and technology.</p>

  <div class="podcast-scroll">
    {% for podcast in site.data.podcasts %}
    <a href="{{ podcast.url }}" target="_blank" rel="noopener" class="podcast-tile">
      <img src="https://img.youtube.com/vi/{{ podcast.video_id }}/hqdefault.jpg" alt="{{ podcast.title }}">
      <div class="tile-content">
        <h3>{{ podcast.title }}</h3>
      </div>
    </a>
    {% endfor %}
  </div>
</section>
```

**`videos.html`**
```html
---
layout: default
title: Videos
---

<section id="videos">
  <h1>Videos</h1>
  <p class="section-description">Video content exploring finance and technology.</p>

  <div class="video-grid">
    {% for video in site.data.videos %}
    <a href="{{ video.url }}" target="_blank" rel="noopener" class="video-card">
      <img src="https://img.youtube.com/vi/{{ video.video_id }}/hqdefault.jpg" alt="{{ video.title }}" class="video-thumbnail">
      <div class="video-content">
        <h3>{{ video.title }}</h3>
      </div>
    </a>
    {% endfor %}
  </div>
</section>
```

### Step 4: Add CSS for "Show All" Link

Add to `assets/css/main.css`:

```css
.show-all-link {
  display: inline-block;
  margin-top: 1.5rem;
  font-size: 0.95rem;
  color: var(--link-color);
  font-weight: 500;
  transition: transform 0.2s;
}

.show-all-link:hover {
  transform: translateX(4px);
}
```

### Step 5: Update Navigation (Optional)

You can add links to dedicated pages in your header:

```html
<nav class="site-nav">
  <a href="{{ '/' | relative_url }}">Home</a>
  <a href="{{ '/writing/' | relative_url }}">Writing</a>
  <a href="{{ '/podcasts/' | relative_url }}">Podcasts</a>
  <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
    <span class="icon-sun">&#9728;</span>
    <span class="icon-moon">&#9790;</span>
  </button>
</nav>
```

## Maintenance Workflow

### Adding a New Article

1. Open `_data/articles.yml`
2. Add new entry at the top (most recent first):

```yaml
- title: "New Article Title"
  url: "https://am.jpmorgan.com/..."
  description: "Brief description of the article."
  image: "https://images.unsplash.com/photo-xxxxx?w=800&h=400&fit=crop"
```

3. Save the file
4. Both home page (showing 4) and writing page (showing all) automatically update

### Adding a New Podcast Episode

1. Open `_data/podcasts.yml`
2. Add new entry:

```yaml
- title: "Episode 5"
  url: "https://www.youtube.com/watch?v=VIDEO_ID"
  video_id: "VIDEO_ID"
```

3. Save - done!

### Changing How Many Items Show on Home

Edit the `limit` parameter in `index.html`:

```html
{% for article in site.data.articles limit:6 %}  <!-- Changed from 4 to 6 -->
```

## File Structure

```
personal-site/
├── _data/
│   ├── articles.yml       # All article data
│   ├── podcasts.yml       # All podcast data
│   ├── videos.yml         # All video data
│   └── photos.yml         # Already exists
├── index.html             # Home page (shows limited items)
├── writing.html           # Shows all articles
├── podcasts.html          # Shows all podcasts
├── videos.html            # Shows all videos
└── assets/css/main.css    # Add .show-all-link styles
```

## Advantages

1. **Single Source of Truth:** Content lives in one place
2. **Easy Updates:** Edit YAML file, both pages update
3. **No Duplication:** Don't need to edit HTML in two places
4. **Scalable:** Easy to add 50+ articles without HTML getting messy
5. **Professional:** Separation of content and presentation
6. **Flexible:** Easy to change number of items shown on home page

## Disadvantages

1. **Initial Setup:** Takes ~30 minutes to migrate existing content to YAML
2. **Learning Curve:** Need to understand YAML syntax (very simple)
3. **Build Step:** Jekyll needs to rebuild when YAML changes (automatic with `jekyll serve`)

## Example: Current vs. Data File Approach

### Current Approach (editing index.html):
```html
<a href="https://long-url..." class="article-card">
  <img src="https://unsplash..." alt="...">
  <div class="article-content">
    <h3>Article Title</h3>
    <p>Description...</p>
  </div>
</a>
```

**To add article:** Edit HTML, duplicate entire block, paste, edit URLs/text

### Data File Approach (editing articles.yml):
```yaml
- title: "Article Title"
  url: "https://long-url..."
  description: "Description..."
  image: "https://unsplash..."
```

**To add article:** Add 4 lines to YAML file

## Recommended Implementation Order

1. **Start with Articles** (most content, biggest benefit)
   - Create `_data/articles.yml`
   - Migrate 9 articles to YAML
   - Update `index.html` to use data file
   - Create `writing.html`

2. **Then Podcasts**
   - Create `_data/podcasts.yml`
   - Update podcast section
   - Create `podcasts.html`

3. **Finally Videos**
   - Create `_data/videos.yml`
   - Update video section
   - Create `videos.html`

4. **Photos Already Done!**
   - You're already using `_data/photos.yml` ✓

## Estimated Time

- Initial setup: **30-45 minutes**
- Future updates: **30 seconds per article** (vs. 2 minutes editing HTML)

## When to Use This Approach

- ✅ You plan to add articles regularly
- ✅ You have 10+ items in a section
- ✅ You want clean, maintainable code
- ✅ You're comfortable with YAML (very simple)

## When NOT to Use This Approach

- ❌ Content rarely changes
- ❌ Only 3-4 total items
- ❌ You prefer editing HTML directly

## Next Steps (If You Decide to Implement)

1. Read this document
2. Decide which sections to convert (recommend: articles first)
3. Create `_data/articles.yml` with all 9 articles
4. Update `index.html` to use `{% for article in site.data.articles limit:4 %}`
5. Create `writing.html` for full list
6. Test locally with `bundle exec jekyll serve`
7. Repeat for podcasts/videos if desired

---

**Note:** This is a one-time migration. Once set up, maintenance is actually EASIER than the current approach. You'll thank yourself after adding the 20th article!
