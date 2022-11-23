import TickSvg from "../components/icons/Tick"
import UnTickSvg from "../components/icons/UnTick";
import { useState } from "react";


let showText = true;
function defaultOnClick(e) {
  console.log(e.target);
}
export default function ToggleButton ({
  borderRadius = "4px",
  color = "white",
  backgroundColor = "black",
  text = "Add",
  clickFunction = defaultOnClick,
  id=null,
  name=null,
  type="tick",
  className="btn",
  toggle
}) {
  
  function getSvg(type){
    const svgLookup = {
      tick: {true: <TickSvg/>, false: <UnTickSvg/>},
    }
    return svgLookup[type];
  }
  const svg = getSvg(type)[toggle];
  
  function clickHandler(e){
    //return if wrong
    clickFunction(e);
  }



  return (<>
    <button
      id={id}
      name={name}
      onClick={clickHandler}
      className={className}
      style={{ color: color, backgroundColor: backgroundColor, borderRadius: borderRadius }}
    >
      {showText && text}
      {svg}
    </button>
  </>
  );
};