import markdownParserFull from '../utilities/markdownParser';
import { flagMap, wrapText } from '../utilities/ParserLookups';

function TextBox({ text }) {
  const returnArray = markdownParserFull({ text, flagMap, wrapText });
  return <div>{returnArray}</div>;
}
export default TextBox;
