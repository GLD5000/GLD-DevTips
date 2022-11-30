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
     {filterExpanded && <TagSet setTagState={setTagState} tagState={tagState} />}
    </section>
  );
}
