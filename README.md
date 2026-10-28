# AshiOS

An interactive developer portfolio desktop built with React, Vite, Framer Motion, Lucide React, and a Tailwind-compatible project setup.

## Run locally

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm run preview
```

## Personal configuration

Update [`src/data.js`](src/data.js) before publishing:

- `email`
- `githubUsername`, `github`
- `linkedin`
- project repository/demo URLs

Add the verified resume PDF at `public/resume.pdf`. Until then, Resume.pdf shows an honest fallback instead of a fabricated document.

The GitHub Stats app only calls the public GitHub API after `githubUsername` is configured. AskAshi is intentionally local and grounded in the same portfolio data.
