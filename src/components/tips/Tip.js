import { useState } from 'react';
import MultiTextBoxes from './MultiTextBoxes';
import TipTitle from '../../elements/TipTitle';
import EditButton from './EditButton';
import Tags from './Tags';

export default function Tip({ tip, updated }) {
  const [expanded, setExpanded] = useState(() => false);
  function toggleExpanded() {
    setExpanded(!expanded);
  }
  const title = tip.titleSuffix === undefined ? tip.title : tip.title + tip.titleSuffix;
  return (
    <div className="flex  w-body min-w-body max-w-body flex-col items-start justify-between gap-2 rounded border bg-neutral-800 p-2">
      <TipTitle title={title} onClick={toggleExpanded} expanded={expanded} />
      {expanded && (
        <>
          <EditButton key={`edit${tip.id}`} tipId={tip.id} />
          <MultiTextBoxes tip={tip} />
        </>
      )}
      <Tags tagArray={tip.tags} />
      {updated && <p>{updated}</p>}
    </div>
  );
}
