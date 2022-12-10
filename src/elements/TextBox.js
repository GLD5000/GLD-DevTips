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
import CodeBox from "./CodeBox";
import Table from "../components/tips/Table";
import Hint from "./Hint";

const lineEndRegex = /PpPpEEE\r\n/;

const blockFlagStart = "PpPpSSS[ ]{0,3}";
const blockFlagEndOptional = "(PpPpEEE)?";
const blockFlagEnd = "PpPpEEE\r\n";

const codeFlag = "[`~]{3,}";
const codeBlockOpen = new RegExp(
  blockFlagStart + codeFlag + blockFlagEndOptional
);
const codeBlockClosed = new RegExp(codeFlag + blockFlagEnd);

const tableFlag = "[\\|]{3,}";
const tableBlockOpen = new RegExp(blockFlagStart + tableFlag + blockFlagEnd);
const tableBlockClosed = new RegExp(
  blockFlagEnd + blockFlagStart + tableFlag + blockFlagEnd
);

const completeFlagMap = new Map([
  [tableBlockOpen, { closingFlag: tableBlockClosed, type: "table" }],
  [codeBlockOpen, { closingFlag: codeBlockClosed, type: "code" }],
  [/(PpPpSSS)\s?######/, { closingFlag: lineEndRegex, type: "h6" }],
  [/(PpPpSSS)\s?#####(?!#)/, { closingFlag: lineEndRegex, type: "h5" }],
  [/(PpPpSSS)\s?####(?!#)/, { closingFlag: lineEndRegex, type: "h4" }],
  [/(PpPpSSS)\s?###(?!#)/, { closingFlag: lineEndRegex, type: "h3" }],
  [/(PpPpSSS)\s?##(?!#)/, { closingFlag: lineEndRegex, type: "h2" }],
  [/(PpPpSSS)\s?#(?!#)/, { closingFlag: lineEndRegex, type: "h1" }],
  [/(PpPpSSS)[ ]{0,3}> ?/, { closingFlag: lineEndRegex, type: "quote" }],
  [/(PpPpSSS)\s?-\s+/, { closingFlag: lineEndRegex, type: "liUl" }],
  [/(PpPpSSS)\s?[0-9n]+\.\s+/, { closingFlag: lineEndRegex, type: "liOl" }],
  [
    /(PpPpSSS)(?!#)/,
    { closingFlag: /PpPpEEE(\s*\n*\r\s*)*/, type: "paragraph" },
  ],
  [
    /\[(?=[\w\d.*\-/\s]+\]\([\w\d.\-/:]+\))/,
    { closingFlag: ")", type: "link" },
  ],
  ["**", { closingFlag: "**", type: "bold" }],
  ["_", { closingFlag: "_", type: "italic" }],
]);
function wrapText(index, text, type) {
  const newKey = "x" + index;
  const typeHandler = {
    link: <Link key={"l" + newKey} content={text} />,
    quote: <BlockQuote key={"qb" + newKey} content={text} />,
    bold: <Bold key={"bo" + newKey} content={text} />,
    italic: <Italic key={"it" + newKey} content={text} />,
    h1: <H1 key={"h1" + newKey} content={text} />,
    h2: <H2 key={"h2" + newKey} content={text} />,
    h3: <H3 key={"h3" + newKey} content={text} />,
    h4: <H4 key={"h4" + newKey} content={text} />,
    h5: <H5 key={"h5" + newKey} content={text} />,
    h6: <H6 key={"h6" + newKey} content={text} />,
    liUl: <Li key={"Ul" + newKey} content={text} />,
    liOl: <Li key={"Ol" + newKey} content={text} type="number" />,
    paragraph: <P key={"pa" + newKey} content={text} />,
    code: <CodeBox key={"cb" + newKey} content={text} parse={true} />,
    table: <Table key={"table" + newKey} content={text} parse={true} />,
    hint: <Hint key={"hint" + newKey} content={text} />,
  };
  return typeHandler[type];
}
function markParagraphs(string) {
  const regex = /[\r\n]+/g;
  return "PpPpSSS" + string.replaceAll(regex, "PpPpEEE\r\nPpPpSSS") + "PpPpEEE";
}

function findStringMatch(flag, string, startAt = 0) {
  const failedReturn = { length: 0, index: -1 };
  if (string === undefined) return failedReturn;
  if (flag === undefined) return { length: 0, index: string.length };
  if (startAt === -1) startAt = 0;

  const isString = typeof flag !== "object";
  
  if (isString) {
    const index = string.indexOf(flag, startAt);
    const flagMissing = index === -1;
    if (flagMissing) return failedReturn;
    return { length: flag.length, index: index };
  }

  const matchReturnArray = string.match(flag);
  if (matchReturnArray === null) return failedReturn;
  const match = string.match(flag)[0];
  const index = string.indexOf(match, startAt - 5);
  return { length: match.length, index: index };
}

function stringHasFlag(string, flagMap) {
  const returnObject = {};
  const isEmptyString = string == null;

  if (isEmptyString) return {type: "empty"};

  const workingObject = { string: string, firstFlagIndex: string.length };

  flagMap.forEach((_, flag) => {
    const firstStringMatch = findStringMatch(flag, string);
    const firstFlagMissing = firstStringMatch.index === -1;
    if (firstFlagMissing) return;
    const secondFlagForMatch = flagMap.get(flag).closingFlag;
    const secondStringMatch = findStringMatch(
      secondFlagForMatch,
      string,
      firstStringMatch.index + firstStringMatch.length
    );
    const secondFlagFound = secondStringMatch.index > -1;
    const firstFlagIsEarliest =
      firstStringMatch.index < workingObject.firstFlagIndex;
    if (firstFlagIsEarliest && secondFlagFound) {
      workingObject.firstFlagLength = firstStringMatch.length;
      workingObject.firstFlagIndex = firstStringMatch.index;
      workingObject.secondFlagLength = secondStringMatch.length;
      workingObject.secondFlagIndex = secondStringMatch.index;
      workingObject.flagFromMap = flag;
      returnObject.type = flagMap.get(workingObject.flagFromMap).type;
      ({
        beforeFlag: returnObject["beforeFlag"],
        flaggedText: returnObject["flaggedText"],
        afterFlag: returnObject["afterFlag"],
      } = sliceFlaggedText(workingObject));
    }
  });
  return returnObject;
}

function sliceFlaggedText({
  string,
  firstFlagLength,
  firstFlagIndex,
  secondFlagLength,
  secondFlagIndex,
}) {
  const flaggedTextStart = firstFlagIndex + firstFlagLength;
  const afterFlaggedStart = secondFlagIndex + secondFlagLength;
  const beforeFlag =
    firstFlagIndex === 0 ? null : string.slice(0, firstFlagIndex);
  const flaggedText = string.slice(flaggedTextStart, secondFlagIndex);
  const afterFlag =
    string.length > afterFlaggedStart ? string.slice(afterFlaggedStart) : null;

  return { beforeFlag, flaggedText, afterFlag };
}
export function recursiveParser(text, index, flagMap) {
  const { type, beforeFlag, flaggedText, afterFlag } = stringHasFlag(
    text,
    flagMap
  );
  if (type === undefined) return text;
  const shouldParse = type !== "code" && type !== "table" && type !== "link";
  const processedflaggedText = shouldParse
    ? recursiveParser(flaggedText, index, flagMap)
    : flaggedText;
  index += 1;

  const wrappedFlaggedText = wrapText(index, processedflaggedText, type);
  const returnArray = [];
  if (beforeFlag !== null) returnArray.push(beforeFlag);
  returnArray.push(wrappedFlaggedText);
  if (afterFlag !== null) {
    const parserReturn = recursiveParser(afterFlag, index, flagMap);
    if (Array.isArray(parserReturn)) {
      returnArray.push(...parserReturn);
    } else {
      returnArray.push(parserReturn);
    }
  }
  return returnArray.length === 1 ? returnArray[0] : returnArray;
}

function findObjectType(wrappedObject) {
  const keyCharacter = wrappedObject[0]?.key[0] || wrappedObject.key[0];
  const isOrdered = keyCharacter === "O";
  const isUnordered = keyCharacter === "U";
  if (!isOrdered && !isUnordered) return "nonList";
  return keyCharacter;
}

function wrapLists(arrayOfObjects) {
  const returnArray = [];

  let listItemArray = [];
  let listType = null;
  if (Array.isArray(arrayOfObjects) === false) return arrayOfObjects;
  arrayOfObjects?.forEach((paragraph, index, arr) => {
    console.assert(
      typeof paragraph === "object",
      `Paragraph is not an object ${paragraph}`
    );
    if (typeof paragraph !== "object") return;
    const wrappedObject = paragraph;
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
  let index = 0;

  if (text === null) return null;
  const string = markParagraphs(text);

  const arrayOfObjects = recursiveParser(string, index, completeFlagMap);
  const returnArray = wrapLists(arrayOfObjects);

  return <>{returnArray}</>;
};

export default TextBox;
