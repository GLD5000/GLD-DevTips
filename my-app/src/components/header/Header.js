import PropTypes from "prop-types";
import Button from "../../elements/Button";
import TitleFilter from "./TitleFilter";
import TagSet from "./TagSet";
import { useState } from "react";


const Header = ({
  title,
  searchQuery,
  setSearchQuery,
  tagSet,
  setTagState,
  tagState,
  titleSet,
  setTip
}) => {
  const [showNewTip, setShowNewTip] = useState(() => false);
  function onClickAdd(e) {
    setShowNewTip(state => !state);
  }
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
