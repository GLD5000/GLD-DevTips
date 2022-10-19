import TagFilter from "./TagFilter";

const TagSet = ({ tagSet , setFilterQuerySet, filterQuerySet}) => {

  const buttonArray = [];
  return (
    <section className="filter-container">
      {tagSet.forEach((tag, key) =>
        buttonArray.push(<TagFilter key={key} tag={tag} setFilterQuerySet={setFilterQuerySet} filterQuerySet={filterQuerySet} />)
      )}
      ;
      {buttonArray}
    </section>
  );
};

export default TagSet;
