import { default as markdownParserFull } from "../utilities/markdownParser";


const Hint = ({ content, parse = true }) => {
  if (parse) {
    content = markdownParserFull(content);
  }
  return <div className="hint">{content }</div>;
};

export default Hint;
