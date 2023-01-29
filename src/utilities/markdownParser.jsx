import React from 'react';

import Ol from '../elements/Ol';
import Ul from '../elements/Ul';

function markParagraphs(string) {
  const regex = /[\r\n]+/g;
  const returnString = `PpPpSSS${string.replaceAll(regex, 'PpPpEEE\r\nPpPpSSS')}PpPpEEE`;
  return returnString;
}
export function removeParagraphs(string) {
  const regex = /(PpPpEEE)|(PpPpSSS)/g;
  return string.replaceAll(regex, ``);
}

function findStringMatch(flag, string, start = 0) {
  let startAt = start;
  const failedReturn = { length: 0, index: -1 };
  if (string === undefined) return failedReturn;
  if (flag === undefined) return { length: 0, index: string.length };
  if (startAt === -1) startAt = 0;

  const isString = typeof flag !== 'object';

  if (isString) {
    const index = string.indexOf(flag, startAt);
    const flagMissing = index === -1;
    if (flagMissing) return failedReturn;
    return { length: flag.length, index };
  }

  const matchReturnArray = string.match(flag);
  if (matchReturnArray === null) return failedReturn;
  const match = string.match(flag)[0];
  const index = string.indexOf(match, startAt);
  return { length: match.length, index };
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
  const beforeFlag = firstFlagIndex === 0 ? null : string.slice(0, firstFlagIndex);
  const flaggedText = string.slice(flaggedTextStart, secondFlagIndex);
  const afterFlag = string.length > afterFlaggedStart ? string.slice(afterFlaggedStart) : null;

  return { beforeFlag, flaggedText, afterFlag };
}

function stringHasFlag(string, flagMap) {
  const returnObject = {};
  const isEmptyString = string == null;

  if (isEmptyString) return { type: 'empty' };

  const workingObject = { string, firstFlagIndex: string.length };

  flagMap.forEach((value, key) => {
    const firstStringMatch = findStringMatch(key, string);
    const firstFlagMissing = firstStringMatch.index === -1;
    if (firstFlagMissing) return;
    const secondFlagForMatch = value.closingFlag;
    const secondStringMatch = findStringMatch(
      secondFlagForMatch,
      string,
      firstStringMatch.index + firstStringMatch.length
    );
    const secondFlagFound = secondStringMatch.index > -1;
    const firstFlagIsEarliest = firstStringMatch.index < workingObject.firstFlagIndex;
    if (firstFlagIsEarliest && secondFlagFound) {
      workingObject.firstFlagLength = firstStringMatch.length;
      workingObject.firstFlagIndex = firstStringMatch.index;
      workingObject.secondFlagLength = secondStringMatch.length;
      workingObject.secondFlagIndex = secondStringMatch.index;
      workingObject.flagFromMap = key;
      returnObject.type = value.type;
      ({
        beforeFlag: returnObject.beforeFlag,
        flaggedText: returnObject.flaggedText,
        afterFlag: returnObject.afterFlag,
      } = sliceFlaggedText(workingObject));
    }
  });
  return returnObject;
}

function findObjectType(wrappedObject) {
  const keyCharacter = wrappedObject[0]?.key[0] || wrappedObject.key[0];
  const isOrdered = keyCharacter === 'O';
  const isUnordered = keyCharacter === 'U';
  if (!isOrdered && !isUnordered) return 'nonList';
  return keyCharacter;
}

function wrapLists(arrayOfObjects) {
  const returnArray = [];

  let listItemArray = [];
  let listType = null;
  if (Array.isArray(arrayOfObjects) === false) return arrayOfObjects;
  arrayOfObjects?.forEach((paragraph, index, arr) => {
    console.assert(typeof paragraph === 'object', arrayOfObjects);
    if (typeof paragraph !== 'object') return;
    const wrappedObject = paragraph;
    const type = findObjectType(wrappedObject);
    const nonListItem = type === 'nonList';
    if (nonListItem) {
      const wasListItem = listType !== type && listType !== null;
      if (wasListItem) {
        // list type just changed
        // make ol or ul object
        const wasOrderedList = listType === 'O';
        const list = wasOrderedList ? (
          <Ol content={listItemArray} />
        ) : (
          <Ul content={listItemArray} />
        );
        returnArray.push(list);
        listType = type;
        listItemArray = [];
      }
      returnArray.push(wrappedObject);
    }
    const isOrderedListItem = type === 'O';
    if (isOrderedListItem) {
      if (listType !== type && listItemArray.length > 0) {
        const pindex = index * 1;

        returnArray.push(<Ul key={`Ol${pindex}`} content={listItemArray} />);
        listItemArray = [];
      }
      listType = type;
      listItemArray.push(wrappedObject);
    }
    const isUnorderedListItem = type === 'U';
    if (isUnorderedListItem) {
      if (listType !== type && listItemArray.length > 0) {
        const pindex = index * 1;
        returnArray.push(<Ol key={`Ol${pindex}`} content={listItemArray} />);
        listItemArray = [];
      }

      listType = type;
      listItemArray.push(wrappedObject);
    }
    const isLastListItem = index === arr.length - 1;
    const listItemArrayHasItems = listItemArray.length > 0;
    if (isLastListItem && listItemArrayHasItems) {
      const list =
        listType === 'O' ? (
          <Ol key="Ol" content={listItemArray} />
        ) : (
          <Ul key="Ul" content={listItemArray} />
        );
      returnArray.push(list);
      listItemArray = [];
    }
  });
  return returnArray;
}

export function recursiveParser({ text, indexIn, flagMap, wrapText }) {
  let index = indexIn;
  const { type, beforeFlag, flaggedText, afterFlag } = stringHasFlag(text, flagMap);
  if (type === undefined) return text;
  const shouldParse =
    type !== 'codeSpan' &&
    type !== 'code' &&
    type !== 'table' &&
    type !== 'link' &&
    type !== 'span';
  const processedflaggedText = shouldParse
    ? recursiveParser({ text: flaggedText, indexIn: index })
    : flaggedText;
  index += 1;

  const wrappedFlaggedText = wrapText({ index, text: processedflaggedText, type });
  const returnArray = [];
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

export default function markdownParserFull({ text, flagMap, wrapText }) {
  const index = 0;

  if (text === null) return null;
  const string = markParagraphs(text);

  const arrayOfObjects = recursiveParser({
    string,
    index,
    wrapText,
    flagMap,
  });
  const returnArray = wrapLists(arrayOfObjects);
  return returnArray;
}
