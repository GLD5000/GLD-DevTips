import PropTypes from "prop-types";
import TitleFilter from "./TitleFilter";
import TagSet from "./TagSet";
import AddTip from "./AddTip";


const Header = ({
  title,
  searchQuery,
  setSearchQuery,
  tagSet,
  setTagState,
  tagState,
  titleSet,
  setTip,
  newTipId,
  tagListAll
}) => {
  
  return (
    <header className="header">
      <h1>{title}</h1>
      <TitleFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        titleSet={titleSet}
      />
      <TagSet tagSet={tagSet} setTagState={setTagState} tagState={tagState} />
      <AddTip setTip={setTip} newTipId={newTipId} tagListAll={tagListAll} />
    </header>
  );
};
Header.defaultProps = {
  title: "Default Title",
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
