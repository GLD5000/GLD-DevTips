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
  "######": "h6",
  "#####": "h5",
  "####": "h4",
  "###": "h3",
  "##": "h2",
  "#": "h1",
  "**": "bold",
  _: "italic",
  "{link}": "link",
};

function stringHasFlag(string) {
  let firstFlag = undefined;
  let firstFlagIndex = undefined;
  if (string == null) return { firstFlag, firstFlagIndex };

  firstFlagIndex = string.length;
  Object.keys(flagMap).forEach((flag) => {
    const indexOfFlag = string.indexOf(flag);
    if (indexOfFlag >= 0 && indexOfFlag < firstFlagIndex) {
      firstFlag = flag;
      firstFlagIndex = indexOfFlag;
    }
  });
  return { firstFlag, firstFlagIndex };
}

function sliceFlaggedText(text, flag, indexOfFlag) {
  const flaggedTextStart = indexOfFlag + flag.length;
  const indexOfSecondFlag = text.indexOf(flag, flaggedTextStart);
  const hasSecondFlag = indexOfSecondFlag > 0 && indexOfSecondFlag;
  const beforeFlag = indexOfFlag === 0 ? null : text.slice(0, indexOfFlag);
  const flaggedText = hasSecondFlag? text.slice(flaggedTextStart, indexOfSecondFlag ): text.slice(flaggedTextStart);
  const afterFlag =
    indexOfSecondFlag > 0 ? text.slice(indexOfSecondFlag + flag.length) : null;

  return { beforeFlag, flaggedText, afterFlag };
}
function wrapText(index, text, type) {
  const typeHandler = {
    bold: <Bold key={index} content={text} />,
    italic: <Italic key={index} content={text} />,
    link: <Link key={index} content={text} />,
    h1: <H1 key={"h" + index} content={text} />,
    h2: <H2 key={"h" + index} content={text} />,
    h3: <H3 key={"h" + index} content={text} />,
    h4: <H4 key={"h" + index} content={text} />,
    h5: <H5 key={"h" + index} content={text} />,
    h6: <H6 key={"h" + index} content={text} />,
  };
  return typeHandler[type];
}

function recursiveParser(text, index) {
  //Can return text or array
  const { firstFlag: flag, firstFlagIndex: indexOfFlag } = stringHasFlag(text);
  //guard clause
  if (flag === undefined) return text;

  const { beforeFlag, flaggedText, afterFlag } = sliceFlaggedText(
    text,
    flag,
    indexOfFlag
  );
  //pre-process flagged text
  const processedflaggedText = recursiveParser(flaggedText);
  // wrap flagged text
  const type = flagMap[flag];
  index += 1;
  const wrappedFlaggedText = wrapText(index, processedflaggedText, type);
  //pre-process remaining text
  const returnArray = [];
  // returnArray.push() = [beforeFlag, wrappedFlaggedText, recursiveParser(afterFlag) ]
  if (beforeFlag !== null) returnArray.push(beforeFlag);
  returnArray.push(wrappedFlaggedText);
  if (afterFlag !== null) returnArray.push(recursiveParser(afterFlag));
  return returnArray.length === 1? returnArray[0]: returnArray;
}

function wrapIncomingParagraphs(paragraph, index){
  const parserOutput  = recursiveParser(paragraph, index);
  const returnValue = typeof parserOutput === "object" ? parserOutput: <p key={index} className="text">{parserOutput}</p>;
  console.log(returnValue);
  return returnValue;
}

const TextBox = ({ text }) => {
  //split into paragraphs
  const paragraphs = text.split(/\n\s+/); //not splitting string literals correctly
  // map paragraphs calling recursive function on each
  const returnArray = paragraphs.map((paragraph, index) => {
    return wrapIncomingParagraphs(paragraph, index);
    // return recursiveParser(paragraph, index)
  });
  // Find out if the return includes a header
  const includesHeader = !Array.isArray(returnArray) &&
  typeof returnArray[0][0] === "object" &&
  returnArray[0][0].key[0] === "h"
;

  return (
    <>
   {returnArray}
    </>
  ); 
};

export default TextBox;
