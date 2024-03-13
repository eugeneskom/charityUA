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
        plainText += "\n\n";
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      plainText += node.nodeValue || "";
    }
  };

  addLineBreaks(doc.body);

  return plainText.trim();
}

export const RenderHTML = ({ htmlString }: { htmlString: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 64,
    // behavior: 'smooth',
  });
};

export const parseApiResponse = (data: string): any => {
  // const data = response.data;

  // Remove any characters before the opening curly brace
  const cleanedData = data.substring(data.indexOf("{"));

  // Remove any characters after the closing curly brace
  const finalData = cleanedData.substring(0, cleanedData.lastIndexOf("}") + 1);

  // Parse the cleaned string as JSON
  return JSON.parse(finalData);
};
