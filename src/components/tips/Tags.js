import Tag from "./Tag";

const Tags = ({ tagArray, setTagStateFromTip}) => {
  return (
    <div className="tagsList">
      {tagArray.map((tag, index) => (
        <Tag key={index} tag={tag} setTagStateFromTip={setTagStateFromTip} />
      ))}
    </div>
  );
};

export default Tags;
