# Complete SEO Optimization Guide for Your Docusaurus Website

## 1. Configure Global SEO Metadata

Edit `docusaurus.config.js`:

```js
// @ts-check

const config = {
  title: 'Your Website Name',
  tagline: 'Your Website Tagline',
  favicon: 'img/favicon.ico',

  url: 'https://yourdomain.com',
  baseUrl: '/',

  organizationName: 'your-github-username',
  projectName: 'your-project-name',

  themeConfig: {
    metadata: [
      {
        name: 'keywords',
        content:
          'cybersecurity, linux, networking, ethical hacking, programming, tutorials',
      },
      {
        name: 'author',
        content: 'Ankur Macwan',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:title',
        content: 'Your Website Name',
      },
      {
        property: 'og:description',
        content: 'Cybersecurity, Linux, Networking, and Programming Tutorials',
      },
      {
        property: 'og:image',
        content: 'https://yourdomain.com/img/seo-banner.png',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
  },
};

module.exports = config;
```

---

# 2. Add Proper Page Titles and Descriptions

Every documentation page should have:

```md
---
title: Linux File Permissions
sidebar_position: 1
description: Learn Linux file permissions, chmod, chown, and permission management in simple language.
keywords:
  - linux permissions
  - chmod
  - chown
  - linux tutorial
---
```

SEO rules:

- Title should contain the main keyword.
- Description should be 140–160 characters.
- Use natural keywords.
- Avoid keyword stuffing.

---

# 3. Create SEO Friendly URLs

Good URL:

```txt
/docs/linux/file-permissions
```

Bad URL:

```txt
/docs/page1?id=123
```

Docusaurus automatically generates good URLs if filenames are clean.

Use:

```txt
linux-file-permissions.md
```

instead of:

```txt
abc123.md
```

---

# 4. Improve Heading Structure

Each page should have:

```md
# Main Topic

## Subtopic

### Smaller Section
```

Rules:

- Only ONE `#` heading per page.
- Use keywords naturally in headings.
- Keep headings meaningful.

Example:

```md
# Linux File Permissions
## Understanding chmod
### Numeric Permission Method
```

---

# 5. Add Internal Linking

Connect related pages together.

Example:

```md
See also:

- [Linux Users and Groups](./linux-users-groups)
- [Linux File System](./linux-filesystem)
```

Benefits:

- Better crawlability
- More page authority
- Lower bounce rate
- Better indexing

---

# 6. Generate Sitemap

Install sitemap plugin:

```bash
npm install @docusaurus/plugin-sitemap
```

Add to config:

```js
plugins: [
  [
    '@docusaurus/plugin-sitemap',
    {
      changefreq: 'weekly',
      priority: 0.5,
      ignorePatterns: ['/tags/**'],
      filename: 'sitemap.xml',
    },
  ],
],
```

After build:

```bash
npm run build
```

You will get:

```txt
build/sitemap.xml
```

---

# 7. Add robots.txt

Create:

```txt
static/robots.txt
```

Content:

```txt
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

---

# 8. Optimize Website Speed

Google ranks fast websites higher.

## Compress Images

Use:

- WebP images
- AVIF images
- Smaller dimensions

Avoid:

- Huge PNG files
- Large GIFs

---

## Lazy Load Images

Use:

```md
![Image](./image.webp)
```

Docusaurus automatically optimizes many images.

---

## Reduce JavaScript Size

Avoid:

- Too many animations
- Heavy libraries
- Unused plugins

---

# 9. Add Structured Data (Schema Markup)

Add inside `docusaurus.config.js`:

```js
headTags: [
  {
    tagName: 'script',
    attributes: {
      type: 'application/ld+json',
    },
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Your Website Name',
      url: 'https://yourdomain.com',
      description:
        'Cybersecurity, Linux, Networking, and Programming Tutorials',
    }),
  },
],
```

This helps Google understand your site.

---

# 10. Add Open Graph Preview Images

Create:

```txt
static/img/seo-banner.png
```

Recommended size:

```txt
1200 × 630
```

This image appears when sharing links on:

- Discord
- LinkedIn
- WhatsApp
- Twitter
- Facebook

---

# 11. Use Semantic HTML

Docusaurus already helps, but avoid:

- Too many divs
- Empty headings
- Random text blocks

Use:

- article
- section
- nav
- aside
- header
- footer

when creating custom React components.

---

# 12. Mobile Optimization

Your website must work perfectly on phones.

Check:

- Font size
- Navbar overflow
- Sidebar usability
- Touch interactions
- Responsive images

Use Chrome DevTools:

```txt
F12 → Toggle Device Toolbar
```

---

# 13. Add Canonical URLs

Prevents duplicate content issues.

Inside page frontmatter:

```md
slug: /linux/file-permissions
```

And in config:

```js
url: 'https://yourdomain.com',
baseUrl: '/',
```

---

# 14. Improve Content Quality

Google prioritizes:

- Original content
- Helpful tutorials
- Technical depth
- User engagement

Best practices:

- Write detailed tutorials
- Use examples
- Add diagrams
- Add code snippets
- Answer real questions

---

# 15. Add Search Functionality

Install local search:

```bash
npm install @easyops-cn/docusaurus-search-local
```

Add:

```js
plugins: [
  [
    require.resolve('@easyops-cn/docusaurus-search-local'),
    {
      hashed: true,
      language: ['en'],
      highlightSearchTermsOnTargetPage: true,
      explicitSearchResultPath: true,
    },
  ],
],
```

Search improves:

- User retention
- Navigation
- Session duration

---

# 16. Add Google Search Console

1. Open:

```txt
https://search.google.com/search-console
```

2. Add property.

3. Verify domain.

4. Submit sitemap:

```txt
https://yourdomain.com/sitemap.xml
```

Benefits:

- Indexing reports
- SEO errors
- Keyword rankings
- Crawl statistics

---

# 17. Add Google Analytics

Install:

```bash
npm install @docusaurus/plugin-google-gtag
```

Config:

```js
plugins: [
  [
    '@docusaurus/plugin-google-gtag',
    {
      trackingID: 'G-XXXXXXXXXX',
      anonymizeIP: true,
    },
  ],
],
```

---

# 18. Improve Core Web Vitals

Important metrics:

- LCP (Largest Contentful Paint)
- CLS (Cumulative Layout Shift)
- INP (Interaction to Next Paint)

Improve by:

- Compressing images
- Reducing animations
- Optimizing fonts
- Avoiding layout shifts

Test using:

```txt
https://pagespeed.web.dev/
```

---

# 19. Add Breadcrumbs

Docusaurus already supports breadcrumbs.

Ensure:

```js
breadcrumbs: true,
```

inside docs plugin config.

---

# 20. SEO Content Strategy

Best topics for ranking:

- Linux tutorials
- Cybersecurity guides
- Networking fundamentals
- Python scripting
- Ethical hacking basics
- Assembly language tutorials
- CTF writeups
- Arch Linux guides

Good article titles:

- "Linux File Permissions Explained"
- "Beginner Guide to Wireshark"
- "How TCP Handshake Works"
- "Arch Linux Installation Guide"
- "Python Port Scanner Tutorial"

---

# 21. Add FAQ Sections

Google often uses FAQs for rich results.

Example:

```md
## FAQ

### What is chmod in Linux?
chmod changes file permissions in Linux.

### What does 777 mean?
777 gives read, write, and execute permissions to everyone.
```

---

# 22. Use Alt Text for Images

Bad:

```md
![](./image.png)
```

Good:

```md
![Linux file permission diagram](./permissions.webp)
```

---

# 23. Add Social Metadata Per Page

Example:

```md
image: /img/linux-banner.png
```

---

# 24. Deploy With HTTPS

Google prefers HTTPS.

Use:

- GitHub Pages
- Cloudflare Pages
- Vercel
- Netlify

All support HTTPS.

---

# 25. Best Hosting for SEO

Recommended:

1. Cloudflare Pages
2. Vercel
3. Netlify
4. GitHub Pages

Cloudflare Pages is excellent for:

- Global CDN
- Fast delivery
- Free SSL
- Caching

---

# 26. Advanced Technical SEO

## Preload Fonts

```html
<link
  rel="preload"
  href="/fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

---

## DNS Prefetch

```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
```

---

## Use Modern Image Formats

Prefer:

- WebP
- AVIF

Avoid:

- BMP
- TIFF

---

# 27. SEO Audit Checklist

## Must Have

- Meta title
- Meta description
- Sitemap
- robots.txt
- HTTPS
- Mobile responsive
- Fast loading
- Structured data
- Internal links
- Open Graph tags

## Recommended

- FAQ schema
- Analytics
- Search Console
- Local search
- WebP images
- Canonical URLs

---

# 28. Best SEO Tools

## Free Tools

- Google Search Console
- Google PageSpeed Insights
- Google Lighthouse
- Ahrefs Free Tools
- Screaming Frog SEO Spider

---

# 29. Lighthouse Optimization Target

Aim for:

```txt
Performance: 90+
Accessibility: 95+
Best Practices: 95+
SEO: 100
```

Run:

```txt
F12 → Lighthouse → Generate Report
```

---

# 30. Final High Impact Improvements

Highest SEO impact:

1. Fast loading speed
2. High quality content
3. Proper headings
4. Internal linking
5. Mobile optimization
6. Structured data
7. Search Console setup
8. Optimized images
9. Keyword focused titles
10. Consistent publishing

---

# Recommended Next Step

Send:

- Your website URL
- GitHub repository
- Current Lighthouse report
- Current `docusaurus.config.js`

Then the SEO setup can be optimized specifically for your website with:

- Exact config changes
- Better metadata
- Performance optimization
- Structured data
- Advanced indexing setup
- Core Web Vitals optimization
- Technical SEO fixes

