import Tag from "./Tag";

const Tags = ({ tagArray }) => {
  return (
    <ul className="tagsList">
      {tagArray.map((tag, index) => (
        <Tag key={index} tag={tag} />
      ))}
    </ul>
  );
};

export default Tags;
