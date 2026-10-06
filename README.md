# Martin Horciak: portfolio

Personal portfolio for cybersecurity and AI work. Built with [Astro](https://astro.build), hosted on [Vercel](https://vercel.com).

## Editing content

Everything on the page comes from **`src/data/site.ts`**. Search it for `TODO` to find the placeholders
(bio, location, email, LinkedIn, certifications, experience, home lab hardware, write-ups).
Set a field to `''` or a list to `[]` to hide it.

- **Resume:** drop a PDF at `public/resume.pdf` and set `links.resume = '/resume.pdf'`.
- **Terminal demos:** each featured project has a `terminal` array. `in` lines are typed, `out` lines print,
  and `tone` colors them (`ok`, `warn`, `bad`, `dim`, `accent`).
- **Domain:** after adding a custom domain in Vercel, update `SITE` in `astro.config.mjs`,
  `public/robots.txt` and `public/.well-known/security.txt`.

## Development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Security

`vercel.json` sets a strict Content-Security-Policy (no inline scripts or styles; all JS lives in `public/js/`),
HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy and Permissions-Policy. The site loads no third-party
scripts, fonts or trackers. If you add inline `<script>` or `style=""` attributes, the CSP will block them.
