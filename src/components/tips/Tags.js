import Tag from './Tag';
import { useTagsContext } from '../../contexts/Providers/TagsProvider';

export default function Tags({ tagArray }) {
  const {
    tags: { data: tags },
    dispatchTags,
    tags: {
      metadata: { activeTags },
    },
  } = useTagsContext();
  function handleClickTag(payload) {
    dispatchTags({ type: 'TOGGLE_TAG', payload });
  }
  return (
    <div className=" my-2 flex h-min w-full  flex-wrap justify-end gap-2 px-2 text-xs">
      {tagArray.map((tag) => {
        const active = activeTags.has(tag);
        return (
          <Tag
            key={tag}
            tag={tags[tag.toLowerCase()]}
            handleClickTag={handleClickTag}
            active={active}
          />
        );
      })}
    </div>
  );
}
