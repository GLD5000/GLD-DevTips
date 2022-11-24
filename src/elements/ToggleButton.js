import TickSvg from "../components/icons/Tick";
import UnTickSvg from "../components/icons/UnTick";

let showText = true;
function defaultOnClick(e) {
  console.log(e.target);
}
export default function ToggleButton({
  borderRadius = "4px",
  color = "white",
  backgroundColor = "black",
  text = "Add",
  clickFunction = defaultOnClick,
  id = null,
  name = null,
  type = "tick",
  className = "btn",
  toggle,
}) {
  function getSvg(type) {
    const svgLookup = {
      tick: { true: <TickSvg />, false: <UnTickSvg fill={backgroundColor}/> },
    };
    return svgLookup[type];
  }
  const svg = getSvg(type)[toggle];
  
  function clickHandler(e) {
    //return if wrong
    clickFunction(e);
  }
  if (toggle === false) backgroundColor = "#b0b0b0";
  const styles = {
    color: color,
    backgroundColor: backgroundColor,
    borderRadius: borderRadius,
    borderColor: color,
    borderWidth: "2px",
    borderStyle: "solid",
    display: "grid",
    gap: "6px",
    gridTemplateColumns: "auto auto",
    alignItems: "center",
  };

  return (
    <>
      <button
        id={id}
        name={name}
        onClick={clickHandler}
        className={className}
        style={styles}
      >
        {showText && text}
        {svg}
      </button>
    </>
  );
}
