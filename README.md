# cy-blog

My public notebook — written mainly for myself, to keep learning and to remember.
Built with [Astro](https://astro.build), deployed to GitHub Pages.

## Writing a new post

Create a Markdown file in `src/content/blog/`, e.g. `src/content/blog/my-post.md`:

```markdown
---
title: 'My post title'
description: 'One sentence about the post (used for SEO and RSS).'
pubDate: 2026-07-10
tags: ['japan', 'life']   # any of: life, japan, opensource, career, tech
lang: 'zh-tw'             # one of: zh-tw, en, ja
---

Post content in Markdown...
```

The filename becomes the URL: `my-post.md` → `/blog/my-post/`.

To publish: commit and push to `main`. GitHub Actions builds and deploys automatically (takes ~1–2 minutes).

```sh
git add .
git commit -m "Add post: my post title"
git push
```

## Working locally

| Command           | Action                                             |
| :---------------- | :------------------------------------------------- |
| `npm install`     | Install dependencies (first time only)             |
| `npm run dev`     | Preview at `http://localhost:4321/cy-blog`         |
| `npm run build`   | Build the production site to `./dist/`             |
| `npm run preview` | Preview the production build locally               |

## Project layout

- `src/content/blog/` — all posts (Markdown)
- `src/content.config.ts` — frontmatter schema (tags/language validation)
- `src/consts.ts` — site title, description, categories, languages
- `src/pages/` — pages (home, blog list, tags, about)
- `.github/workflows/deploy.yml` — auto-deploy to GitHub Pages on push

## If the repo name or username ever changes

Update `site` (GitHub Pages domain) and `base` (repo name) in `astro.config.mjs`.
