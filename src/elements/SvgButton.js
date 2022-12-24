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
function getSvg(type, svgClasses) {
  const svgLookup = {
    italic: <ItalicSvg classes={svgClasses} />,
    bold: <BoldSvg classes={svgClasses} />,
    up: <UpSvg classes={svgClasses} />,
    down: <DownSvg classes={svgClasses} />,
    add: <AddSvg classes={svgClasses} />,
    delete: <DeleteSvg classes={svgClasses} />,
    duplicate: <DuplicateSvg classes={svgClasses}/>,
    preview: <PreviewSvg classes={svgClasses}/>,
    write: <PencilSvg classes={svgClasses} />,
    cancelWrite: <UnPencilSvg classes={svgClasses} />,
    header: <HeaderSvg classes={svgClasses} />,
    link: <LinkSvg classes={svgClasses} />,
    code: <CodeSvg classes={svgClasses} />,
    quote: <QuoteSvg classes={svgClasses} />,
    bullet: <BulletSvg classes={svgClasses} />,
    numbered: <NumberedSvg classes={svgClasses} />,
    table: <TableSvg classes={svgClasses} />,
    hint: <HintSvg classes={svgClasses} />,
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
  hoverFunction = null,
  buttonClasses = false,
  svgClasses = "stroke-whitesmoke fill-none stroke-2",
  className = `p-2
   items-center 
   text-${color} 
   grid 
    ${backgroundColor}
     h-full 
    ${wide === true ? `grid-cols-frAutoFr w-full` : `grid-cols-autoAuto`}
     cursor-pointer rounded border-2 border-solid whitespace-pre-wrap 
    ${buttonClasses && buttonClasses}`,
}) {
  const svg = getSvg(type, svgClasses);
  const content = getContent(reverse, showText, text, svg);

  return (
    <>
      <button
        id={id}
        name={name}
        onClick={clickFunction}
        onMouseEnter={hoverFunction}
        className={className.replaceAll(/[\s]+/g, " ")}
        aria-label={name}
      >
        {content}
      </button>
    </>
  );
}
