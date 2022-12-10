import markdownParserFull from "../utilities/markdownParser";

const TextBox = ({ text }) => {

  const returnArray = markdownParserFull(text);
  return <>{returnArray}</>;
};

export default TextBox;
