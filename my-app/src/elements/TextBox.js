import React from "react";

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

    return flag === "**"? <strong key={index}>{text}</strong> : <i key={index}>{text}</i>

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
        const pushValue = <a href={link} key={index} target="_blank" rel="noreferrer">{textBold}</a>;
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
