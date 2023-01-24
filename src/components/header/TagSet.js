import TagFilter from "./TagFilter";
import Button from "../../elements/Button";

export default function TagSet({
  title = "Filter Tags",
tags, dispatchTags, activeTags}) {
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
        activeTags={activeTags}
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
      <section className="w-full flex flex-wrap justify-center items-center gap-2 p-2">
        <>{buttonArray}</>
      </section>
    </>
  );
}
