import TagFilter from "./TagFilter";
import Button from "../../elements/Button";
import { useTagsContext } from "../../contexts/Providers/TagsProvider";

export default function TagSet({
  setTagState,
  tagState,
  title = "Filter Tags",
  keyMod = 0,
  updateTagState,
}) {
  const { tags, dispatchTags } = useTagsContext();
  function handleClickTag(payload) {
    dispatchTags({ type: "TOGGLE_TAG", payload: payload });
  }
  function handleClickClear() {
    dispatchTags({ type: "CLEAR_TAGS" });
  }
  function tagStateReducer(acc, tag) {
    // make first button a clear all
    acc.push(
      <TagFilter
        key={tag.name}
        tag={tag}
        handleClickTag={handleClickTag}
        tagState={tagState}
      />
    );
    return acc;
  }
  function makeButtonArray() {
    return Object.values(tags).reduce(tagStateReducer, [
      <Button
        name="Clear Tags"
        id="clear-tags"
        key={"clearA0"}
        color={"black"}
        backgroundColor={"IndianRed"}
        text={"Clear Tags"}
        clickFunction={handleClickClear}
        className="bg-red-400 text-black hover:border-white"
      />,
    ]);
  }
  const buttonArray = makeButtonArray();

  return (
    <>
      <h2>{title}</h2>
      <section className="filter-container">
        <>{buttonArray}</>
      </section>
    </>
  );
}
