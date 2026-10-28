function visitHeadingMath(node) {
  if (!node) return;
  if (node.type === 'heading' && Array.isArray(node.children)) {
    for (const child of node.children) {
      if (child.type === 'inlineMath' && typeof child.value === 'string') {
        if (!child.value.startsWith('$')) {
          child.value = '$' + child.value + '$';
        }
      }
    }
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      visitHeadingMath(child);
    }
  }
}

export default function remarkPreserveHeadingMath() {
  return (tree) => {
    visitHeadingMath(tree);
  };
}

