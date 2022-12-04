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
import P from "./P";

const lineEndRegex = /\s*PpPpEEE\s*\r?\n+\s*/;
const flagMap = new Map([
  [/PpPpSSS\s*######/, { closingFlag: lineEndRegex, type: "h6" }],
  [/PpPpSSS\s*#####(?!#)/, { closingFlag: lineEndRegex, type: "h5" }],
  [/PpPpSSS\s*####(?!#)/, { closingFlag: lineEndRegex, type: "h4" }],
  [/PpPpSSS\s*###(?!#)/, { closingFlag: lineEndRegex, type: "h3" }],
  [/PpPpSSS\s*##(?!#)/, { closingFlag: lineEndRegex, type: "h2" }],
  [/PpPpSSS\s*#(?!#)/, { closingFlag: lineEndRegex, type: "h1" }],
  [/PpPpSSS\s*>/, { closingFlag: lineEndRegex, type: "quote" }],
  [/PpPpSSS\s*-\s+/, { closingFlag: lineEndRegex, type: "liUl" }],
  [/PpPpSSS\s*[0-9n]+\.\s+/, { closingFlag: lineEndRegex, type: "liOl" }],
  ["PpPpSSS", { closingFlag: "PpPpEEE", type: "paragraph" }],
  [
    /\[(?=[\w\d.*\-/\s]+\]\([\w\d.\-/:]+\))/,
    { closingFlag: ")", type: "link" },
  ],
  ["**", { closingFlag: "**", type: "bold" }],
  ["_", { closingFlag: "_", type: "italic" }],
  // ["{link}", "link"],
]);

function markParagraphs(string){
  const regex = /\r?\n+\s*/g;
  return "PpPpSSS" + string.replaceAll(regex, "PpPpEEE \n\r PpPpSSS") + "PpPpEEE";
}

function findStringMatch(flag, string, startAt = 0) {
  if (startAt === -1) startAt = 0;
  const failedReturn = [null, -1];
  if (string === undefined) return failedReturn;

  const isRegexFlag = typeof flag === "object";
  if (isRegexFlag === false) {
    const index = string.indexOf(flag, startAt);
    if (index === -1) return failedReturn;
    return [flag, index];
  }

  const matchReturnArray = string.match(flag);
  if (matchReturnArray === null) return failedReturn;
  const match = string.match(flag)[0];
  const index = string.indexOf(match, startAt);
  return [match, index];
}

function stringHasFlag(string) {
  let firstFlag = undefined;
  let firstFlagIndex = undefined;
  let secondFlag = undefined;
  let secondFlagIndex = undefined;
  let flagFromMap = undefined;

  const isEmptyString = string == null;
  if (isEmptyString) return { firstFlag, firstFlagIndex };

  firstFlagIndex = string.length;

  flagMap.forEach((_, flag) => {
    const firstStringMatch = findStringMatch(flag, string);
    if (firstStringMatch[0] == null) return;
    const secondFlagForMatch = flagMap.get(flag).closingFlag;
    const secondStringMatch = findStringMatch(
      secondFlagForMatch,
      string,
      firstStringMatch[1] + firstStringMatch[0].length
    );
    firstStringMatch[0] && console.log(firstStringMatch[0]);
    secondStringMatch[0] && console.log(secondStringMatch[0]);
    if (
      firstStringMatch[0] &&
      secondStringMatch[0] &&
      firstStringMatch[1] < firstFlagIndex
    ) {
      firstFlag = firstStringMatch[0];
      firstFlagIndex = firstStringMatch[1];
      secondFlag = secondStringMatch[0];
      secondFlagIndex = secondStringMatch[1];
      flagFromMap = flag;
    }
    // const isRegexFlag = typeof flag === "object";
    // let flagText = isRegexFlag === false ? flag : null;
    // if (isRegexFlag && string.match(flag) !== null)
    //   flagText = string.match(flag)[0];
    // const indexOfFlag = string.indexOf(flagText);
    // if (indexOfFlag >= 0 && indexOfFlag < firstFlagIndex) {
    //   firstFlag = flagText;
    //   firstFlagIndex = indexOfFlag;
    //   flagFromMap = flag;
    // }
  });
  return {
    firstFlag,
    firstFlagIndex,
    secondFlag,
    secondFlagIndex,
    flagFromMap,
  };
}

function sliceFlaggedText(
  text,
  firstFlag,
  firstFlagIndex,
  secondFlag,
  secondFlagIndex
) {
  console.log(secondFlag.length);
  const flaggedTextStart = firstFlagIndex + firstFlag.length;
  const afterFlaggedStart = secondFlagIndex + secondFlag.length;
  const beforeFlag =
    firstFlagIndex === 0 ? null : text.slice(0, firstFlagIndex);
  const flaggedText = text.slice(flaggedTextStart, secondFlagIndex);
  const afterFlag =
    text.length > afterFlaggedStart ? text.slice(afterFlaggedStart) : null;
  console.log(`afterFlag ${afterFlag}`);

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
    paragraph:<P key={"p" + index} content={text} />,
  };
  return typeHandler[type];
}

function recursiveParser(text, index) {
  //Can return text or array
  const {
    firstFlag,
    firstFlagIndex,
    secondFlag,
    secondFlagIndex,
    flagFromMap,
  } = stringHasFlag(text);
  //guard clause
  if (firstFlag === undefined) return text;
  //const secondFlag = flagMap.get(flagFromMap).closingFlag || undefined;
  if (secondFlag === undefined) return text;

  const { beforeFlag, flaggedText, afterFlag } = sliceFlaggedText(
    text,
    firstFlag,
    firstFlagIndex,
    secondFlag,
    secondFlagIndex
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

function parseParagraphs(paragraphs) {
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
        const list = wasOrderedList ? (
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
  //const paragraphs = text?.split(/\r?\n\s*/);
  //const returnArray = parseParagraphs(paragraphs);
  // Find out if the return includes a header
  const string = markParagraphs(text)
  const returnArray = recursiveParser(string); // !!!!!!!

  return <>{returnArray}</>;
};

export default TextBox;
