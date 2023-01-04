import SvgButton from "../elements/SvgButton";

import { useState, useEffect } from "react";
function removeParagraphs(string) {
  const regex = /(PpPpEEE)|(PpPpSSS)/g;
  return string.replaceAll(regex, ``);
}

export default function CodeBox({ content, parse = false }) {
  const [copyButtonMessage, setCopyButtonMessage] = useState("Copy Code");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCopyButtonMessage("Copy Code");
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [copyButtonMessage]);

  // console.log(content);
  const code = parse ? removeParagraphs(content) : content;
  const firstLineBreak = code.search(/\r?\n/);
  const isLineBreak = firstLineBreak > -1;
  const codeFileName =
    isLineBreak && code.search(/^[*\w]+\.[*\w]+(?=(\r?\n))/) > -1
      ? code.slice(0, firstLineBreak)
      : null;
  const codeBody = codeFileName ? code.slice(firstLineBreak + 1) : code;
  return (
    <code className="block overflow-x-auto h-fit whitespace-pre rounded border border-solid border-neutral-500 bg-black font-mono text-vsGreen">
      {codeFileName && <h3 className="file-name p-3">{codeFileName}</h3>}
      {`${codeBody}`}
        <SvgButton
          type="duplicate"
          key={1 + "copyCode"}
          text={copyButtonMessage}
          clickFunction={() => {
            if (codeBody.includes("Pp")) alert(codeBody);
            navigator.clipboard.writeText(codeBody);
            setCopyButtonMessage("Copied!");
          }}
          wide={true}
          showText={true}
          reverse={false}
          buttonClasses="border-transparent sticky left-0"
          className=" w-full sticky left-0 bottom-0 flex items-center justify-center active:bg-slate-600 border-2 border-transparent hover:border-current hover:border-2"
          // marginLeft="auto"
          svgClasses="stroke-1 fill-black stroke-whitesmoke"
        />
    </code>
  );
}
