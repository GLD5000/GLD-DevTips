import InputText from "../../elements/InputText";
import TitleButtons from "./TitleButtons";

const TitleFilter = ({ setSearchQuery, titleSet, searchQuery }) => {
  return (
    <div className="titleFilter-container">
      <InputText
        placeholder="Search Topic..."
        onInput={setSearchQuery}
        type="search"
        value={searchQuery}
      />
      <TitleButtons onClick={setSearchQuery} titleSet={titleSet} />
    </div>
  );
};

export default TitleFilter;
