# Jamseeth Iwana: Portfolio Website

Plain HTML, CSS and JavaScript. No install or build step needed.

## Open it in VS Code
1. Unzip this folder somewhere (e.g. Documents).
2. In VS Code: **File → Open Folder…** and pick `jamseeth-portfolio`.
3. Install the **Live Server** extension, then right-click `index.html` → **Open with Live Server**. The page reloads every time you save.

## Folder structure
```
jamseeth-portfolio/
├── index.html        ← all the content (text, projects, links)
├── css/style.css     ← colours, fonts, layout
├── js/script.js      ← animations, menu, project filter
├── images/           ← put your pictures here (see below)
└── assets/Jamseeth_Iwana_Resume.pdf
```

## Images
All project images are already in the `images` folder (taken from your Canva portfolio).
Only **GigBoard** still shows a placeholder: save a screenshot as `images/gigboard.png` and it appears automatically.

To change a card's cover, replace the file with one of the same name.
The "View screens" buttons open a gallery: edit the `data-gallery` list in `index.html`
(file paths separated by `|`) to add or remove screens.

## Common edits
- **Colours:** change the variables at the top of `css/style.css` (`--band`, `--brown`, `--paper`).
- **Add a project:** in `index.html`, copy one `<article class="card">…</article>` block and edit it.
  Set `data-category="design"`, `"dev"`, or `"dev design"` so the filter buttons work.
- **Hero typing words:** edit the `roles` list in `js/script.js`.
- **Update resume:** replace `assets/Jamseeth_Iwana_Resume.pdf` (keep the same name).
