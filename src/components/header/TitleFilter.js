import SearchTitle from '../../elements/SearchTitle';

function TitleFilter({ toggleExpanded, expanded }) {
  const listId = 'searchTitleList';
  const title = 'Search Title';
  return (
    <div className="grid grid-rows-2 gap-2">
      <SearchTitle listId={listId} title={title} onClick={toggleExpanded} expanded={expanded} />
    </div>
  );
}

export default TitleFilter;
