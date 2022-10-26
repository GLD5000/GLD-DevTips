let linkString;
function cloneContent(content){
  function itemHandler(item){
    if (typeof item !== "string") return item;
    const itemContainsLink = item.includes("www");
    if (itemContainsLink === false) return item;
    const indexOfOpenBracket = item.indexOf("(");
    const startSlice = indexOfOpenBracket + 1 || false;
    const endSlice = item.indexOf(")") || false;
    linkString = item.slice(startSlice, endSlice);
    return item.slice(0, indexOfOpenBracket);
    
  }
  return Array.isArray(content)? content.map(item => Array.isArray(item) ? cloneContent(item) : itemHandler(item)):
  itemHandler(content);
}


function sliceLink(x){
  const startSlice = x.indexOf("(") + 1 || false;
  const endSlice = x.indexOf(")") || false;
  const link = x.slice(startSlice, endSlice);
  const text = x.slice(0, startSlice);
  return {text, link};
} 
const returnArray = [];
function recursiveLinkFinder(x){
  const isArray = Array.isArray(x);
  if (isArray === false && typeof x === "string" && x.indexOf(")") >= 0){ //found link segment
   const {text, link} = sliceLink(x);
   returnArray.push(text);
   returnArray.push("WwWwWw" + link);
   return returnArray;
  }
  // else if array loop
  isArray? x.map(recursiveLinkFinder):
  //else push to returnArray
  returnArray.push(x);
  return returnArray;
}

function processLinkArray(content){
  const arrayAll = recursiveLinkFinder(content);
  console.log(arrayAll); 
  if (arrayAll.includes("WwWwWw")) console.log(true);
  // const text = content;
  // const link = content.filter(x => {
  //   const startSlice = x.indexOf("(") + 1 || false;
  //   const endSlice = x.indexOf(")") || false;
  //   if (startSlice && endSlice) return x.slice(startSlice, endSlice)
  // });
  // return {link, text};
}
function processLinkContent(content) {
  const splitTextLink = content.split("](");
  const text = splitTextLink[0].slice(1);
  const link = splitTextLink[1].slice(0, splitTextLink[1].length - 1);
  return { link, text };
}

export default function Link({ content }) {
  const text  = cloneContent(content);
  const link = linkString;

  return (
    <a href={link} target="_blank" rel="noreferrer">
      {text}
    </a>
  );
}
