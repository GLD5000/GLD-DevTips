import CollapseSvg from "../components/icons/CollapseSvg";
import ExpandSvg from "../components/icons/ExpandSvg";
import InputText from "../elements/InputText";

export default function SearchTitle({
  title,
  onClick,
  expanded,
  setSearchQuery,
  searchQuery,
  listId,
}) {
  return (
    <>
      <button className="tip-title-btn" onClick={onClick}>
        <h2 className="tip-title-txt">{title}</h2>
        {expanded ? (
          <CollapseSvg className="tip-title-svg" />
        ) : (
          <ExpandSvg className="tip-title-svg" />
        )}
      </button>
      <InputText
        placeholder=" Type or select a title..."
        onInput={setSearchQuery}
        type="search"
        value={searchQuery}
        listId={listId}
      />
    </>
  );
}
