import SvgButton from "../elements/SvgButton";

import { useState } from "react";

function removeParagraphs(string) {
  const regex = /(PpPpEEE)|(PpPpSSS)/g;
  return string.replaceAll(regex, ``);
}

export default function CodeBox({ content, parse = false }) {
  // console.log(content);
  const code = parse ? removeParagraphs(content) : content;
  const [showTextState, setShowTextState] = useState(() => false);
  const firstLineBreak = code.search(/\r?\n/);
  const isLineBreak = firstLineBreak > -1;
  const codeFileName =
    isLineBreak && code.search(/^[*\w]+\.[*\w]+(?=(\r?\n))/) > -1
      ? code.slice(0, firstLineBreak)
      : null;
  const codeBody = codeFileName ? code.slice(firstLineBreak + 1) : code;
  return (
    <code className="block bg-black border-neutral-500 text-vsGreen rounded border-solid border font-mono whitespace-pre overflow-x-auto">
      <div className="grid grid-cols-3 justify-items-end">
        <h3 className="file-name p-3 col-start-2">{codeFileName}</h3>
          <SvgButton
            type="duplicate"
            key={1 + "copyCode"}
            text="Copied!"
            clickFunction={() => {
              if (codeBody.includes("Pp")) alert(codeBody);
              navigator.clipboard.writeText(codeBody);
              setShowTextState(true);
              setTimeout(() => setShowTextState(false), 2200);
            }}
            wide={true}
            showText={showTextState}
            reverse={true}
            buttonClasses="border-transparent sticky left-0 col-start-3"
            // marginLeft="auto"
            svgClasses="stroke-1 fill-black stroke-whitesmoke"
          />
      </div>
      {`${codeBody}`}
    </code>
  );
}
