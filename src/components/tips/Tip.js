import MultiTextBoxes from "./MultiTextBoxes";
import TipTitle from "../../elements/TipTitle";
import EditButton from "./EditButton";
import Tags from "./Tags";
import { useState } from "react";

export default function Tip({
  tip,
  setTagStateFromTip,
  editTip,
  showAddTipForm,
}) {
  const [expanded, setExpanded] = useState(() => false);
  function toggleExpanded() {
    setExpanded(!expanded);
  }
  const title =
    tip.titleSuffix === undefined ? tip.title : tip.title + tip.titleSuffix;
  return (
    <div className="tip">
      <TipTitle title={title} onClick={toggleExpanded} expanded={expanded} />
      {expanded && (
        <>
          {showAddTipForm === false && (
            <EditButton key={"edit" + tip.id} tipId={tip.id} />
          )}
          <MultiTextBoxes tip={tip} />
        </>
      )}
      <Tags tagArray={tip.tags} setTagStateFromTip={setTagStateFromTip} />
      {tip.updated && <p>{tip.updated}</p>}
    </div>
  );
}
