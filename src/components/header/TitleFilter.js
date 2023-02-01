import SearchTitle from '../../elements/SearchTitle';

function TitleFilter({ toggleExpanded, expanded }) {
  const listId = 'searchTitleList';
  const title = 'Search Title';
  return <SearchTitle listId={listId} title={title} onClick={toggleExpanded} expanded={expanded} />;
}

export default TitleFilter;
