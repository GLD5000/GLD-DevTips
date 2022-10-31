import InputText from "../../elements/InputText";
import TitleButtons from "./TitleButtons";

const TitleFilter = ({ setSearchQuery, titleSet, searchQuery }) => {
  const listId = "searchTitleList";
  return (
    <div className="titleFilter-container">
      <InputText
        placeholder="Search Topic..."
        onInput={setSearchQuery}
        type="search"
        value={searchQuery}
        listId={listId}
      />
      <TitleButtons titleSet={titleSet} listId={listId} />
    </div>
  );
};

export default TitleFilter;
