import TagFilter from "./TagFilter";

const TagSet = ({ tagSet }) => {

  const buttonArray = [];
  return (
    <section className="filter-container">
      {tagSet.forEach((tag, key) =>
        buttonArray.push(<TagFilter key={key} tag={tag} />)
      )}
      ;
      {buttonArray}
    </section>
  );
};

export default TagSet;
