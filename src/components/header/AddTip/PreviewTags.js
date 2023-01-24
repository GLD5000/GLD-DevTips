import Tag from "./Tag";
import { useTagsContext } from "../../contexts/Providers/TagsProvider";

export default function PreviewTags ({tagArray}) {
  const {  tags:{data: tags} } = useTagsContext();
  return (
    <div className=" flex w-full h-min  content-center justify-center flex-wrap gap-2">
      {tagArray.map(tag => (
        <Tag key={tag} tag={tags[tag.toLowerCase()]}  />
      ))}
    </div>
  );
};

