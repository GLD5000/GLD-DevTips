import CollapseSvg from "../components/icons/Collapse";
import ExpandSvg from "../components/icons/Expand";

const TipTitle = ({ title, onClick, expanded }) => {
  return (
    <button className="tip-title-btn" onClick={onClick}>
      <h2 className="tip-title-txt">{title}</h2>
      {expanded ? <CollapseSvg className="tip-title-svg" /> : <ExpandSvg className="tip-title-svg" />}
    </button>
  );
};

export default TipTitle;
