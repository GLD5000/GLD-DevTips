let linkString; 
function cloneContent(content){
  function itemHandler(item){
    if (typeof item !== "string") return item;
    const itemContainsLink = item.includes("www");
    if (itemContainsLink === false) return item;
    const indexOfOpenBracket = item.indexOf("(");
    const startSlice = indexOfOpenBracket + 1 || false;
    //const endSlice = item.indexOf(")") || false;
    linkString = item.slice(startSlice);
    const indexOfClosedSquareBracket = item.indexOf("]")
    return item.slice(0, indexOfClosedSquareBracket);
    
  }
  return Array.isArray(content)? content.map(item => Array.isArray(item) ? cloneContent(item) : itemHandler(item)):
  itemHandler(content);
}

export default function Link({ content }) {
  const text  = cloneContent(content);
  const link = linkString;
  return (<>
    <a href={link} target="_blank" rel="noreferrer">
      {text}
    </a>
  </>
  );
}
