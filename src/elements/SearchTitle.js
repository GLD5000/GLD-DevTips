import CollapseSvg from '../components/icons/CollapseSvg';
import ExpandSvg from '../components/icons/ExpandSvg';
import InputText from './InputText';
import { useSearchStringContext } from '../contexts/Providers/SearchStringProvider';

export default function SearchTitle({ title, onClick, expanded, listId }) {
  const { searchString, setSearchString } = useSearchStringContext();
  const placeholder = ' Type or select a title...';
  return (
    <>
      <button
        className="grid w-full grid-cols-frAutoFr justify-items-end rounded-none rounded-t-lg border-b border-b-neutral-600 hover:bg-slate-800 active:bg-slate-600"
        onClick={onClick}
      >
        <h2 className="col-start-2">{title}</h2>
        {expanded ? (
          <CollapseSvg className="tip-title-svg" />
        ) : (
          <ExpandSvg className="tip-title-svg" />
        )}
      </button>
      <InputText
        placeholder={placeholder}
        onInput={setSearchString}
        type="search"
        value={searchString}
        listId={listId}
        controlled
      />
    </>
  );
}
