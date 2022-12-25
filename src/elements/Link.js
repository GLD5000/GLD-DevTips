let linkString; 
  function itemHandler(item){
    if (typeof item !== "string") return item;
    const itemContainsLink = item.includes("http") || item.includes("www");
    if (itemContainsLink === false) return item;
    const indexOfOpenBracket = item.indexOf("(");
    const startSlice = indexOfOpenBracket + 1 || false;

    linkString = item.slice(startSlice);
    const indexOfClosedSquareBracket = item.indexOf("]")
    return item.slice(0, indexOfClosedSquareBracket);
  }


export default function Link({ content}) {
  const text  = itemHandler(content);
  const link = linkString;

  return (<>
    <a href={link}  target="_blank" rel="noreferrer">
      {text}
    </a>
  </>
  );
}
