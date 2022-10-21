import PropTypes from "prop-types";
import Button from "../../elements/Button";
import TitleFilter from "./TitleFilter";
import setSearchQuery from "../../App";
import TagSet from "./TagSet";

function onClickAdd(e) {
  console.log("Add Clicked " + e.target.innerHTML);
}
function onClickSearch(e) {
  console.log("Search Added: " + e.target.value);
}

const Header = ({
  title,
  searchQuery,
  setSearchQuery,
  tagSet,
  setTagState,
  tagState,
  titleSet,
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
      <Button
        color="black"
        backgroundColor="white"
        text="Add A New Tip To The Collection!"
        clickFunction={onClickAdd}
      />
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
