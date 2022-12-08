import { recursiveParser } from "../../elements/TextBox";

const flagMap = new Map([
  // [tableBlockOpen, { closingFlag: tableBlockClosed, type: "table" }],
  // [codeBlockOpen, { closingFlag: codeBlockClosed, type: "code" }],
  [/^\s?######/, { closingFlag: "", type: "h6" }],
  [/^\s?#####(?!#)/, { closingFlag: "", type: "h5" }],
  [/^\s?####(?!#)/, { closingFlag: "", type: "h4" }],
  [/^\s?###(?!#)/, { closingFlag: "", type: "h3" }],
  [/^\s?##(?!#)/, { closingFlag: "", type: "h2" }],
  [/^\s?#(?!#)/, { closingFlag: "", type: "h1" }],
  // [/(PpPpSSS)[ ]{0,3}> ?/, { closingFlag: lineEndRegex, type: "quote" }],
  // [/(PpPpSSS)\s?-\s+/, { closingFlag: lineEndRegex, type: "liUl" }],
  // [/(PpPpSSS)\s?[0-9n]+\.\s+/, { closingFlag: lineEndRegex, type: "liOl" }],
  // [
  //   /(PpPpSSS)(?!#)/,
  //   { closingFlag: /PpPpEEE(\s*\n*\r\s*)*/, type: "paragraph" },
  // ],
  [
    /\[(?=[\w\d.*\-/\s]+\]\([\w\d.\-/:]+\))/,
    { closingFlag: ")", type: "link" },
  ],
  ["**", { closingFlag: "**", type: "bold" }],
  ["_", { closingFlag: "_", type: "italic" }],
]);


let index = 0;
function parseLinks(cell) {
  index +=1;
  console.log(cell);
  console.log(index);
  console.log(flagMap);
  // const regexOpenLink = /\[(?=[\w\d.*\-/\s]+\]\([\w\d.\-/:]+\))/;
  // const regexCloseLink = ")";
  return recursiveParser(cell, index, flagMap);
}

const Td = ({ cell }) => {
  if (cell.includes("www") || cell.includes("**") || cell.includes("_")) cell = parseLinks(cell);
  return <td>{cell}</td>;
};

export default Td;
