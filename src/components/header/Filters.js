import TitleFilter from "./TitleFilter";
import TagSet from "./TagSet";
import { useTagsContext } from "../../contexts/Providers/TagsProvider";

export default function Filters({
  setTagState,
  tagState,
}) {
  // const { showFilter, setshowFilter, tags } = useDataContext();
  const {
    tags: {metadata: { showTags }},
    tags: { data: tags },
    dispatchTags,
  } = useTagsContext();
  function toggleExpanded() {
    dispatchTags({ type: "TOGGLE_SHOW_TAGS", payload: !showTags });
  }
  // const tagsActive = Object.values(tagState).includes("active");
  // if (tagsActive) setFilterExpanded(true);
  return (
    <section className="filter-section">
      <TitleFilter
        toggleExpanded={toggleExpanded}
        expanded={showTags}
      />
      {showTags && tags !== null && (
        <TagSet tags={tags} dispatchTags={dispatchTags} />
      )}
    </section>
  );
  function updateTagState(tag) {
    const newValue = tagState[tag] === "active" ? "visible" : "active";
    setTagState((object) => {
      return { ...object, [tag]: newValue }; // Tip return new object to trigger re-render
    });
  }
}
