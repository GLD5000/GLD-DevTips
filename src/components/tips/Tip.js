import MultiTextBoxes from "./MultiTextBoxes";
import TipTitle from "../../elements/TipTitle";
import EditButton from "./EditButton";
import Tags from "./Tags";
import { useState } from "react";
export default function Tip({
  tip, updated
}) {
  const [expanded, setExpanded] = useState(() => false);
  function toggleExpanded() {
    setExpanded(!expanded);
  }
  const title =
    tip.titleSuffix === undefined ? tip.title : tip.title + tip.titleSuffix;
  return (
    <div className="p-2  flex-col gap-2 flex items-start justify-between rounded border w-body min-w-body max-w-body bg-neutral-900">
      <TipTitle title={title} onClick={toggleExpanded} expanded={expanded} />
      {expanded && (
        <>
          <EditButton key={"edit" + tip.id} tipId={tip.id} />
          <MultiTextBoxes tip={tip} />
        </>
      )}
      <Tags tagArray={tip.tags} />
      {updated && <p>{updated}</p>}
    </div>
  );
}
