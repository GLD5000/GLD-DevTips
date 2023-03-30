import TitleFilter from './TitleFilter';
import TagSet from './TagSet';
import { useTagsContext } from '../../contexts/Providers/TagsProvider';

export default function Filters() {
  const {
    tags: {
      metadata: { showTags, activeTags },
    },
    tags: { data: tags },
    dispatchTags,
  } = useTagsContext();
  function toggleExpanded() {
    dispatchTags({ type: 'TOGGLE_SHOW_TAGS', payload: !showTags });
  }

  if (!tags) return null;
  return (
    <section className="grid w-full grid-rows-2 gap-2">
      <TitleFilter toggleExpanded={toggleExpanded} expanded={showTags} />
      {showTags && <TagSet tags={tags} dispatchTags={dispatchTags} activeTags={activeTags} />}
    </section>
  );
}
