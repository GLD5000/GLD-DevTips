import UpSvg from "../components/icons/UpSvg";
import DownSvg from "../components/icons/DownSvg";
import AddSvg from "../components/icons/AddSvg";
import DeleteSvg from "../components/icons/DeleteSvg";
import DuplicateSvg from "../components/icons/DuplicateSvg";
import PreviewSvg from "../components/icons/PreviewSvg"
import PencilSvg from "../components/icons/PencilSvg"
import UnPencilSvg from "../components/icons/UnPencilSvg"
import ItalicSvg from "../components/icons/ItalicSvg";
import BoldSvg from "../components/icons/BoldSvg";
//import CollapseSvg from "../components/icons/Collapse"
//import ExpandSvg from "../components/icons/Expand"
function defaultOnClick(e) {
  console.log(e.target);
}
const SvgButton = ({
  borderRadius = "4px",
  color = "whitesmoke",
  backgroundColor = "black",
  text = "Add",
  clickFunction = defaultOnClick,
  id = null,
  name = null,
  type = "up",
  wide = true,
  showText = true,
  marginLeft = null,
}) => {
  function getSvg(type) {
    const svgLookup = {
      italic: <ItalicSvg stroke={color}/>,
      bold: <BoldSvg stroke={color}/>,
      up: <UpSvg stroke={color}/>,
      down: <DownSvg stroke={color}/>,
      add: <AddSvg stroke={color}/>,
      delete: <DeleteSvg stroke={color}/>,
      duplicate: <DuplicateSvg stroke={color} fill={backgroundColor} />,
      preview: <PreviewSvg stroke={color} fill={backgroundColor} />,
      write: <PencilSvg stroke={color} fill={backgroundColor} />,
      cancelWrite: <UnPencilSvg stroke={color} fill={backgroundColor} />,
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
    width: wide === true? "100%": "fit-content",
    gridTemplateColumns: wide === true? "1fr auto 1fr": "auto auto",
    alignItems: "center",
  };
  if (wide !== true && marginLeft === null) style.marginLeft = "auto";
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
