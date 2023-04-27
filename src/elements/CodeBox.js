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
    <code className="font-mono relative my-2 mx-auto block h-fit w-full overflow-x-auto whitespace-pre rounded border-solid border-neutral-500 bg-black text-vsGreen placeholder:text-vsGreen">
      <div className="p-2">
        {codeFileName && (
          <h4 className="file-name rounded-none bg-black px-1 text-right text-sm text-neutral-300">
            {codeFileName}
          </h4>
        )}
        <pre className="p-2">{`${codeBody}`}</pre>
      </div>
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
        className=" sticky left-0 bottom-0 flex w-full items-center  justify-center rounded-none border border-transparent bg-black text-neutral-200 hover:border hover:border-current hover:transition focus:transition active:bg-slate-600"
        // marginLeft='auto'
        svgClasses="stroke-1 fill-black stroke-neutral-200"
      />
    </code>
  );
}
