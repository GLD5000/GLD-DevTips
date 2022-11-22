import TickSvg from "../components/icons/Tick"
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
  className="btn"
}) {

  function getSvg(type){
    const svgLookup = {
      tick: {true: <TickSvg/>, false: <TickSvg/>},
    }
    return svgLookup[type];
  }
  const [toggle, setToggle] = useState(() => false);
  const svg = getSvg(type)[toggle];
  
  const filterDim = "brightness(90%)"
  const filterBright = "brightness(100%)"
  const [filter, setFilter] = useState(() => filterDim);
  function brightenFilter(){
    setFilter(() => filterBright)
  }
  function dimFilter(){
    setFilter(filterDim);
  }
  function clickHandler(e){
    if (filter === filterDim) return;
    setToggle(!toggle);
    clickFunction(e);
  }



  return (<>
    <button
      id={id}
      name={name}
      onClick={clickHandler}
      className={className}
      style={{ filter: filter, color: color, backgroundColor: backgroundColor, borderRadius: borderRadius }}
      onPointerOver={brightenFilter}
      onPointerLeave={dimFilter}
    >
      {showText && text}
      {svg}
    </button>
  </>
  );
};