import TagFilter from "./TagFilter";

const TagSet = ({ tagSet }) => {

  const buttonArray = [];
  return (
    <>
      {tagSet.forEach((tag, key) =>
        buttonArray.push(<TagFilter key={key} tag={tag} />)
      )}
      ;
      {buttonArray}
    </>
  );
};

export default TagSet;
