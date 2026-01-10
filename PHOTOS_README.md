# Managing the Photos Section

The photos section uses Jekyll's data files feature for easy maintenance. You can add, edit, or remove photos without touching the HTML or CSS.

## How to Add a New Photo

1. **Add your image file** to `assets/images/photos/`
   - Supported formats: JPG, PNG, WebP
   - Recommended size: 800-1200px wide for best quality

2. **Update the data file** at `_data/photos.yml`
   - Add a new entry following this format:

   ```yaml
   - image: photos/your-image-name.jpg
     caption: Description of the photo and what you were working on
     alt: Brief alt text for accessibility
     project: Project Name or Category (optional)
   ```

3. **Save the file** - Jekyll will automatically rebuild your site

## Example Entry

```yaml
- image: photos/conference-2024.jpg
  caption: Presenting quantitative research at the QuantFinance Conference 2024
  alt: Conference presentation on stage
  project: Research & Speaking
```

## Tips

- **Order**: Photos appear in the order they're listed in the YAML file
- **Captions**: Write descriptive captions that tell the story behind each photo
- **Alt text**: Keep it concise but descriptive for screen readers
- **Project tag**: Use this to categorize photos (optional but recommended)

## File Organization

```
assets/images/photos/
├── project1.jpg
├── project2.jpg
└── conference-2024.jpg

_data/
└── photos.yml  <- Edit this file to manage photos
```

## Common Tasks

### Reorder Photos
Simply rearrange the entries in `_data/photos.yml`

### Remove a Photo
Delete the entry from `_data/photos.yml` (you can also delete the image file from `assets/images/photos/`)

### Update Caption
Edit the `caption` field in `_data/photos.yml`

## Build & Preview

After making changes:
```bash
bundle exec jekyll serve
```

Then visit `http://localhost:4000` to preview your changes.
