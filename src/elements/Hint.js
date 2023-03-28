import markdownParserFull from '../utilities/markdownParser';
import { getFlagMap, wrapText } from '../utilities/ParserLookupsBasic';

const flagMap = getFlagMap();

function Hint({ content }) {
  let hintContent = markdownParserFull({ text: content, flagMap, wrapText });
  if (typeof hintContent === 'string') {
    console.log(hintContent);
    hintContent = hintContent.replaceAll(/(PpPpSSS)|(PpPpEEE)/g, '');
  }
  return (
    <div className="mx-4 my-2 w-fit whitespace-pre-wrap rounded border-l-8 border-x-hintYellow bg-cornsilk p-2 text-black">
      {hintContent}
    </div>
  );
}

export default Hint;
