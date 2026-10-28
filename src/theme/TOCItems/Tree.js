import React, { useMemo } from 'react';
import Tree from '@theme-original/TOCItems/Tree';
import katex from 'katex';

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function renderMath(text) {
  if (!text || typeof text !== 'string' || (!text.includes('$') && !text.includes('\\'))) {
    return text;
  }

  let processed = text;

  // Display math $$...$$
  if (processed.includes('$$')) {
    processed = processed.replace(/\$\$([\s\S]+?)\$\$/g, (match, math) => {
      try {
        return katex.renderToString(decodeEntities(math.trim()), {
          displayMode: true,
          throwOnError: false,
        });
      } catch {
        return match;
      }
    });
  }

  // Inline math $...$
  if (processed.includes('$')) {
    processed = processed.replace(/\$([^\$\n]+?)\$/g, (match, math) => {
      try {
        return katex.renderToString(decodeEntities(math.trim()), {
          displayMode: false,
          throwOnError: false,
        });
      } catch {
        return match;
      }
    });
  }

  // Fallback for isolated LaTeX commands that might lack $ delimiters (e.g. \huge{...}, \pi, \alpha)
  if (processed.includes('\\')) {
    processed = processed.replace(/\\(?:huge|LARGE|Large|textbf|text|phi|alpha|beta|gamma|delta|pi|sigma|omega|theta|lambda|mu|leq|geq|neq|approx|times|pm|in|notin|subset|cap|cup|forall|exists|infty)(?:\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}|[a-zA-Z]+)?/g, (match) => {
      try {
        return katex.renderToString(decodeEntities(match.trim()), {
          displayMode: false,
          throwOnError: false,
        });
      } catch {
        return match;
      }
    });
  }

  return processed;
}

function transformToc(items) {
  if (!items || !Array.isArray(items)) {
    return items;
  }
  return items.map((item) => ({
    ...item,
    value: renderMath(item.value),
    children: transformToc(item.children),
  }));
}

export default function TreeWrapper(props) {
  const transformedToc = useMemo(() => {
    return transformToc(props.toc);
  }, [props.toc]);

  return <Tree {...props} toc={transformedToc} />;
}
