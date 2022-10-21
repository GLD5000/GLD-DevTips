import Tag from "./Tag";

const Tags = ({ tagArray, setTagState}) => {
  return (
    <ul className="tagsList">
      {tagArray.map((tag, index) => (
        <Tag key={index} tag={tag} setTagState={setTagState} />
      ))}
    </ul>
  );
};

export default Tags;
