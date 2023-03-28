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
      className={`${conditionalClasses} grid w-full grid-cols-frAutoFr justify-items-end rounded-b-none border border-transparent border-b-border bg-bg px-2  hover:border hover:border-neutral-200 hover:transition focus:transition active:border-neutral-200 dark:border-b-border-dk dark:bg-bg-dk`}
      onClick={onClick}
    >
      <h2 className="col-start-2 my-2 text-2xl">{title}</h2>
      {expanded ? <CollapseSvg /> : <ExpandSvg />}
    </button>
  );
}

export default TipTitle;
