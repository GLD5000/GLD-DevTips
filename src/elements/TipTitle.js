import CollapseSvg from "../components/icons/CollapseSvg";
import ExpandSvg from "../components/icons/ExpandSvg";

const TipTitle = ({ title, onClick, expanded }) => {
  const conditionalClasses = expanded? "sticky top-16 py-4 z-50 ": null;
  return (
    <button 
    className={`${conditionalClasses} grid w-full grid-cols-frAutoFr justify-items-end rounded-none rounded-t-lg border-b border-b-borderGrey hover:bg-slate-800 active:bg-slate-600 bg-inherit`}
    onClick={onClick}
    >
      <h2 className="col-start-2">{title}</h2>
      {expanded ? <CollapseSvg className="tip-title-svg" /> : <ExpandSvg className="tip-title-svg" />}
    </button>
  );
};

export default TipTitle;
