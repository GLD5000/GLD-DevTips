import ExpandSvg from "../components/icons/Expand";
import CollapseSvg from "../components/icons/Collapse";
import UpSvg from "../components/icons/Up";
const TipTitle = ({ title, onClick, expanded }) => {
  return (
    <button className="tip-title" onClick={onClick}>
      <h2>{title}</h2>
      {expanded ? (
        <CollapseSvg />
      ) : (
        <UpSvg />
      )}
    </button>
  );
};

export default TipTitle;
