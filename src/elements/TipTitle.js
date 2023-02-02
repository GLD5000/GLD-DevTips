import CollapseSvg from '../components/icons/CollapseSvg';
import ExpandSvg from '../components/icons/ExpandSvg';

function TipTitle({ title, onClick, expanded, id }) {
  const conditionalClasses = expanded ? 'sticky top-16 py-4 z-50 ' : null;
  const name = expanded ? `Collapse Tip` : `Expand Tip`;
  return (
    <button
      id={id}
      type="button"
      aria-label={name}
      className={`${conditionalClasses} grid w-full grid-cols-frAutoFr justify-items-end rounded-none rounded-t-lg border-b border-b-neutral-600 bg-inherit hover:bg-slate-800 active:bg-slate-600`}
      onClick={onClick}
    >
      <h2 className="col-start-2">{title}</h2>
      {expanded ? (
        <CollapseSvg className="tip-title-svg" />
      ) : (
        <ExpandSvg className="tip-title-svg" />
      )}
    </button>
  );
}

export default TipTitle;
