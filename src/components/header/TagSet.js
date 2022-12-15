import TagFilter from "./TagFilter";
import Button from "../../elements/Button";

const TagSet = ({ setTagState, tagState, title = "Filter Tags", keyMod=0, updateTagState }) => {


  function clearTags() {
    setTagState((old) => {
      const newObject = { ...old };
      Object.keys(newObject).forEach((key) => {
        newObject[key] = "visible";
      });
      return newObject;
    });
  }
  function tagStateReducer(acc, entry, key) {
    // make first button a clear all
    const tag = entry[0];
    acc.push(
      <TagFilter
        key={tag + "A" + key + 1 + "B" + keyMod}
        tag={tag}
        updateTagState={updateTagState}
        tagState={tagState}
      />
    );
    return acc;
  }
  function makeButtonArray() {
    return Object.entries(tagState).reduce(tagStateReducer, [
      <Button
        name="Clear Tags"
        id="clear-tags"
        key={"clearA0"}
        color={"black"}
        backgroundColor={"IndianRed"}
        text={"Clear Tags"}
        clickFunction={clearTags}
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



};

export default TagSet;
