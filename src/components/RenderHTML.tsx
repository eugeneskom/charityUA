import React from "react";

const RenderHTML = ({ htmlString }: { htmlString: string }) => {
  return <div className="rendered-divs" dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default RenderHTML;
