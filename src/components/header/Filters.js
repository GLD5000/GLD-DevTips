import TitleFilter from "./TitleFilter";
import TagSet from "./TagSet";
import { useTagsContext } from "../../contexts/Providers/TagsProvider";

export default function Filters({
  setTagState,
  tagState,
}) {
  // const { showFilter, setshowFilter, tags } = useDataContext();
  const {
    tags: {metadata: { showTags, activeTags }},
    tags: { data: tags },
    dispatchTags,
  } = useTagsContext();
  function toggleExpanded() {
    dispatchTags({ type: "TOGGLE_SHOW_TAGS", payload: !showTags });
  }
  return (
    <section className="grid grid-rows-2 gap-2 w-full">
      <TitleFilter
        toggleExpanded={toggleExpanded}
        expanded={showTags}
      />
      {showTags && tags !== null && (
        <TagSet tags={tags} dispatchTags={dispatchTags} activeTags={activeTags}/>
      )}
    </section>
  );
}
