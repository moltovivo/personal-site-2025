# Career Map Feature Specification

## Overview
An interactive world map visualization that displays the user's career journey locations alongside their career timeline. The map should highlight locations when users hover over corresponding timeline entries.

## Requirements

### Visual Design
- **Map Style**: Clean, professional world map with accurate continental shapes
- **Projection**: Equirectangular projection for easy coordinate mapping
- **Color Scheme**:
  - Light mode: Subtle gray continents (#e8e8e8) with darker borders
  - Dark mode: Dark gray continents with lighter borders
  - Background should match the site's theme
- **Size**: Responsive, approximately 280px width on desktop, full width on mobile (max 400px)

### Locations to Display
The map needs to show pins for these career locations:

| Location | Latitude | Longitude | Associated Career Entry |
|----------|----------|-----------|------------------------|
| New York, NY | 40.7128 | -74.0060 | 2025 - Now: J.P. Morgan |
| Binghamton, NY | 42.0987 | -75.9180 | 2023-2024: VP Operations |
| Hartford, CT | 41.7658 | -72.6734 | 2021-2022: Area GM |
| Atlanta, GA | 33.7490 | -84.3880 | 2019-2021: Finance Director |
| Amsterdam, NL | 52.3676 | 4.9041 | 2012-2019: M&A (Europe) |
| Moscow, RU | 55.7558 | 37.6173 | 2010-2012: M&A Diligence |
| Dublin, IE | 53.3498 | -6.2603 | 2005-2009: Trinity College |

### Interactive Behavior
1. **Default State**: Show New York (most recent location) as active on page load
2. **Hover Interaction**: When user hovers over a timeline item, the corresponding location pin on the map should highlight
3. **Pin Animation**: Active pin should have a subtle pulse animation to draw attention
4. **Smooth Transitions**: All state changes should have smooth CSS transitions (0.3s ease)

### Technical Implementation

#### Map Source Options
Consider these approaches:

**Option 1: Use a Public SVG Map (Recommended)**
- Source from Wikimedia Commons or similar free resource
- Files:
  - [BlankMap-World-Equirectangular.svg](https://en.wikipedia.org/wiki/File:BlankMap-World6-Equirectangular.svg) on Wikipedia
  - [SVG maps with equirectangular projection](https://commons.wikimedia.org/wiki/Category:SVG_maps_of_the_world_with_equirectangular_projection) on Wikimedia Commons
- Benefits: Accurate, tested, properly licensed
- License: Verify it's public domain or CC0

**Option 2: Use a JavaScript Mapping Library**
- Libraries to consider:
  - [D3.js](https://d3js.org/) with TopoJSON world data
  - [Leaflet.js](https://leafletjs.com/) (overkill for static display)
  - [Mapbox GL JS](https://www.mapbox.com/mapbox-gljs) (requires API key)
- Benefits: More control, easier coordinate plotting
- Drawbacks: Larger bundle size, dependency management

**Option 3: Canvas-based Custom Solution**
- Use HTML5 Canvas to draw continents
- Source coordinates from Natural Earth Data or similar
- Benefits: Lightweight, full control
- Drawbacks: More implementation work

#### Coordinate Mapping
For equirectangular projection (800x400 viewBox):
```javascript
// Convert lat/lon to SVG coordinates
const x = (longitude + 180) * (800 / 360);
const y = (90 - latitude) * (400 / 180);
```

#### HTML Structure
```html
<div class="career-container">
  <ul class="timeline">
    <li data-location="new-york">
      <span class="year">2025 - Now:</span>
      Global Alternatives Strategist @ J.P. Morgan
    </li>
    <!-- More timeline items with data-location attributes -->
  </ul>

  <div class="career-map">
    <!-- SVG map or canvas element here -->
    <svg viewBox="0 0 800 400" class="world-map">
      <!-- Map continents -->
      <g class="continents">
        <!-- Include accurate continent paths here -->
      </g>

      <!-- Location pins -->
      <g class="location-pins">
        <circle class="pin" data-location="new-york" cx="X" cy="Y" r="5"/>
        <!-- More pins for each location -->
      </g>
    </svg>
  </div>
</div>
```

#### CSS Requirements
```css
.career-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.career-map {
  width: 280px;
  flex-shrink: 0;
}

.world-map {
  width: 100%;
  height: auto;
}

/* Style continents appropriately */
.continents path {
  fill: #e8e8e8;
  stroke: #999;
  stroke-width: 0.5;
}

[data-theme="dark"] .continents path {
  fill: #3a3a3a;
  stroke: #666;
}

/* Pin styles */
.location-pins .pin {
  fill: var(--link-color);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.location-pins .pin.active {
  opacity: 1;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

/* Responsive */
@media (max-width: 768px) {
  .career-container {
    flex-direction: column;
  }

  .career-map {
    width: 100%;
    max-width: 400px;
    margin: 1.5rem auto 0;
  }
}
```

#### JavaScript Requirements
```javascript
// Select elements
const timelineItems = document.querySelectorAll('.timeline li[data-location]');
const locationPins = document.querySelectorAll('.location-pins .pin');

// Location coordinates
const locations = {
  'new-york': { lat: 40.7128, lon: -74.0060 },
  'binghamton': { lat: 42.0987, lon: -75.9180 },
  'hartford': { lat: 41.7658, lon: -72.6734 },
  'atlanta': { lat: 33.7490, lon: -84.3880 },
  'amsterdam': { lat: 52.3676, lon: 4.9041 },
  'moscow': { lat: 55.7558, lon: 37.6173 },
  'dublin': { lat: 53.3498, lon: -6.2603 }
};

// Position pins using equirectangular projection
locationPins.forEach(pin => {
  const loc = pin.getAttribute('data-location');
  if (locations[loc]) {
    const coords = locations[loc];
    const x = (coords.lon + 180) * (800 / 360);
    const y = (90 - coords.lat) * (400 / 180);
    pin.setAttribute('cx', x);
    pin.setAttribute('cy', y);
  }
});

// Set active location
function setActiveLocation(location) {
  locationPins.forEach(pin => {
    pin.classList.toggle('active', pin.getAttribute('data-location') === location);
  });
}

// Initialize with first location
if (timelineItems.length > 0) {
  const firstLocation = timelineItems[0].getAttribute('data-location');
  setActiveLocation(firstLocation);
}

// Add hover listeners
timelineItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const location = item.getAttribute('data-location');
    setActiveLocation(location);
  });
});
```

## Acceptance Criteria
- [ ] Map displays with accurate, recognizable continental shapes
- [ ] All 7 career locations are visible and correctly positioned
- [ ] New York pin is active by default on page load
- [ ] Hovering over timeline items highlights corresponding map location
- [ ] Pin animation is smooth and not distracting
- [ ] Map is responsive and works well on mobile devices
- [ ] Dark mode support matches site theme
- [ ] No JavaScript errors in console
- [ ] Accessible (pins have proper aria-labels if interactive)

## Nice-to-Have Features
- Tooltip showing location name on pin hover
- Click on pin to scroll to corresponding timeline entry
- Draw connection lines between sequential career locations
- Subtle zoom/pan on pin activation
- Country borders in addition to continents

## Resources
- [Natural Earth Data](https://www.naturalearthdata.com/) - Free map datasets
- [Wikimedia Commons World Maps](https://commons.wikimedia.org/wiki/Category:SVG_maps_of_the_world)
- [D3.js World Map Tutorial](https://d3-graph-gallery.com/graph/backgroundmap_basic.html)
- [Map Projections](https://en.wikipedia.org/wiki/Equirectangular_projection)

## Notes
- Previous attempt used hand-drawn SVG paths which resulted in inaccurate continent shapes
- Must use a proper, tested map source for professional appearance
- Consider bundle size if using a JavaScript library
- Ensure proper attribution if using Creative Commons licensed maps
