import { useEffect, useState } from 'react';
import MultiTextBoxes from './MultiTextBoxes';
import TipTitle from '../../elements/TipTitle';
import EditButton from './EditButton';
import Tags from './Tags';

export default function Tip({ tip, updated, shouldExpand }) {
  const [expanded, setExpanded] = useState(shouldExpand);
  function handleClick() {
    setExpanded(!expanded);
  }
  useEffect(() => {
    let isMounted = true;
    if (isMounted && shouldExpand) {
      setExpanded(true);
    }
    return () => {
      isMounted = false;
    };
  }, [shouldExpand]);
  const title = tip.titleSuffix === undefined ? tip.title : tip.title + tip.titleSuffix;
  return (
    <article className="flex w-body min-w-body max-w-body flex-col items-start justify-between">
      <div
        className={`sticky top-16 z-50 grid w-full ${expanded && 'border-b'} bg-bg dark:bg-bg-dk`}
      >
        <TipTitle
          id={`${tip.id}: ${title}`}
          title={title}
          onClick={handleClick}
          expanded={expanded}
        />
        <Tags tagArray={tip.tags} />
      </div>

      {expanded && (
        <>
          <EditButton key={`edit${tip.id}`} tipId={tip.id} />
          <MultiTextBoxes tip={tip} />
        </>
      )}
      {updated && <p>{updated}</p>}
    </article>
  );
}
