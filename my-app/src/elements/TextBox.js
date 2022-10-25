import Link from "./Link";
import Bold from "./Bold";
import Italic from "./Italic";
import H1 from "./H1";
import H2 from "./H2";
import H3 from "./H3";
import H4 from "./H4";
import H5 from "./H5";
import H6 from "./H6";

const flagMap = {
  "**": "bold",
  _: "italic",
  "{link}": "link",
  "#": "h1",
  "##": "h2",
  "###": "h3",
  "####": "h4",
  "#####": "h5",
  "######": "h6",
};

function stringHasFlag(string){
  let firstFlag = undefined; 
  let firstFlagIndex = string.length;
  Object.keys(flagMap).forEach(flag =>{
    const indexOfFlag = string.indexOf(flag);
    if (indexOfFlag >= 0 && indexOfFlag < firstFlagIndex) {
      firstFlag = flag;
      firstFlagIndex = indexOfFlag;
    }
  });
  return {firstFlag, firstFlagIndex};
}

function sliceFlaggedText(text, flag, indexOfFlag){
  const flaggedTextStart = indexOfFlag + flag.length;
  const indexOfSecondFlag = text.indexOf(flag, flaggedTextStart) || text.length;

  const beforeFlag = indexOfFlag === 0? null: text.slice(0, indexOfFlag);
  const flaggedText = text.slice(flaggedTextStart, indexOfSecondFlag);
  const afterFlag = indexOfSecondFlag > 0 ? text.slice(indexOfSecondFlag + flag.length) : null;

  return {beforeFlag, flaggedText, afterFlag};

}



function parseFlags(text) {

  


  const {firstFlag: flag, firstFlagIndex: indexOfFlag } = stringHasFlag(text);

  const firstSegmentFlagged = indexOfFlag === 0;
  const secondSegmentFlagged = !firstSegmentFlagged;
  const splitFlagged = text.split(flag, 3);


  const returnArray = splitFlagged.map((text, index) => {
    const indexIsEven = index % 2 === 0;
    const indexIsOdd = !indexIsEven;
    const shouldReturnText =
      (firstSegmentFlagged && indexIsOdd) || (secondSegmentFlagged && indexIsEven);

    const typeHandler = {
      bold: <Bold key={index} content={text} />,
      italic: <Italic key={index} content={text} />,
      link: <Link key={index} content={text} />,
      h1: <H1 key={index} content={text} />,
      h2: <H2 key={index} content={text} />,
      h3: <H3 key={index} content={text} />,
      h4: <H4 key={index} content={text} />,
      h5: <H5 key={index} content={text} />,
      h6: <H6 key={index} content={text} />,
    };
    const type = flagMap[flag];
    if (shouldReturnText) return text;

    return typeHandler[type];
  });
  return returnArray;
}

const TextBox = ({ text }) => {
  const returnArray = [];

  function parseLinks(text) {
    const linkTextArray = text.split("{link}");
    linkTextArray.forEach((segment, index) => {
      if (segment.includes("https://www.")) {
        const pushValue = <Link key={index} content={segment} />;
        returnArray.push(pushValue);
      } else {
        const text = segment;
        const pushValue = text;
        returnArray.push(pushValue);
      }
    });
  }
  parseLinks(text);

  return <p className="text">{returnArray}</p>;
};

export default TextBox;
