import CollapseSvg from "../components/icons/Collapse";
import ExpandSvg from "../components/icons/Expand";

const TipTitle = ({ title, onClick, expanded }) => {
  return (
    <button className="tip-title" onClick={onClick}>
      <h2>{title}</h2>
      {expanded ? <CollapseSvg /> : <ExpandSvg />}
    </button>
  );
};

export default TipTitle;
