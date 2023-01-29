import { recursiveParser } from '../utilities/markdownParser';

function Hint({ content, parse = true }) {
  if (parse) {
    content = recursiveParser(content);
  }
  return (
    <div className="whitespace-pre-wrap border-l-8 border-x-hintYellow bg-cornsilk p-2 text-black">
      {content}
    </div>
  );
}

export default Hint;
