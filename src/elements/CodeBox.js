import { useState, useEffect } from 'react';
import SvgButton from './SvgButton';

function removeParagraphs(string) {
  const regex = /(PpPpEEE)|(PpPpSSS)/g;
  return string.replaceAll(regex, ``);
}

export default function CodeBox({ content, parse = false }) {
  const [copyButtonMessage, setCopyButtonMessage] = useState('Copy');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCopyButtonMessage('Copy');
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [copyButtonMessage]);

  const code = parse ? removeParagraphs(content) : content;
  const firstLineBreak = code.search(/\r?\n/);
  const isLineBreak = firstLineBreak > -1;
  const codeFileName =
    // isLineBreak && (code.search(/^[*\w.]+\.[*\w]+(?=(\r?\n))/) > -1)
    isLineBreak &&
    (code.search(/^[*\w.]+\.[*\w.:]+(?=(\r?\n))/) > -1 || code.search(/^.+:(?=(\r?\n))/) > -1)
      ? code.slice(0, firstLineBreak).replace(':', '')
      : null;
  const codeBody = codeFileName ? code.slice(firstLineBreak + 1) : code;
  return (
    <code className="block h-fit max-w-full overflow-x-auto whitespace-pre rounded border border-solid border-neutral-500 bg-black p-2 font-mono text-vsGreen placeholder:text-vsGreen">
      {`${codeBody}`}
      {codeFileName && (
        <h3 className="file-name p-3 text-right text-neutral-300">{codeFileName}</h3>
      )}
      <SvgButton
        type="duplicate"
        key={`${1}copyCode`}
        text={copyButtonMessage}
        clickFunction={() => {
          navigator.clipboard.writeText(codeBody);
          setCopyButtonMessage('Copied!');
        }}
        wide
        showText
        reverse={false}
        buttonClasses="border-transparent sticky left-0"
        className=" sticky left-0 bottom-0 flex w-full  items-center justify-center border-2 border-transparent bg-slate-900 transition delay-100 duration-200 ease-in-out hover:border-2 hover:border-current active:bg-slate-600"
        // marginLeft='auto'
        svgClasses="stroke-1 fill-black stroke-whitesmoke"
      />
    </code>
  );
}
