# Blubber The Harbor

Một bến cảng nhỏ, một đại dương yêu thương. A complete, static Vietnamese character portfolio for Blubber, a cheerful whale fursona. Explore a sunlit dock, a captain's journal, four little treasures, starry underwater scenery, an artwork collection, and a message in a bottle.

The original SVG whale is an illustrative stand-in, not a claim to be Blubber's final character design. No external character artwork, invented credits, profile URLs, music tracks, or additional canonical lore are included.

## Stack

- React 19 with JavaScript / JSX and Vite 8
- Tailwind CSS 4 through the official Vite plugin, with reusable theme tokens
- Motion for React (`motion/react`), CSS animations, and Lucide icons
- Self-hosted Fredoka and Nunito fonts through Fontsource; Nunito supplies Vietnamese glyphs that Fredoka does not cover
- Playwright browser tests and axe automated accessibility checks
- Official GitHub Pages Actions; no server, database, authentication, or paid APIs

Exact dependency versions are recorded in `package.json` and `package-lock.json`.

## Install and develop

Use Node.js 22.12 or newer (current Node LTS recommended) and npm. Windows PowerShell:

```powershell
Set-Location C:\Coding\blubber-the-harbor
npm.cmd ci
npm.cmd run dev
```

Open the Local URL Vite prints, including `/blubber-the-harbor/`. `npm.cmd` works when PowerShell blocks the `npm.ps1` wrapper; on other shells, `npm` works as usual. Fonts, illustrations, and runtime functionality work without external service requests.

## Code formatting

The project uses Prettier with two-space indentation, single quotes, a 100-character print width, and LF line endings. Generated output, dependency lockfiles, temporary files, and owner-supplied artwork are excluded.

```powershell
npm.cmd run format
npm.cmd run format:check
```

## Production build and preview

```powershell
npm.cmd run build
npm.cmd run preview
```

The production website is in `dist/`. Preview serves the built result; rerun the build after changes. Do not open `dist/index.html` directly with `file://`.

```powershell
npm.cmd test
```

Browser tests use an installed Google Chrome. If Chrome is absent, install Chrome, or change `channel: 'chrome'` in `playwright.config.js` to your installed Playwright Chromium configuration. Tests exercise mobile navigation, character greetings, bubble popping, the lighthouse, hobby details, gallery filtering, focus trapping/restoration, Escape and arrow keys, reduced motion, and layout widths from 320px to 1440px. Automated axe checks scan the page and open gallery dialog for WCAG A/AA issues. These checks complement manual review and are not a full accessibility certification. Tests run against the production preview under the actual repository subpath.

To reuse a preview that is already running, set its full URL, including the base path:

```powershell
$env:PLAYWRIGHT_TEST_BASE_URL = 'http://127.0.0.1:4173/blubber-the-harbor/'
npm.cmd test
Remove-Item Env:PLAYWRIGHT_TEST_BASE_URL
```

## Project structure

```text
.github/workflows/deploy.yml       Build and deploy GitHub Pages
public/favicon.svg                Original whale favicon
public/images/blubber/            Owner's hero, profile, and story artwork
public/images/gallery/            Owner's gallery artwork
src/components/layout/            Floating navbar and footer
src/components/ocean/             SVG whale, lighthouse, waves, stars, bubbles
src/components/ui/                Cards, section headings, gallery lightbox
src/data/                         Editable character, interests, gallery, socials
src/hooks/useReducedMotion.js     Motion preference helper
src/sections/                     All six harbor locations
src/styles/globals.css            Palette, Tailwind tokens, layouts, animation
src/App.jsx                       Page assembly
src/main.jsx                      Entry point and local fonts
tests/harbor.spec.js               Production browser checks
vite.config.js                    Base URL and public-image inventory
```

## Edit character content

### Vietnamese / English

Use the **VI / EN** button beside the sun/moon control to change language. Vietnamese is the default. The choice is saved in this browser under `blubber-language` and synchronized between tabs; it is independent of Day & Night Ocean Mode. The switch works for the current visit even if browser storage is blocked.

Introductions, profile details, hobbies, gallery descriptions and filters, contact text, character greetings, controls, and screen-reader labels are translated. The document language, description, and Open Graph locale update too. Branding, harbor location names, platform/game names, artist credits, and character nicknames retain their original spelling. Artwork titles retain their spelling unless you supply `titleEn`; `descriptionEn` can also provide the English description directly on each artwork. Switching language preserves the current gallery filter, open lightbox, expanded interest cards, and ocean mode.

The existing files in `src/data/` remain the source content. Shared translations live in `src/data/translations.js`, and `src/hooks/useLanguage.jsx` supplies the language context. When changing Vietnamese source copy, update its matching English entry:

```js
// Inside translations.en:
'Câu tiếng Việt trong nội dung gốc.': 'The corresponding English sentence.',
```

For short decorative text originally written in English, add its Vietnamese version inside `translations.vi`. In JSX, render translatable strings through `t(sourceText)`. Parameterized labels use `t('Xem {title}', { title: artwork.title })`, keeping values separate from translated text. Missing entries fall back to their source wording. No translation API or additional dependency is required.

The initial saved language is applied in `index.html`; the language button is in `src/components/ui/LanguageToggle.jsx`, and responsive control styles are in `src/styles/language.css`. `tests/language.spec.js` verifies persistence, storage failures, tab synchronization, preserved UI state, translation coverage for content data, narrow screens, and accessibility in both ocean modes.

Edit `src/data/character.js` for the name, nicknames, profile details, welcome, and nickname origin. Edit `src/data/interests.js` for the four hobby cards and their expandable details. Other Vietnamese story and closing copy lives in the relevant `src/sections/` component. Keep new content faithful to the owner's character information.

CSS variables and Tailwind `@theme` tokens in `src/styles/globals.css` include all six supplied colors. The hero uses a softened cyan/mint gradient, cream paper cards, ocean blue actions, coral/pink details, and navy text. Tailwind tokens include `bg-ocean-cyan`, `text-navy`, `bg-cream`, and `font-display`.

## Replace character artwork

You can use **direct external image URLs without storing any artwork in this project**. Set the three sources in `src/data/character.js`:

```js
images: {
  hero: 'https://images.example.com/blubber/hero.png',
  profile: 'https://images.example.com/blubber/profile.webp',
  story: 'https://images.example.com/blubber/story.png',
},
```

Replace these documentation examples with your real image URLs. Use a direct HTTPS link that displays the image itself, rather than a sharing page or a link requiring sign-in. Links with query parameters and image URLs without a filename extension are supported. The image host must allow embedding on other websites. A URL that cannot load falls back to the original SVG; changing it to a working URL lets the image load again.

URL edits appear through Vite's normal live reload and need no image-inventory restart. Rebuild before deployment. The same image sources work in both languages and both ocean modes.

Local images are also supported. The default configuration still uses these files (no React logic edits needed):

```text
public/images/blubber/hero.png
public/images/blubber/profile.png
public/images/blubber/story.png
```

Transparent PNGs work well for character art. Artwork uses `object-fit: contain` to preserve its proportions. Missing files render the original SVG whale, and unreadable images fall back on error. Do not create empty image files.

Vite inventories available public images at startup/build, preventing requests for files that have not been supplied. During development, adding, renaming, or removing an image under `public/images/` automatically restarts Vite to refresh this inventory, and the browser reconnects. Replacing an existing image uses Vite's normal live reload. Always run a new production build before deployment.

## Manage the gallery

1. Copy a direct HTTPS artwork URL, or put artwork in `public/images/gallery/` (PNG, JPEG, WebP, AVIF, or SVG).
2. Add an object to the `artworkEntries` array in `src/data/gallery.js`. Only these three fields are required:

```js
{
  id: 'a-unique-stable-id',
  title: 'Tên bức tranh',
  image: 'images/gallery/your-file.webp',
}
```

3. Development picks up the change automatically. Rebuild for deployment.

`image` accepts either a direct external URL, such as `https://images.example.com/blubber/artwork.webp`, or a path relative to `public/`, such as `images/gallery/your-file.webp`. For a local path, omit the `public/` prefix. The same source is used for the gallery thumbnail and full-size lightbox. Empty, unavailable, or unreadable sources display the themed placeholder. Adding, renaming, or removing local images refreshes the development server automatically; URL edits use normal live reload. Always rebuild for deployment.

Categories are created automatically from the entries. An omitted or blank `category` becomes **Other Artwork**. To add a new category, simply use its name on an artwork; no component or category-list edits are needed. IDs must be unique and should remain stable when you rename a picture.

You can add any of these optional fields:

| Field                      | Purpose                                                                                                         |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `category`                 | Existing or new category, such as `Full Body` or `Chibi`.                                                       |
| `description`              | Vietnamese/source description.                                                                                  |
| `titleEn`, `descriptionEn` | English text for this artwork, without editing the shared translation dictionary.                               |
| `thumbnail`                | Optional smaller image for the grid. The viewer always opens `image`; a failed thumbnail falls back to `image`. |
| `artistName`, `artistUrl`  | Actual artist credit and optional HTTP(S) link.                                                                 |
| `scene`                    | One of the six illustrated fallback scenes listed below.                                                        |

For example, an artwork can include its own bilingual copy and category:

```js
{
  id: 'beach-day',
  title: 'Ngày ở biển',
  titleEn: 'A day by the sea',
  image: 'images/gallery/beach-day.webp',
  category: 'Chibi',
  description: 'Mô tả tranh của bạn.',
  descriptionEn: 'Your artwork description.',
},
```

The grid initially shows nine artworks. **Show more artwork** loads the next group, and changing categories resets that group. Change the positive integer `galleryPageSize` in the same file to adjust the group size. The lightbox can navigate every artwork in the selected category, including ones not yet shown in the grid. No backend or component edits are needed when adding more entries.

The artwork viewer provides a larger image area, zoom from **100% to 400%**, a fit-to-frame button, an expanded view, and an **open original image** link when an image source is configured. Scroll/swipe within the image to inspect it after zooming; keyboard users can focus that area and use arrow keys to pan. Outside that area, left/right arrow keys navigate artwork. Escape closes the viewer and restores focus. Changing artwork resets zoom to 100%.

Optional artist credits appear in the lightbox, and HTTP(S) credit links open safely in another tab. Credit the actual artist only with permission/accurate information.

Empty or missing images show one of six explicitly labeled SVG studies (`reference`, `hug`, `smile`, `stars`, `harbor`, `friend`). No component changes are needed to add real art. Reference sheets are displayed in full, including in the lightbox.

## Configure social links

Edit `src/data/socials.js`. Set each `url` to your actual HTTP(S) profile URL. Leave unknown URLs empty: the card displays “Sắp có” without a fake link. Add objects for additional platforms; unrecognized icons use a globe.

For Discord, either provide a real invitation/profile URL, or leave `url` empty and set `username` to your actual Discord username. The card will copy it to the clipboard and announce success. If clipboard access is unavailable, the username is displayed for manual copying. Clipboard use requires HTTPS or localhost.

## GitHub Pages deployment

The default Vite base is `/blubber-the-harbor/`. Asset URLs always use Vite's base, and navigation uses document anchors, so no SPA redirect or backend is required.

1. Commit and push the project, including `package-lock.json`, to the `main` branch of the GitHub repository.
2. In repository **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. The **Deploy Blubber's Harbor** workflow runs on pushes to `main` or manually from **Actions → Run workflow**.
4. The workflow checks out source, installs Node LTS, runs `npm ci` and the production build, uploads `dist/` with the official Pages artifact action, then deploys with the official deploy action. It has `contents: read`, `pages: write`, and `id-token: write` permissions and a `github-pages` environment.
5. Open the URL returned by the successful deployment. Deployment is prepared locally; this implementation does not push your repository or activate a live site automatically.

The workflow derives the base exclusively from GitHub Pages configuration, so project repositories, user sites, and custom domains receive the appropriate path. Repository Actions variables named `VITE_BASE_PATH` are ignored during deployment; a stale override from a previous repository name must not change the live asset paths. The workflow verifies the generated JavaScript, stylesheet, and favicon paths in `dist/index.html` before uploading `dist/`.

For this repository, the live URL is [https://animoil.github.io/blubber-the-harbor/](https://animoil.github.io/blubber-the-harbor/). The blank-screen deployment referenced `/blubber-the-harbor-1/assets/...` for JavaScript and CSS, which returned 404; those same files were available under `/blubber-the-harbor/assets/...`. React could not start because its entry script did not load. Push this workflow fix to `main` to rebuild and redeploy with the configured Pages path. Remove any obsolete `VITE_BASE_PATH` repository variable to avoid confusion.

For a local override, copy `.env.example` to `.env.local` and set:

```text
# Standard project repository
VITE_BASE_PATH=/blubber-the-harbor/

# A USERNAME.github.io repository or a custom-domain root uses this instead:
# VITE_BASE_PATH=/
```

Or set a temporary PowerShell environment variable:

```powershell
$env:VITE_BASE_PATH = '/'
npm.cmd run build
Remove-Item Env:VITE_BASE_PATH
```

The default test configuration expects the project base `/blubber-the-harbor/`; adjust its `baseURL` and readiness URL when testing another base.

Workflow references: [GitHub's custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [Vite's deployment guide](https://vite.dev/guide/static-deploy.html#github-pages).

## Metadata and sharing

`index.html` sets the page title, Vietnamese document language, description, theme color, Open Graph title/description/locale/type, Twitter summary, viewport, and SVG favicon. A final deployment URL is intentionally not assumed.

After Pages returns the final URL, add the following to the HTML `<head>`, substituting that exact absolute URL and a real sharing image:

```html
<link rel="canonical" href="YOUR_FINAL_ABSOLUTE_SITE_URL" />
<meta property="og:url" content="YOUR_FINAL_ABSOLUTE_SITE_URL" />
<meta property="og:image" content="YOUR_FINAL_ABSOLUTE_SHARING_IMAGE_URL" />
<meta property="og:image:alt" content="Blubber The Harbor — chú cá voi mũm mĩm" />
<meta name="twitter:image" content="YOUR_FINAL_ABSOLUTE_SHARING_IMAGE_URL" />
```

Use a PNG/JPEG sharing image; most social preview crawlers do not accept an SVG. Change `twitter:card` to `summary_large_image` once a suitable image is available. The capitalized values above are documentation placeholders only and are not shipped as fake metadata.

## Accessibility and performance

### Day & Night Ocean Mode

Use the sun/moon toggle in the floating navigation to switch between the pastel daytime harbor and a moonlit ocean. The control stays available beside the mobile menu, supports keyboard activation, and announces its state to assistive technology. Night mode updates every section, cards, the gallery lightbox, wave dividers, and the browser's theme color. A crescent moon and brighter stars appear, and the lighthouse starts lit; its own button still works.

On the first visit the palette follows the device's light/dark preference, including live changes. A manual choice is saved in this browser under `blubber-ocean-mode` and takes priority on later visits. The choice also synchronizes between tabs. Clear that local-storage entry and reload to follow the device preference again. If browser storage is blocked, the control continues working for the current visit.

The initial palette is applied in `index.html` before the first paint. Behavior lives in `src/hooks/useOceanMode.js`, the toggle in `src/components/ui/OceanModeToggle.jsx`, and the night palette in `src/styles/ocean-mode.css`. Soft transitions honor reduced-motion preferences. No additional dependencies are needed.

The page has semantic sections, a skip link, named navigation, keyboard-accessible controls, visible focus rings, active-section announcements, and accessible mobile navigation. The lightbox traps focus, supports Escape and arrow keys, locks background scrolling, and returns focus to its opening card. Interest details are available by click/tap and keyboard, not hover alone. Decorative scenery is hidden from assistive technology; interactive bubbles have accessible names.

Motion honors `prefers-reduced-motion`, mobile screens use fewer particles, and animations primarily use transforms/opacity. Scroll reveal uses Motion's viewport observer; active navigation uses Intersection Observer. Lightweight CSS supplies progressive parallax where scroll timelines are supported. Fonts are self-hosted; gallery images load lazily and retain dimensions. No particle engine or 3D library is included.

## Troubleshooting

| Symptom                               | What to check                                                                                                              |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| PowerShell refuses `npm`              | Use `npm.cmd` as shown above; no global execution-policy change is necessary.                                              |
| Node engine error                     | Upgrade to supported Node LTS, then run `npm.cmd ci`.                                                                      |
| Blank page on Pages                   | Confirm the workflow succeeded and built asset URLs start with `/blubber-the-harbor/`; redeploy after changing the base.   |
| Missing styles or images              | Include the repository subpath; use `images/...` in data rather than `/images/...`. Filenames are case-sensitive on Pages. |
| SVG fallback remains after adding art | Confirm the file name and extension, restart Vite, and rebuild for deployment.                                             |
| No social navigation                  | Supply real URLs in `src/data/socials.js`; unconfigured cards intentionally have no link.                                  |
| Discord cannot copy                   | Open via HTTPS or localhost, or use the displayed username to copy manually.                                               |
| Animations appear still               | Check the system's reduced-motion preference; the site respects it.                                                        |
| Browser tests cannot launch           | Install Google Chrome or configure an available Playwright browser in `playwright.config.js`.                              |
| Preview port is in use                | Stop the prior preview, or run `npm.cmd run preview -- --port 4174`.                                                       |
| Push does not deploy                  | Confirm the branch is `main`, Actions are enabled, and the `github-pages` environment permits deployment.                  |

Real artwork, actual social URLs/usernames, and the final sharing URL/image remain owner-supplied configuration. The complete site works with its illustrated fallbacks in the meantime.
