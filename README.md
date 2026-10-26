# WellRead public site

The static public website for **WellRead**, an early-warning screen for oil and gas equipment.
Published with GitHub Pages at **https://freddya1.github.io/wellread-site/**.

> **Advisory only.** WellRead only reads plant data. It never writes to equipment, never changes a setpoint, and never
> controls, delays or replaces a SIS/ESD trip. The plant's own safety system stays the safety layer.

## What is here

| File | What it is |
|---|---|
| `index.html` | The WellRead landing page (a static copy of the live app's home page). |
| `how-it-works.html` | How WellRead works: the data flow, the safety promise, who uses it, screenshots, how a pilot works, and a glossary. |
| `404.html` | "Page not found" page shown by GitHub Pages. |
| `css/`, `fonts/`, `js/`, `img/` | Styles, the self-hosted Geist font (SIL Open Font License, see `fonts/OFL.txt`), the phone menu and the "Go to your company's WellRead" box, and images. |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are. |

This site is plain HTML, CSS and a little JavaScript. There is no server-side code, no form that sends data anywhere, no
cookies, no analytics and no external requests. The "Go to your company's WellRead" box only remembers the address in your own
browser and takes you there.

## The app

Every button that does something ("Request a pilot", "Try the demo", "Sign in", "Open simulation") opens the live WellRead app at
**https://wellread-uhm3.onrender.com**. The app itself, and its source code, are not part of this repository.

## Run it locally

Any static file server works. The site uses relative links, so it works at a sub-path such as `/wellread-site/`:

```bash
mkdir -p /tmp/serve && ln -s "$PWD" /tmp/serve/wellread-site
cd /tmp/serve && python3 -m http.server 8080
# open http://localhost:8080/wellread-site/
```

## Contact

Pilots, support or security: Fredrickaffoh81@gmail.com

© 2026 WellRead · Accra, Ghana
