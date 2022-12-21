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
function getSvg(type, color, backgroundColor, svgClasses) {
  const svgLookup = {
    italic: <ItalicSvg stroke={color} />,
    bold: <BoldSvg stroke={color} />,
    up: <UpSvg stroke={color} />,
    down: <DownSvg stroke={color} />,
    add: <AddSvg stroke={color} />,
    delete: <DeleteSvg stroke={color} />,
    duplicate: <DuplicateSvg stroke={color} fill="black" />,
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
function getContent(reverse, showText, text, svg) {
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

export default function SvgButton({
  borderRadius = "4px",
  color = "whitesmoke",
  backgroundColor = "transparent",
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
  hoverFunction = null,
  buttonClasses = "",
  svgClasses = "",
  className = "items-center text-" +
    color +
    " grid " +
    backgroundColor +
    " h-fit " +
    (wide === true ? "grid-cols-frAutoFr w-full" : "grid-cols-autoAuto w-fit") +
    " cursor-pointer overflow-hidden whitespace-pre-wrap rounded border-2 border-solid border-[" +
    borderColor +
    "] " +
    (buttonClasses && buttonClasses),
}) {
  const svg = getSvg(type, color, backgroundColor, svgClasses);
  const content = getContent(reverse, showText, text, svg);

  const style = {
    width: wide === true ? "100%" : "fit-content",
    gridTemplateColumns: wide === true ? "1fr auto 1fr" : "auto auto",
  };
  if (showText) style.gap = "8px";
  if (wide !== true && marginLeft === null) style.marginLeft = "auto";
  return (
    <>
      <button
        id={id}
        name={name}
        onClick={clickFunction}
        onMouseEnter={hoverFunction}
        className={className}
        // style={style}
        aria-label={name}
      >
        {content}
      </button>
    </>
  );
}
