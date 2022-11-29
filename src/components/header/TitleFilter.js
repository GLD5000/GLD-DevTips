import InputText from "../../elements/InputText";
import TitleButtons from "./TitleButtons";
import SearchTitle from "../../elements/SearchTitle";

const TitleFilter = ({ setSearchQuery, titleSet, searchQuery, toggleExpanded, expanded }) => {
  const listId = "searchTitleList";
  const title = "Search Title";
  return (
    <div className="titleFilter-container">
          <SearchTitle listId={listId} title={title} onClick={toggleExpanded} expanded={expanded} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        <TitleButtons titleSet={titleSet} listId={listId} />
      </div>

  );
};

export default TitleFilter;
