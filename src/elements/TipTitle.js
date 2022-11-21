import ExpandSvg from "../components/icons/Expand";
import CollapseSvg from "../components/icons/Collapse";
import DownSvg from "../components/icons/Down";
const TipTitle = ({ title, onClick, expanded }) => {
  return (
    <button className="tip-title" onClick={onClick}>
      <h2>{title}</h2>
      {expanded ? (
        <CollapseSvg />
      ) : (
        <DownSvg />
      )}
    </button>
  );
};

export default TipTitle;
