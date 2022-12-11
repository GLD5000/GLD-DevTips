import SvgButton from "../elements/SvgButton"

import { useState } from "react";

function removeParagraphs(string){
  const regex = /(PpPpEEE)|(PpPpSSS)/g;
  return string.replaceAll(regex, ``);
}


export default function CodeBox ({content, parse = false}) {
  // console.log(content);
  const code = parse? removeParagraphs(content): content;
  const [showTextState, setShowTextState] = useState(() => false);
  return (
    <code className="code">
      {`${code}`}
      <SvgButton
            type="duplicate"
            key={1 + "copyCode"}
            text="Copied!"
            clickFunction={()=> {navigator.clipboard.writeText(content); setShowTextState(true); setTimeout(() => setShowTextState(false), 2200)}}
            wide = {true}
            showText = {showTextState}
            borderColor = "transparent"
            reverse = {false}
            classes = "copy-btn"
            marginLeft = "0"
      />

      </code>
  )
}

