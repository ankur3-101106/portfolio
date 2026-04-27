import React from 'react';
import OriginalDocItem from '@theme-original/DocItem';

export default function DocItemWrapper(props) {
  const handleCopy = async () => {
    try {
      // Main markdown content container in Docusaurus
      const article = document.querySelector('article');

      if (!article) return;
s
      const text = article.innerText;
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  return (
    <div style={{position: 'relative'}}>
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        title="Copy entire page"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 10,
          padding: '6px 10px',
          cursor: 'pointer',
        }}
      >
        📋 Copy page
      </button>

      <OriginalDocItem {...props} />
    </div>
  );
}