export function extractPlainTextWithLineBreaks(htmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  let plainText = "";

  const addLineBreaks = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const children = element.childNodes;

      for (let i = 0; i < children.length; i++) {
        addLineBreaks(children[i]);
      }

      // Add two line breaks after closing tags
      if (element.tagName) {
        plainText += '\n\n';
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      plainText += node.nodeValue || "";
    }
  };

  addLineBreaks(doc.body);

  return plainText.trim();
}

export const RenderHTML = ({ htmlString }:{htmlString:string}) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};


export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    // behavior: 'smooth',
  });
};