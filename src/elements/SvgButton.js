import UpSvg from "../components/icons/UpSvg";
import DownSvg from "../components/icons/DownSvg";
import AddSvg from "../components/icons/AddSvg";
import DeleteSvg from "../components/icons/DeleteSvg";
import DuplicateSvg from "../components/icons/DuplicateSvg";
import PreviewSvg from "../components/icons/PreviewSvg";
import PencilSvg from "../components/icons/PencilSvg";
import UnPencilSvg from "../components/icons/UnPencilSvg";
import ItalicSvg from "../components/icons/ItalicSvg";
import BoldSvg from "../components/icons/BoldSvg";
import HeaderSvg from "../components/icons/HeaderSvg";
import CodeSvg from "../components/icons/CodeSvg";
import LinkSvg from "../components/icons/LinkSvg";
import QuoteSvg from "../components/icons/QuoteSvg";
import BulletSvg from "../components/icons/BulletSvg";
import NumberedSvg from "../components/icons/NumberedSvg";
import TableSvg from "../components/icons/TableSvg";
import HintSvg from "../components/icons/HintSvg";
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
  reverse = false,
  borderColor = "var(--border-grey)",
}) => {
  function getSvg(type) {
    const svgLookup = {
      italic: <ItalicSvg stroke={color} />,
      bold: <BoldSvg stroke={color} />,
      up: <UpSvg stroke={color} />,
      down: <DownSvg stroke={color} />,
      add: <AddSvg stroke={color} />,
      delete: <DeleteSvg stroke={color} />,
      duplicate: <DuplicateSvg stroke={color} fill={backgroundColor} />,
      preview: <PreviewSvg stroke={color} fill={backgroundColor} />,
      write: <PencilSvg stroke={color} fill={backgroundColor} />,
      cancelWrite: <UnPencilSvg stroke={color} fill={backgroundColor} />,
      header: <HeaderSvg stroke={color} />,
      link: <LinkSvg stroke={color} />,
      code: <CodeSvg stroke={color} />,
      quote: <QuoteSvg stroke={color} />,
      bullet: <BulletSvg stroke={color} />,
      numbered: <NumberedSvg stroke={color} />,
      table: <TableSvg stroke={color} />,
      hint: <HintSvg stroke={color} />,
    };
    return svgLookup[type];
  }
  const svg = getSvg(type);

  function getContent(reverse) {
    return reverse ? (
      <>
        {showText && text}
        {svg}
      </>
    ) : (
      <>
        {svg}
        {showText && text}
      </>
    );
  }

  const content = getContent(reverse);

  const style = {
    color: color,
    backgroundColor: backgroundColor,
    borderRadius: borderRadius,
    borderColor: borderColor,
    borderWidth: "2px",
    borderStyle: "solid",
    display: "grid",
    width: wide === true ? "100%" : "fit-content",
    gridTemplateColumns: wide === true ? "1fr auto 1fr" : "auto auto",
    alignItems: "center",
  };
  if (showText) style.gap = "8px";
  if (wide !== true && marginLeft === null) style.marginLeft = "auto";
  return (
    <>
      <button
        id={id}
        name={name}
        onClick={clickFunction}
        className="svg-btn"
        style={style}
        aria-label={name}
      >
        {content}
      </button>
    </>
  );
};

export default SvgButton;
