import Link from "./Link";
import Bold from "./Bold";
import Italic from "./Italic";
import BlockQuote from "./BlockQuote";
import H1 from "./H1";
import H2 from "./H2";
import H3 from "./H3";
import H4 from "./H4";
import H5 from "./H5";
import H6 from "./H6";
import Li from "./Li";
import Ol from "./Ol";
import Ul from "./Ul";

const flagMap = new Map([
  [/\[(?=[\w\d.*\-/\s]+\]\([\w\d.\-/:]+\))/, { closingFlag: ")", type: "link"}],
  ["**", { closingFlag: "**", type: "bold"}],
  ["_", { closingFlag: "_", type: "italic"}],
  ["######", { closingFlag: /[\r\n]/, type: "h6"}],
  ["#####", { closingFlag: /[\r\n]/, type: "h5"}],
  ["####", { closingFlag: /[\r\n]/, type: "h4"}],
  ["###", { closingFlag: /[\r\n]/, type: "h3"}],
  ["##", { closingFlag: /[\r\n]/, type: "h2"}],
  ["#", { closingFlag: /[\r\n]/, type: "h1"}],
  [">", { closingFlag: /[\r\n]/, type: "quote"}],
  [/\s*-\s+/, { closingFlag: /[\r\n]/, type: "liUl"}],
  [/\s*[0-9n]+\.\s+/, { closingFlag: /[\r\n]/, type: "liOl"}],
  // ["{link}", "link"],
]);

function getFlagMatch(flag, string){
  let firstFlag = undefined;
  let firstFlagIndex = string.length;
  let flagFromMap = undefined;

  let flagText = typeof flag === "string" ? flag : null;
  if (typeof flag === "object" && string.match(flag) !== null)
    flagText = string.match(flag)[0];
  const indexOfFlag = string.indexOf(flagText);
  if (indexOfFlag === -1) return;

  if (indexOfFlag >= 0 && indexOfFlag < firstFlagIndex) {
    firstFlag = flagText;
    firstFlagIndex = indexOfFlag;
    flagFromMap = flag;
  }

}

function sliceFlaggedTextNew(text, firstFlag, firstFlagIndex, secondFlag, secondFlagIndex) {
  const flaggedTextStart = firstFlagIndex + firstFlag.length;
  const beforeFlag = firstFlagIndex === 0 ? null : text.slice(0, firstFlagIndex);
  const flaggedText = text.slice(flaggedTextStart, secondFlagIndex);
  const afterFlag =
    secondFlagIndex < text.length -1 - secondFlag.length ? text.slice(secondFlagIndex + secondFlag.length) : null;

  return { beforeFlag, flaggedText, afterFlag };
}


function stringHasFlag(string) {
  let firstFlag = undefined;
  let firstFlagIndex = undefined;
  let flagFromMap = undefined;
  if (string == null) return { firstFlag, firstFlagIndex };

  firstFlagIndex = string.length;
  flagMap.forEach((_, flag) => {
    let flagText = typeof flag === "string" ? flag : null;
    if (typeof flag === "object" && string.match(flag) !== null)
      flagText = string.match(flag)[0];
    const indexOfFlag = string.indexOf(flagText);
    if (indexOfFlag >= 0 && indexOfFlag < firstFlagIndex) {
      firstFlag = flagText;
      firstFlagIndex = indexOfFlag;
      flagFromMap = flag;
    }
  });
  return { firstFlag, firstFlagIndex, flagFromMap };
}

function sliceFlaggedText(text, flag, indexOfFlag, secondFlag) {
  const flaggedTextStart = indexOfFlag + flag.length;
  const indexOfSecondFlag = text.indexOf(secondFlag, flaggedTextStart);
  const hasSecondFlag = indexOfSecondFlag > 0 && indexOfSecondFlag;
  const beforeFlag = indexOfFlag === 0 ? null : text.slice(0, indexOfFlag);
  const flaggedText = hasSecondFlag
    ? text.slice(flaggedTextStart, indexOfSecondFlag)
    : text.slice(flaggedTextStart);
  const afterFlag =
    indexOfSecondFlag > 0 ? text.slice(indexOfSecondFlag + flag.length) : null;

  return { beforeFlag, flaggedText, afterFlag };
}
function wrapText(index, text, type) {
  const typeHandler = {
    link: (
      <Link
        key={"l" + index}
        content={text}
        recursiveParser={recursiveParser}
      />
    ),
    quote: <BlockQuote key={"b" + index} content={text} />,
    bold: <Bold key={"b" + index} content={text} />,
    italic: <Italic key={"i" + index} content={text} />,
    h1: <H1 key={"h" + index} content={text} />,
    h2: <H2 key={"h" + index} content={text} />,
    h3: <H3 key={"h" + index} content={text} />,
    h4: <H4 key={"h" + index} content={text} />,
    h5: <H5 key={"h" + index} content={text} />,
    h6: <H6 key={"h" + index} content={text} />,
    liUl: <Li key={"Ul" + index} content={text} />,
    liOl: <Li key={"Ol" + index} content={text} />,
  };
  return typeHandler[type];
}

function recursiveParser(text, index) {
  //Can return text or array
  const {
    firstFlag: flag,
    firstFlagIndex: indexOfFlag,
    flagFromMap,
  } = stringHasFlag(text);
  //guard clause
  if (flag === undefined) return text;
  const secondFlag = flagMap.get(flagFromMap).closingFlag || undefined;
  if (secondFlag === undefined) return text;
  const { beforeFlag, flaggedText, afterFlag } = sliceFlaggedText(
    text,
    flag,
    indexOfFlag,
    secondFlag
  );
  //pre-process flagged text
  const processedflaggedText = recursiveParser(flaggedText);
  // wrap flagged text
  const type = flagMap.get(flagFromMap).type;
  index += 1;
  const wrappedFlaggedText = wrapText(index, processedflaggedText, type);
  //pre-process remaining text
  const returnArray = [];
  // returnArray.push() = [beforeFlag, wrappedFlaggedText, recursiveParser(afterFlag) ]
  if (beforeFlag !== null) returnArray.push(beforeFlag);
  returnArray.push(wrappedFlaggedText);
  if (afterFlag !== null) returnArray.push(recursiveParser(afterFlag));
  return returnArray.length === 1 ? returnArray[0] : returnArray;
}

function wrapIncomingParagraphs(paragraph, index) {
  const parserOutput = recursiveParser(paragraph, index);
  const returnValue =
    typeof parserOutput === "object" &&
    Array.isArray(parserOutput) === false ? (
      parserOutput
    ) : (
      <p key={"p" + index} className="text">
        {parserOutput}
      </p>
    );
  return returnValue;
}

function findObjectType(wrappedObject) {
  // console.log(wrappedObject);
  // console.log(wrappedObject.key);
  const keyCharacter = wrappedObject.key[0];
  const isOrdered = keyCharacter === "O";
  const isUnordered = keyCharacter === "U";
  if (!isOrdered && !isUnordered) return "nonList";
  return keyCharacter;
}

function parseParagraphs(paragraphs){
  const returnArray = [];

  // map paragraphs calling recursive function on each
  let listItemArray = [];
  let listType = null;
  
  paragraphs?.forEach((paragraph, index, arr) => {
    // wrap text in <p
    const wrappedObject = wrapIncomingParagraphs(paragraph, index);
    const type = findObjectType(wrappedObject);
    const nonListItem = type === "nonList";
    if (nonListItem) {
      const wasListItem = listType !== type;
      if (wasListItem) {
        // list type just changed
        // make ol or ul object
        const wasOrderedList = listType === "O";
        const list =
        wasOrderedList ? (
            <Ol key={"Ol" + index} content={listItemArray} />
          ) : (
            <Ul key={"Ul" + index} content={listItemArray} />
          );
        returnArray.push(list);
        listType = type;
        listItemArray = [];
      }
      returnArray.push(wrappedObject);
    }
    const isOrderedListItem = type === "O";
    if (isOrderedListItem) {
      if (listType !== type && listItemArray.length > 0) {
        returnArray.push(<Ul key={"Ol" + index} content={listItemArray} />);
        listItemArray = [];
      }
      listType = type;
      listItemArray.push(wrappedObject);
    }
    const isUnorderedListItem = type === "U";
    if (isUnorderedListItem) {
      if (listType !== type && listItemArray.length > 0) {
        returnArray.push(<Ol key={"Ol" + index} content={listItemArray} />);
        listItemArray = [];
      }

      listType = type;
      listItemArray.push(wrappedObject);
    }
    const isLastListItem = index === arr.length - 1;
    const listItemArrayHasItems = listItemArray.length > 0;
    if (isLastListItem && listItemArrayHasItems) {
      const list =
        listType === "O" ? (
          <Ol key={"Ol" + index} content={listItemArray} />
        ) : (
          <Ul key={"Ul" + index} content={listItemArray} />
        );
      returnArray.push(list);
      listItemArray = [];
    }
  });
  return returnArray;
}

const TextBox = ({ text }) => {
  //split into paragraphs
  const paragraphs = text?.split(/\r?\n\s*/);
  const returnArray = parseParagraphs(paragraphs);
  // Find out if the return includes a header
  return <>{returnArray}</>;
};

export default TextBox;
