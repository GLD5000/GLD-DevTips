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

const lineEndRegex = /(PpPpEEE)[\r\n]*\s*/;

const blockFlagStart = "PpPpSSS[ ]{0,3}";
const blockFlagEndOptional = "(PpPpEEE)?";
const blockFlagEnd = "PpPpEEE\r\n";

const codeFlag = "[`~]{3,}";
const codeBlockOpen = new RegExp(
  blockFlagStart + codeFlag + blockFlagEndOptional
);
const codeBlockClosed = new RegExp(codeFlag + blockFlagEnd);
// console.log(`A ${codeFlagA}`);
// console.log(`B ${codeBlockOpen}`);
// console.assert(codeFlagA.length === codeBlockOpen.length);
// console.log(`codeBlockClosed ${codeBlockClosed}`);
const flagMap = new Map([
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
  // ["{link}", "link"],
]);
function wrapText(index, text, type) {
  const newKey = "x" + index;
  const typeHandler = {
    link: (
      <Link
        key={"l" + newKey}
        content={text}
        recursiveParser={recursiveParser}
      />
    ),
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
    table: <Table key={"table" + newKey} content={text} />,
    hint: <Hint key={"hint" + newKey} content={text} />,
  };
  return typeHandler[type];
}
function markParagraphs(string) {
  const regex = /[\r\n]+/g;
  return "PpPpSSS" + string.replaceAll(regex, "PpPpEEE\r\nPpPpSSS") + "PpPpEEE";
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
  const index = string.indexOf(match, startAt - 5);
  // if (startAt !== 0 && match.includes("```")) {
  //   console.log(`startAt ${startAt}`);
  //   console.log(`match ${match}`);
  //   console.log(`match.length ${match.length}`);
  //   console.log(`index ${index}`);
  // }
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
    if (firstStringMatch[0] == null || firstStringMatch[1] === -1) return;
    const secondFlagForMatch = flagMap.get(flag).closingFlag;
    const secondStringMatch = findStringMatch(
      secondFlagForMatch,
      string,
      firstStringMatch[1] + firstStringMatch[0].length
    );
    // firstStringMatch[0] && console.log(firstStringMatch[0]);
    // secondStringMatch[0] && console.log(secondStringMatch[0]);
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
  const flaggedTextStart = firstFlagIndex + firstFlag.length;
  // if (secondFlag.includes("```")) {
  //   console.log(`secondFlag ${secondFlag}`);
  //   console.log(`secondFlag.length ${secondFlag.length}`);
  //   console.log(`secondFlagIndex ${secondFlagIndex}`);
  // }
  const afterFlaggedStart = secondFlagIndex + secondFlag.length;
  const beforeFlag =
    firstFlagIndex === 0 ? null : text.slice(0, firstFlagIndex);
  const flaggedText = text.slice(flaggedTextStart, secondFlagIndex);
  const afterFlag =
    text.length > afterFlaggedStart ? text.slice(afterFlaggedStart) : null;
  // console.log(`afterFlag ${afterFlag}`);

  return { beforeFlag, flaggedText, afterFlag };
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
  if (firstFlagIndex === -1 || firstFlag === undefined) return text;
  //const secondFlag = flagMap.get(flagFromMap).closingFlag || undefined;
  if (secondFlagIndex === -1 || secondFlag === undefined) return text;

  const { beforeFlag, flaggedText, afterFlag } = sliceFlaggedText(
    text,
    firstFlag,
    firstFlagIndex,
    secondFlag,
    secondFlagIndex
  );
  //pre-process flagged text
  const type = flagMap.get(flagFromMap).type;
  const shouldParse = type !== "code";
  const processedflaggedText = shouldParse
    ? recursiveParser(flaggedText, index)
    : flaggedText;
  // wrap flagged text
  index += 1;
  // console.log(index);

  const wrappedFlaggedText = wrapText(index, processedflaggedText, type);
  //pre-process remaining text
  const returnArray = [];
  // returnArray.push() = [beforeFlag, wrappedFlaggedText, recursiveParser(afterFlag) ]
  if (beforeFlag !== null) returnArray.push(beforeFlag);
  returnArray.push(wrappedFlaggedText);
  if (afterFlag !== null) {
    const parserReturn = recursiveParser(afterFlag, index);
    if (Array.isArray(parserReturn)) {
      returnArray.push(...parserReturn);
    } else {
      returnArray.push(parserReturn);
    }
  }
  return returnArray.length === 1 ? returnArray[0] : returnArray;
}

function findObjectType(wrappedObject) {
  // console.log(wrappedObject);

  const keyCharacter = wrappedObject[0]?.key[0] || wrappedObject.key[0];
  // console.log(keyCharacter);
  const isOrdered = keyCharacter === "O";
  const isUnordered = keyCharacter === "U";
  if (!isOrdered && !isUnordered) return "nonList";
  return keyCharacter;
}

function wrapLists(arrayOfObjects) {
  const returnArray = [];

  let listItemArray = [];
  let listType = null;
  // console.log(arrayOfObjects);
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

  //split into paragraphs
  //const paragraphs = text?.split(/\r?\n\s*/);
  //const returnArray = parseParagraphs(paragraphs);
  // Find out if the return includes a header
  // console.log(text);
  if (text === null) return null;
  const string = markParagraphs(text);

  const arrayOfObjects = recursiveParser(string, index); // !!!!!!!
  const returnArray = wrapLists(arrayOfObjects);

  // const returnArray = recursiveParser(string, index);
  // console.group(`returnArray`);
  // console.log(returnArray);
  // console.groupEnd();

  return <>{returnArray}</>;
};

export default TextBox;
