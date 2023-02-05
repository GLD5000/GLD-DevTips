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
      className={`${conditionalClasses} grid w-full grid-cols-frAutoFr justify-items-end rounded-b-none border-2 border-transparent border-b-neutral-600 bg-inherit px-2 delay-100 duration-200 ease-in-out hover:border-2 hover:border-neutral-200 active:border-neutral-200`}
      onClick={onClick}
    >
      <h2 className="col-start-2 text-3xl">{title}</h2>
      {expanded ? (
        <CollapseSvg className="tip-title-svg" />
      ) : (
        <ExpandSvg className="tip-title-svg" />
      )}
    </button>
  );
}

export default TipTitle;
