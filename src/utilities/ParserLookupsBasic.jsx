import Link from '../elements/Link';
import Bold from '../elements/Bold';
import Italic from '../elements/Italic';
import H1 from '../elements/H1';
import H2 from '../elements/H2';
import H3 from '../elements/H3';
import H4 from '../elements/H4';
import H5 from '../elements/H5';
import H6 from '../elements/H6';
import Li from '../elements/Li';
import Span from '../elements/Span';
import CodeSpan from '../elements/CodeSpan';

const lineEndRegex = /PpPpEEE(\r\n)?/;

export const flagMap = new Map([
  [/(PpPpSSS)\s?######/, { closingFlag: lineEndRegex, type: 'h6' }],
  [/(PpPpSSS)\s?#####(?!#)/, { closingFlag: lineEndRegex, type: 'h5' }],
  [/(PpPpSSS)\s?####(?!#)/, { closingFlag: lineEndRegex, type: 'h4' }],
  [/(PpPpSSS)\s?###(?!#)/, { closingFlag: lineEndRegex, type: 'h3' }],
  [/(PpPpSSS)\s?##(?!#)/, { closingFlag: lineEndRegex, type: 'h2' }],
  [/(PpPpSSS)\s?#(?!#)/, { closingFlag: lineEndRegex, type: 'h1' }],
  [/(PpPpSSS)\s?-\s+/, { closingFlag: lineEndRegex, type: 'liUl' }],
  [/(PpPpSSS)\s?[0-9n]+\.\s+/, { closingFlag: lineEndRegex, type: 'liOl' }],
  [/\[(?=[^\]]+\]\([^)]+\))/, { closingFlag: ')', type: 'link' }],
  [/`/, { closingFlag: /`/, type: 'codeSpan' }],
  [/'(?=.+')/, { closingFlag: /'/, type: 'singleQuote' }],
  [/"(?=.+")/, { closingFlag: /"/, type: 'doubleQuote' }],
  ['**', { closingFlag: '**', type: 'bold' }],
  ['_', { closingFlag: '_', type: 'italic' }],
]);

export function getFlagMap(include) {
  if (include === undefined || include?.length === 0) return flagMap;
  const returnMap = new Map();
  flagMap.forEach((value, key) => {
    if (include.includes(value.type)) returnMap.set(key, value);
  });
  return returnMap;
}

export function wrapText({ index, text, type }) {
  const newKey = `x${index}`;
  const typeHandler = {
    link: <Link key={`l${newKey}`} content={text} href="www.google.co.uk" />,
    singleQuote: <Span key={`span${newKey}`} content={text} type="single" />,
    doubleQuote: <Span key={`span${newKey}`} content={text} type="double" />,
    codeSpan: <CodeSpan key={`codeSpan${newKey}`} content={text} />,
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
  };

  return typeHandler[type];
}
