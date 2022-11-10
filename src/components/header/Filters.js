import TitleFilter from "./TitleFilter";
import TagSet from "./TagSet";

export default function Filters({
  searchQuery,
  setSearchQuery,
  titleSet,
  tagSet,
  setTagState,
  tagState,
}) {
  return (
    <div className="filter-container">
      <TitleFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        titleSet={titleSet}
      />
      <TagSet tagSet={tagSet} setTagState={setTagState} tagState={tagState} />
    </div>
  );
}
