import Link from "./Link";
import Bold from "./Bold";
import Italic from "./Italic";

function parseBoldItalic(text, flag){
  
  const firstSegmentBold = text.indexOf(flag) === 0;
  const secondSegmentBold = !firstSegmentBold;
  const splitBold = text.split(flag);
  const returnArray = splitBold.map((text, index) =>{
    const indexIsEven = index % 2 === 0;
    console.log(index % 2);
    const indexIsOdd = !indexIsEven;
 const shouldReturnText = (firstSegmentBold && indexIsOdd) || (secondSegmentBold && indexIsEven);
 console.log(shouldReturnText)   
 if (shouldReturnText) return text;

    return flag === "**"? <Bold key={index} content={text}/> : <Italic key={index} content={text}/>

  });
  return returnArray;
}


const TextBox = ({ text }) => {
  const returnArray = [];


  function parseLinks(text) {
    const linkTextArray = text.split("{link}");
    linkTextArray.forEach((segment, index) => {
      if (segment.includes("https://www.")) {
        const splitTextLink = segment.split("](");
        const text = splitTextLink[0].slice(1);
        const textBold = parseBoldItalic(text, "_");
        const link = splitTextLink[1].slice(0, splitTextLink[1].length - 1);
        const pushValue = <Link link={link} key={index} content={textBold}/>;
        returnArray.push(pushValue);
      } else {
        const text = segment;
        const pushValue = text;
        returnArray.push(pushValue);
      }
    });
  }
  parseLinks(text);
  
  return (
  <p className="text">
  {returnArray}
  </p>);
};

export default TextBox;
