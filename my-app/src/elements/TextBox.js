import React from "react";

const TextBox = ({ text }) => {
  const returnArray = [];
  function parseLinks(text) {
    const linkTextArray = text.split("{link}");
    linkTextArray.forEach((segment, index) => {
      if (segment.includes("https://www.")) {
        const splitTextLink = segment.split("](");
        const text = splitTextLink[0].slice(1);
        const link = splitTextLink[1].slice(0, splitTextLink[1].length - 1);
        const pushValue = <a href={link} key={index} target="_blank" rel="noreferrer">{text}</a>;
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
