import InputText from "../../elements/InputText";
import TitleButtons from "./TitleButtons";

const TitleFilter = ({ setSearchQuery, titleSet, searchQuery }) => {
  const listId = "searchTitleList";
  return (
    <label>
        <h2>Search Titles</h2>
        <div className="titleFilter-container">
        <InputText
          placeholder="Type or select a title..."
          onInput={setSearchQuery}
          type="search"
          value={searchQuery}
          listId={listId}
        />
        <TitleButtons titleSet={titleSet} listId={listId} />
      </div>

      </label>
  );
};

export default TitleFilter;
