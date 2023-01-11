import TitleFilter from "./TitleFilter";
import TagSet from "./TagSet";
import { useDataContext } from "../../DataProvider";

export default function Filters({
  searchQuery,
  setSearchQuery,
  titleSet,
  setTagState,
  tagState,
  filterExpanded,
  setFilterExpanded,
}) {
  const { showFilter, setshowFilter, tags } = useDataContext();
  // console.log(showFilter);
  // console.log(tagState);
  function toggleExpanded() {
    setshowFilter(!showFilter);
  }
  // const tagsActive = Object.values(tagState).includes("active");
  // if (tagsActive) setFilterExpanded(true);
  return (
    <section className="filter-section">
      <TitleFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        titleSet={titleSet}
        toggleExpanded={toggleExpanded}
        expanded={filterExpanded}
      />
      {showFilter && tags !== null && (
        <TagSet
          setTagState={setTagState}
          tagState={tagState}
          updateTagState={updateTagState}
        />
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
