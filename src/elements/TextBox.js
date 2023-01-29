import markdownParserFull from '../utilities/markdownParser';
import { flagMap, wrapText } from '../utilities/ParserLookups';

function TextBox({ text }) {
  const returnArray = markdownParserFull({ text, flagMap, wrapText });
  return <>{returnArray}</>;
}
export default TextBox;
