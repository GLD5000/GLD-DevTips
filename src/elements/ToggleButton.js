import UpSvg from "../components/icons/Up"
import DownSvg from "../components/icons/Down"
import AddSvg from "../components/icons/Add"
//import CollapseSvg from "../components/icons/Collapse"
//import ExpandSvg from "../components/icons/Expand"
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
  type="up"
}) {

  function getSvg(type){
    const svgLookup = {
      up: <UpSvg/>,
      down: <DownSvg/>,
      add: <AddSvg/>,
      delete: <AddSvg/>,
      duplicate: <AddSvg/>,
    }
    return svgLookup[type];
  }
  const svg = getSvg(type);
  



  return (<>
    <button
      id={id}
      name={name}
      onClick={clickFunction}
      className="svg-btn"
      style={{ color: color, backgroundColor: backgroundColor, borderRadius: borderRadius }}
    >
      {svg}
      {showText && text}
    </button>
  </>
  );
};