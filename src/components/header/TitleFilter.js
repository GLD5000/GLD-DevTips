import TitleButtons from './TitleButtons';
import SearchTitle from '../../elements/SearchTitle';

const TitleFilter = ({ toggleExpanded, expanded }) => {
  const listId = 'searchTitleList';
  const title = 'Search Title';
  return (
    <div className="grid grid-rows-2 gap-2">
      <SearchTitle listId={listId} title={title} onClick={toggleExpanded} expanded={expanded} />
      <TitleButtons listId={listId} />
    </div>
  );
};

export default TitleFilter;
