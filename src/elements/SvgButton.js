import UpSvg from '../components/icons/UpSvg';
import DownSvg from '../components/icons/DownSvg';
import AddSvg from '../components/icons/AddSvg';
import DeleteSvg from '../components/icons/DeleteSvg';
import DuplicateSvg from '../components/icons/DuplicateSvg';
import PreviewSvg from '../components/icons/PreviewSvg';
import PencilSvg from '../components/icons/PencilSvg';
import UnPencilSvg from '../components/icons/UnPencilSvg';
import ItalicSvg from '../components/icons/ItalicSvg';
import BoldSvg from '../components/icons/BoldSvg';
import HeaderSvg from '../components/icons/HeaderSvg';
import CodeSvg from '../components/icons/CodeSvg';
import LinkSvg from '../components/icons/LinkSvg';
import QuoteSvg from '../components/icons/QuoteSvg';
import BulletSvg from '../components/icons/BulletSvg';
import NumberedSvg from '../components/icons/NumberedSvg';
import TableSvg from '../components/icons/TableSvg';
import HintSvg from '../components/icons/HintSvg';
// import CollapseSvg from '../components/icons/Collapse'
// import ExpandSvg from '../components/icons/Expand'
function getSvg(type, svgClasses) {
  const svgLookup = {
    italic: <ItalicSvg classes={svgClasses} />,
    bold: <BoldSvg classes={svgClasses} />,
    up: <UpSvg classes={svgClasses} />,
    down: <DownSvg classes={svgClasses} />,
    add: <AddSvg classes={svgClasses} />,
    delete: <DeleteSvg classes={svgClasses} />,
    duplicate: <DuplicateSvg classes={svgClasses} />,
    preview: <PreviewSvg classes={svgClasses} />,
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
  color = 'current',
  backgroundColor = 'transparent',
  text = 'Add',
  clickFunction,
  id = null,
  name = null,
  type = 'up',
  showText = true,
  reverse = false,
  hoverFunction = null,
  activeClasses = `active:bg-slate-600 `,
  buttonClasses = `grid-cols-frAutoFr w-full h-full 
  `,
  svgClasses = 'stroke-current fill-none stroke-1',
  className = `px-2 py-1
   items-center 
   hover:border-current
   grid     
     cursor-pointer rounded border-2 border-solid whitespace-pre-wrap hover:transition focus:transition
    ${color && color} ${backgroundColor && backgroundColor} ${buttonClasses} ${activeClasses}`,
}) {
  const svg = getSvg(type, svgClasses);
  const content = getContent(reverse, showText, text, svg);
  return (
    <button
      type="button"
      id={id}
      name={name}
      onClick={clickFunction}
      onMouseEnter={hoverFunction}
      className={className.replaceAll(/[\s]+/g, ' ')}
      aria-label={name}
    >
      {content}
    </button>
  );
}
