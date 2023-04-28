import CollapseSvg from '../components/icons/CollapseSvg';
import ExpandSvg from '../components/icons/ExpandSvg';

function TipTitle({ title, onClick, expanded, id }) {
  const conditionalClasses = expanded ? 'sticky top-16 z-50 ' : null;
  const name = expanded ? `Collapse Tip` : `Expand Tip`;
  return (
    <button
      id={id}
      type="button"
      aria-label={name}
      className={`${conditionalClasses} grid w-full grid-cols-autoFr justify-items-end rounded-b-none border-2 border-transparent bg-bg px-2  hover:border-2 hover:border-neutral-200 hover:transition focus:transition active:border-neutral-200 dark:bg-bg-dk`}
      onClick={onClick}
    >
      <h2 className="my-2 text-2xl">{title}</h2>
      {expanded ? <CollapseSvg /> : <ExpandSvg />}
    </button>
  );
}

export default TipTitle;
