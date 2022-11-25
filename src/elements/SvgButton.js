import UpSvg from "../components/icons/Up";
import DownSvg from "../components/icons/Down";
import AddSvg from "../components/icons/Add";
import DeleteSvg from "../components/icons/Delete";
import DuplicateSvg from "../components/icons/Duplicate";
import PreviewSvg from "../components/icons/Preview"
import PencilSvg from "../components/icons/Pencil"
//import CollapseSvg from "../components/icons/Collapse"
//import ExpandSvg from "../components/icons/Expand"
let showText = true;
function defaultOnClick(e) {
  console.log(e.target);
}
const SvgButton = ({
  borderRadius = "4px",
  color = "white",
  backgroundColor = "black",
  text = "Add",
  clickFunction = defaultOnClick,
  id = null,
  name = null,
  type = "up",
}) => {
  function getSvg(type) {
    const svgLookup = {
      up: <UpSvg stroke={color}/>,
      down: <DownSvg stroke={color}/>,
      add: <AddSvg stroke={color}/>,
      delete: <DeleteSvg stroke={color}/>,
      duplicate: <DuplicateSvg stroke={color} fill={backgroundColor} />,
      preview: <PreviewSvg stroke={color} fill={backgroundColor} />,
      write: <PencilSvg stroke={color} fill={backgroundColor} />,
    };
    return svgLookup[type];
  }
  const svg = getSvg(type);

  const style = {
    color: color,
    backgroundColor: backgroundColor,
    borderRadius: borderRadius,
    borderColor: color,
    borderWidth: "2px",
    borderStyle: "solid",
    display: "grid",
    gap: "6px",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",

  };

  return (
    <>
      <button
        id={id}
        name={name}
        onClick={clickFunction}
        className="svg-btn"
        style={style}
      >
        {svg}
        {showText && text}
      </button>
    </>
  );
};

export default SvgButton;
