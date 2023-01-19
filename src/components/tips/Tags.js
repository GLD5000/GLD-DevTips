import Tag from "./Tag";
import { useTagsContext } from "../../contexts/Providers/TagsProvider";

export default function Tags ({tagArray}) {
  const {  tags:{data: tags} , dispatchTags } = useTagsContext();
  function handleClickTag(payload) {
    dispatchTags({ type: "TOGGLE_TAG", payload: payload });
  }
  return (
    <div className="tagsList">
      {tagArray.map(tag => (
        <Tag key={tag} tag={tags[tag.toLowerCase()]} handleClickTag={handleClickTag} />
      ))}
    </div>
  );
};

