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

function parseLinks(cell) {
  index += 1;
  // console.group(`recursiveParser(cell, index, flagMap)`);

  // console.groupEnd();
  return recursiveParser(cell, index, flagMap);
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
