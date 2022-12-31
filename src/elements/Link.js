let linkString; 
  function getTags(string, start, end = undefined){
    return "tags=" + string.slice(start,end).split(",").join("&tags=");
  }
  function sliceLinkLocalUrl(item){
    const type = "local";
    
    const indexOfOpenBracket = item.indexOf("(");
    const startSlice = indexOfOpenBracket + 1 || false;
    const urlField = item.slice(startSlice);
    
    let url = window.location.href + "?";
    console.log("url");
    console.log(url);
    const titleFlag = "title=";
    let titleIndex = urlField.indexOf(titleFlag);
    titleIndex = titleIndex > -1 && titleIndex;
    console.log(`titleIndex ${titleIndex}`);
    const tagsFlag = "tags=";
    let tagIndex = urlField.indexOf(tagsFlag);
    tagIndex = tagIndex > -1 && tagIndex;
    console.log(`tagIndex ${tagIndex}`);
    if (tagIndex !== false) url += getTags(urlField, tagIndex + tagsFlag.length, titleIndex);
    if (titleIndex !== false) url += urlField.slice(titleIndex, tagIndex || undefined);
    console.log(url);

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
    if (typeof item !== "string") return {url: undefined, text: item, type: "non-link"};
    const itemContainsLink = item.includes("http") || item.includes("www");
    if (itemContainsLink === false) return sliceLinkLocalUrl(item);
    return sliceLinkSimple(item);
  }


export default function Link({content}) {
  const {url, text, type}  = itemHandler(content);

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
