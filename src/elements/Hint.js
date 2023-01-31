import { recursiveParser } from '../utilities/markdownParser';
import { getFlagMap, wrapText } from '../utilities/ParserLookupsBasic';

const flagMap = getFlagMap();

function Hint({ content, parse = true }) {
  let hintContent = content;
  if (parse) {
    hintContent = recursiveParser({ text: hintContent, flagMap, wrapText });
  }
  return (
    <div className="whitespace-pre-wrap border-l-8 border-x-hintYellow bg-cornsilk p-2 text-black">
      {hintContent}
    </div>
  );
}

export default Hint;
