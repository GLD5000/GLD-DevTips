import { recursiveParser } from "../../utilities/markdownParser";
let index = 0;
const flagMap = new Map([
  [/^\s?######/, { type: "h6" }],
  [/^\s?#####(?!#)/, { type: "h5" }],
  [/^\s?####(?!#)/, { type: "h4" }],
  [/^\s?###(?!#)/, { type: "h3" }],
  [/^\s?##(?!#)/, { type: "h2" }],
  [/^\s?#(?!#)/, { type: "h1" }],
  [
    /\[(?=[\w\d.*\-/\s]+\]\([\w\d.\-/:]+\))/,
    { closingFlag: ")", type: "link" },
  ],
  ["**", { closingFlag: "**", type: "bold" }],
  ["_", { closingFlag: "_", type: "italic" }],
]);

function wrapText({ index, text, type }) {
  const newKey = `x${index}`;
  const typeHandler = {
    link: <Link key={`l${newKey}`} content={text} href="www.google.co.uk" />,
    bold: <Bold key={`bo${newKey}`} content={text} />,
    italic: <Italic key={`it${newKey}`} content={text} />,
    h1: <H1 key={`h1${newKey}`} content={text} />,
    h2: <H2 key={`h2${newKey}`} content={text} />,
    h3: <H3 key={`h3${newKey}`} content={text} />,
    h4: <H4 key={`h4${newKey}`} content={text} />,
    h5: <H5 key={`h5${newKey}`} content={text} />,
    h6: <H6 key={`h6${newKey}`} content={text} />,
    span: <Span key={`span${newKey}`} content={text} />,
    codeSpan: <CodeSpan key={`codeSpan${newKey}`} content={text} />,
  };

  return typeHandler[type];
}


function parseLinks(cell) {
  index += 1;
  // console.group(`recursiveParser(cell, index, flagMap)`);

  // console.groupEnd();
  return recursiveParser({cell, index, flagMap, wrapText});
}

const Td = ({ cell }) => {
  if (
    cell.includes("www") ||
    cell.includes("**") ||
    cell.includes("_") ||
    cell.includes("#")
  )
    cell = parseLinks(cell);
  return <td className="p-1 text-center border-2 border-collapse border-neutral-400">{cell}</td>;
};

export default Td;
