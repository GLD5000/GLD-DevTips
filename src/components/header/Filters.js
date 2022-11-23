import TitleFilter from "./TitleFilter";
import TagSet from "./TagSet";

export default function Filters({
  searchQuery,
  setSearchQuery,
  titleSet,
  setTagState,
  tagState,
}) {
  return (
    <section className="filter-section">
      <TitleFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        titleSet={titleSet}
      />
      <TagSet setTagState={setTagState} tagState={tagState} />
    </section>
  );
}
