import TagFilter from "./TagFilter";

const TagSet = ({ tagSet, setTagState, tagState }) => {
  const buttonArray = [];
  return (
      <label>
        <h2>Filter Tags</h2>
    <section className="filter-container">
        
        {tagSet.forEach((tag, key) =>
          buttonArray.push(
            <TagFilter
              key={key}
              tag={tag}
              setTagState={setTagState}
              tagState={tagState}
            />
          )
        )}
        {buttonArray}

    </section>
      </label>
  );
};

export default TagSet;
