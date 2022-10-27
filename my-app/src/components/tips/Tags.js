import Tag from "./Tag";

const Tags = ({ tagArray, setTagState}) => {
  return (
    <div className="tagsList">
      {tagArray.map((tag, index) => (
        <Tag key={index} tag={tag} setTagState={setTagState} />
      ))}
    </div>
  );
};

export default Tags;
