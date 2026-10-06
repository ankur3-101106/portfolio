// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const SITE_URL = 'https://ankur3-101106.github.io';
const REPO_URL = 'https://github.com/ankur3-101106/portfolio';
const PROFILE_URL = 'https://github.com/ankur3-101106';

const mathPlugins = {
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Ankur's Page",
  tagline: 'Cyber Security Corner',
  favicon: 'img/favicon.jpg',

  future: {
    v4: true,
  },

  url: SITE_URL,
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

  // ✅ KaTeX & Combined Google Fonts (Single HTTP request)
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
      type: 'text/css',
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
      rel: 'stylesheet',
    },
  ],

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: `${REPO_URL}/tree/main/`,
          ...mathPlugins,
        },

        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: `${REPO_URL}/tree/main/`,
          ...mathPlugins,
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
        content: "Ankur's Page",
      },
      {
        property: 'og:description',
        content: 'Cybersecurity, Linux, Networking, and Programming Tutorials',
      },
      {
        property: 'og:image',
        content: `${SITE_URL}/img/seo-banner.png`,
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    image: 'img/seo-banner.png',

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

    // ✅ Mermaid theme
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
        {
          href: PROFILE_URL,
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'custom-clock',
          href: 'https://time.is',
          position: 'right',
          className: 'clock-navbar-item',
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
          items: [
            { label: 'Introduction', to: '/docs/intro' },
            { label: 'Notes', to: '/docs/intro' },
          ],
        },
        {
          title: 'Connect',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/in/ankur101106',
            },
            {
              label: 'GitHub',
              href: PROFILE_URL,
            },
            {
              label: 'X (Twitter)',
              href: 'https://x.com/ankur3_101106',
            },
            {
              label: 'Email',
              href: 'mailto:ankurdcs101106@gmail.com',
            },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: '/blog' },
            {
              label: 'Repository',
              href: REPO_URL,
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
      additionalLanguages: [
        'python',
        'java',
        'csharp',
        'cpp',
        'bash',
        'powershell',
        'rust',
        'go',
        'ruby',
        'php',
        'kotlin',
        'swift',
        'scala',
        'haskell',
        'lua',
        'dart',
        'typescript',
        'json',
        'yaml',
        'markdown',
        'graphql',
        'docker',
        'makefile',
        'nginx',
        'apacheconf',
        'ini',
        'diff',
      ],
    },
  },
};

export default config;