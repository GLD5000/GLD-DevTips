import TitleFilter from "./TitleFilter";
import TagSet from "./TagSet";

export default function Filters({
  searchQuery,
  setSearchQuery,
  titleSet,
  setTagState,
  tagState,
  filterExpanded,
  setFilterExpanded
}) {
  function toggleExpanded(){
    setFilterExpanded(!filterExpanded);
  }

  return (
    <section className="filter-section">
      <TitleFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        titleSet={titleSet}
        toggleExpanded={toggleExpanded}
        expanded={filterExpanded}
      />
     {filterExpanded && <TagSet setTagState={setTagState} tagState={tagState} updateTagState={updateTagState}/>}
    </section>
  );
  function updateTagState(tag) {
    const newValue = tagState[tag] === "active"? "visible": "active";
    setTagState((object) => {
      return { ...object, [tag]: newValue }; // Tip return new object to trigger re-render
    });
  }

}
