// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Ankur's Page",
  tagline: 'Cyber Security Corner',
  favicon: 'img/favicon.jpg',

  future: {
    v4: true,
  },

  url: 'https://ankur3-101106.github.io',
  baseUrl: '/',

  organizationName: 'ankur3-101106',
  projectName: 'ankur3-101106.github.io',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // ✅ Mermaid
  themes: ['@docusaurus/theme-mermaid'],

  markdown: {
    mermaid: true,
  },

  // ✅ KaTeX CSS (required)
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
      type: 'text/css',
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
      rel: 'stylesheet',
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap',
      rel: 'stylesheet',
    },
  ],

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',

          editUrl: 'https://github.com/ankur3-101106/',

          // ✅ KaTeX
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },

        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/ankur3-101106/',

          // ✅ KaTeX
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],

          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },

        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',

    // ✅ FIXED ColorMode (prevents crash)
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    // ✅ Scrollspy (TOC tracking)
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },

    // ✅ Mermaid theme (safe)
    mermaid: {
      theme: {
        light: 'neutral',
        dark: 'dark',
      },
    },

    navbar: {
      title: "Ankur's Page",
      logo: {
        alt: 'My Site Logo',
        src: 'img/favicon.jpg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Notes',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/ankur3-101106',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [{ label: 'Notes', to: '/docs/intro' }],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: '/blog' },
            {
              label: 'GitHub',
              href: 'https://github.com/ankur3-101106',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ankur`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
      ],
      additionalLanguages: ['python', 'java', 'csharp', 'cpp', 'bash', 'powershell', 'rust', 'go', 'ruby', 'php', 'kotlin', 'swift', 'scala', 'haskell', 'lua', 'dart', 'typescript', 'json', 'yaml', 'markdown', 'graphql', 'docker', 'makefile', 'nginx', 'apacheconf', 'ini', 'diff'],
    },
  },
};

export default config;