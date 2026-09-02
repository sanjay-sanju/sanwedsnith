# Sanjay & Nithya — Wedding Reception Invitation

A static, responsive wedding reception invitation website built with plain HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step, no backend. Works out of the box on GitHub Pages.

## Event details

- **Groom:** Sanjay
- **Bride:** Nithya
- **Event:** Wedding Reception
- **Date:** 27 December 2026
- **Time:** 5:00 PM – 9:00 PM
- **Venue:** VK Palace, Mullampara
- **Map:** https://maps.app.goo.gl/tZNRZBTXxXUiJJNM7

## Project structure

```
wedding-invitation/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   └── couple.jpeg
│   └── music/
│       └── wedding.mp3
└── README.md
```

## Running locally

No build step is required. Either:

- Open `index.html` directly in a browser, or
- Serve the folder with any static server, e.g. `python -m http.server` from this directory, then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository (the contents of `wedding-invitation/`, not a parent folder, should be at the repo root — or set the Pages source to this subfolder).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, choose the branch (e.g. `main`) and folder (`/root`).
4. Save. GitHub Pages will publish the site at `https://<username>.github.io/<repo>/`.

All asset paths in the site are relative, so it works whether it's served from a domain root or a repo subpath.

## Customizing

- **Wedding details:** edit the `weddingDetails` object at the top of `js/script.js`. The countdown timer reads `weddingDetails.date` directly.
- **Colors:** all colors are CSS custom properties defined in `:root` at the top of `css/style.css` — change them there to re-theme the whole site.
- **Couple photo:** replace `assets/images/couple.jpeg` with a different image of the same filename, or update the `src` attributes in `index.html`.
- **Music:** drop an MP3 at `assets/music/wedding.mp3`. The music button will otherwise fail silently and the site keeps working without it. Music never autoplays — it only starts when a visitor clicks the button.

## Notes

- The venue and map cards are intentionally illustrative (SVG/CSS), not real photos or an embedded Google Maps widget — this avoids requiring a Google Maps API key while keeping the page lightweight and fast. Both "View Venue on Google Maps" and "Get Directions" / "Open Google Maps" buttons open the real venue link in a new tab.
- Animations respect `prefers-reduced-motion` and are skipped/simplified for visitors who have that preference set.
- The site uses Google Fonts (Great Vibes, Cormorant Garamond, DM Sans) loaded via `<link>` tags in `index.html`.
