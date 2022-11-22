import TagFilter from "./TagFilter";

const TagSet = ({ tagSet, setTagState, tagState }) => {
  const buttonArray = [];

  function makeButtonArray() {
      tagSet.forEach((tag, key) =>
        buttonArray.push(
          <TagFilter
            key={tag}
            tag={tag}
            setTagState={setTagState}
            tagState={tagState}
          />
        )
      );
  }
  makeButtonArray();
  return (
    <label>
      <h2>Filter Tags</h2>
      <section className="filter-container">{buttonArray}</section>
    </label>
  );
};

export default TagSet;
