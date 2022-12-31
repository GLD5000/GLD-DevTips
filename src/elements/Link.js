let linkString; 
  function sliceLinkLocalUrl(item){
    const type = "local";
    
    const indexOfOpenBracket = item.indexOf("(");
    const startSlice = indexOfOpenBracket + 1 || false;
    const urlField = item.slice(startSlice);

    const titleIndex = urlField.indexOf("title");
    const tagIndex = urlField.indexOf("tags");

    const url = window.location.href; 

    const indexOfClosedSquareBracket = item.indexOf("]")
    const text =  item.slice(0, indexOfClosedSquareBracket);



    return {url, text, type};

  }
  function sliceLinkSimple(item){
    const type = "web";

    const indexOfOpenBracket = item.indexOf("(");
    const startSlice = indexOfOpenBracket + 1 || false;
    const url = item.slice(startSlice);

    const indexOfClosedSquareBracket = item.indexOf("]")
    const text =  item.slice(0, indexOfClosedSquareBracket);

    return {url, text, type};
  }

  function itemHandler(item){
    if (typeof item !== "string") return item;
    const itemContainsLink = item.includes("http") || item.includes("www");
    if (itemContainsLink === false) return item;
    return sliceLinkSimple(item)
  }


export default function Link({ item}) {
  const {url, text, type}  = itemHandler(item);

  return (<>
    {type === "local"?
    (<a href={url}>
      {text}
    </a>):
    (<a href={url}  target="_blank" rel="noreferrer">
    {text}
  </a>)
    }
  </>
  );
}
