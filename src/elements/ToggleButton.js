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
  //if (name === "Github")console.log(`toggle ${toggle}`);
  
  function getSvg(type){
    const svgLookup = {
      tick: {true: <TickSvg/>, false: <UnTickSvg/>},
    }
    return svgLookup[type];
  }
  const svg = getSvg(type)[toggle];
  
  let pointerTarget;
  function pointerHandler(e){
    pointerTarget = e.target.id;
  }
  function clickHandler(e){
    //console.log(e.target);
   // if (pointerTarget !== e.target.id) return;
    clickFunction(e);
  }



  return (<>
    <button
      id={id}
      name={name}
      onClick={clickHandler}
      onPointerOver={pointerHandler}
      className={className}
      style={{ color: color, backgroundColor: backgroundColor, borderRadius: borderRadius }}
    >
      {showText && text}
      {svg}
    </button>
  </>
  );
};