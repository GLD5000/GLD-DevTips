import SearchTitle from '../../elements/SearchTitle';

function TitleFilter({ toggleExpanded, expanded }) {
  return <SearchTitle onClick={toggleExpanded} expanded={expanded} />;
}

export default TitleFilter;
