import markdownParserFull from '../utilities/markdownParser';
import { getFlagMap, wrapText } from '../utilities/ParserLookupsBasic';

const flagMap = getFlagMap();

function Hint({ content }) {
  const hintContent = markdownParserFull({ text: content, flagMap, wrapText });
  return (
    <div className="whitespace-pre-wrap border-l-8 border-x-hintYellow bg-cornsilk p-2 text-black">
      {hintContent}
    </div>
  );
}

export default Hint;
