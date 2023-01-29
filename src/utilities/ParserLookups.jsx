import React from 'react';
import Link from '../elements/Link';
import Bold from '../elements/Bold';
import Italic from '../elements/Italic';
import BlockQuote from '../elements/BlockQuote';
import H1 from '../elements/H1';
import H2 from '../elements/H2';
import H3 from '../elements/H3';
import H4 from '../elements/H4';
import H5 from '../elements/H5';
import H6 from '../elements/H6';
import Li from '../elements/Li';
import P from '../elements/P';
import CodeBox from '../elements/CodeBox';
import Table from '../components/tips/Table';
import Hint from '../elements/Hint';
import Span from '../elements/Span';
import CodeSpan from '../elements/CodeSpan';

const lineEndRegex = /PpPpEEE(\r\n)?/;

const blockFlagStart = 'PpPpSSS[ ]{0,3}';
const blockFlagEndOptional = '(PpPpEEE)?[\r\n]*';
const blockFlagEnd = 'PpPpEEE\r\n';

const codeFlag = '[`~]{3,}';
const codeBlockOpen = new RegExp(blockFlagStart + codeFlag);
const codeBlockClosed = new RegExp(blockFlagEnd + blockFlagStart + codeFlag + blockFlagEndOptional);
const tableFlag = '[\\|]{3,}';
const tableBlockOpen = new RegExp(blockFlagStart + tableFlag + blockFlagEnd);
const tableBlockClosed = new RegExp(
  blockFlagEnd + blockFlagStart + tableFlag + blockFlagEndOptional
);

const hintFlag = '\\?{3,}';
const hintBlockOpen = new RegExp(blockFlagStart + hintFlag + blockFlagEnd);
const hintBlockClosed = new RegExp(blockFlagStart + hintFlag + blockFlagEndOptional);

export const flagMap = new Map([
  [hintBlockOpen, { closingFlag: hintBlockClosed, type: 'hint' }],
  [tableBlockOpen, { closingFlag: tableBlockClosed, type: 'table' }],
  [codeBlockOpen, { closingFlag: codeBlockClosed, type: 'code' }],
  [/(PpPpSSS)\s?######/, { closingFlag: lineEndRegex, type: 'h6' }],
  [/(PpPpSSS)\s?#####(?!#)/, { closingFlag: lineEndRegex, type: 'h5' }],
  [/(PpPpSSS)\s?####(?!#)/, { closingFlag: lineEndRegex, type: 'h4' }],
  [/(PpPpSSS)\s?###(?!#)/, { closingFlag: lineEndRegex, type: 'h3' }],
  [/(PpPpSSS)\s?##(?!#)/, { closingFlag: lineEndRegex, type: 'h2' }],
  [/(PpPpSSS)\s?#(?!#)/, { closingFlag: lineEndRegex, type: 'h1' }],
  [/(PpPpSSS)[ ]{0,3}> ?/, { closingFlag: lineEndRegex, type: 'quote' }],
  [/(PpPpSSS)\s?-\s+/, { closingFlag: lineEndRegex, type: 'liUl' }],
  [/(PpPpSSS)\s?[0-9n]+\.\s+/, { closingFlag: lineEndRegex, type: 'liOl' }],
  [/(PpPpSSS)(?!#)/, { closingFlag: /PpPpEEE(\s*\n*\r\s*)*/, type: 'paragraph' }],
  [/\[(?=[^\]]+\]\([\w\d.\-/:?&=,]+\))/, { closingFlag: ')', type: 'link' }],
  [/`/, { closingFlag: /`/, type: 'codeSpan' }],
  [/'(?=.+')/, { closingFlag: /'/, type: 'span' }],
  ['**', { closingFlag: '**', type: 'bold' }],
  ['_', { closingFlag: '_', type: 'italic' }],
]);

export function wrapText({ index, text, type }) {
  const newKey = `x${index}`;
  const typeHandler = {
    link: <Link key={`l${newKey}`} content={text} href="www.google.co.uk" />,
    quote: <BlockQuote key={`qb${newKey}`} content={text} />,
    bold: <Bold key={`bo${newKey}`} content={text} />,
    italic: <Italic key={`it${newKey}`} content={text} />,
    h1: <H1 key={`h1${newKey}`} content={text} />,
    h2: <H2 key={`h2${newKey}`} content={text} />,
    h3: <H3 key={`h3${newKey}`} content={text} />,
    h4: <H4 key={`h4${newKey}`} content={text} />,
    h5: <H5 key={`h5${newKey}`} content={text} />,
    h6: <H6 key={`h6${newKey}`} content={text} />,
    liUl: <Li key={`Ul${newKey}`} content={text} />,
    liOl: <Li key={`Ol${newKey}`} content={text} type="number" />,
    paragraph: <P key={`pa${newKey}`} content={text} />,
    code: <CodeBox key={`cb${newKey}`} content={text} parse />,
    table: <Table key={`table${newKey}`} content={text} parse />,
    hint: <Hint key={`hint${newKey}`} content={text} />,
    span: <Span key={`span${newKey}`} content={text} />,
    codeSpan: <CodeSpan key={`codeSpan${newKey}`} content={text} />,
  };

  return typeHandler[type];
}
