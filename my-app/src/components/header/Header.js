import PropTypes from "prop-types";
import TitleFilter from "./TitleFilter";
import TagSet from "./TagSet";
import { useState } from "react";
import AddTip from "./AddTip";


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
  return (
    <header className="header">
      <h1>{title}</h1>
      <TitleFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        titleSet={titleSet}
      />
      <TagSet tagSet={tagSet} setTagState={setTagState} tagState={tagState} />
      <AddTip setTip={setTip} />
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
