# Caffeine Studios — Meta Quest VR Portfolio

Static portfolio website for Faizan Bashir and Caffeine Studios, focused on professional Meta Quest VR game development.

## Site content

- 13 original Meta Quest games published on the Meta Horizon Store
- Local gameplay images and on-demand video playback for every product
- Client VR development services and delivery process
- Direct contact links for email, WhatsApp, LinkedIn, Fiverr, Upwork, and Discord
- Individual product privacy-policy pages

## Structure

- `index.html` — main portfolio
- `styles.css` — shared responsive visual system
- `script.js` — navigation, scroll reveals, video dialog, and contact interactions
- `assets/products/` — product screenshots and gameplay videos
- `Logo/` — Caffeine Studios identity assets
- `*-privacy-policy.html` and `privacy-policy.html` — product policies

The media gallery uses lazy-loaded poster images and only loads a product video after a visitor chooses **Watch gameplay**. The hero reel is the only autoplaying video and is muted, looping, and inline.

## Local preview

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/`.

## Live deployments

- `https://faizanbashirarain.github.io/caffeinestudios/`
- `https://faizanbashirarain.github.io/caffeinestudios.github.io/`

Both GitHub Pages repositories are kept in sync for public releases.
