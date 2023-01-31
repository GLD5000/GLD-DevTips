import { recursiveParser } from '../../utilities/markdownParser';
import { getFlagMap, wrapText } from '../../utilities/ParserLookupsBasic';

let index = 0;
const flagMap = getFlagMap(['h6', 'h5', 'h4', 'h3', 'h2', 'h1', 'link', 'bold', 'italic']);
function parseLinks(cell) {
  index += 1;
  return recursiveParser({ text: cell, index, flagMap, wrapText });
}

function Td({ cell }) {
  let content = cell;
  if (cell.includes('www') || cell.includes('**') || cell.includes('_') || cell.includes('#'))
    content = parseLinks(cell);
  return <td className="border-collapse border-2 border-neutral-400 p-1 text-center">{content}</td>;
}

export default Td;
