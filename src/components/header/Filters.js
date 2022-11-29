import TitleFilter from "./TitleFilter";
import TagSet from "./TagSet";
import { useState } from "react";

export default function Filters({
  searchQuery,
  setSearchQuery,
  titleSet,
  setTagState,
  tagState,
}) {
  const [expanded, setExpanded] = useState(() => false);
  function toggleExpanded(){
    setExpanded(!expanded);
  }

  return (
    <section className="filter-section">
      <TitleFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        titleSet={titleSet}
        toggleExpanded={toggleExpanded}
        expanded={expanded}
      />
     {expanded && <TagSet setTagState={setTagState} tagState={tagState} />}
    </section>
  );
}
