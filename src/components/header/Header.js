
import GldSvg from "../icons/Gld";
import PropTypes from "prop-types";
import AddTip from "./AddTip/AddTip";
import Filters from "./Filters";
import AuthButton from "./AuthButton";
import { useState } from "react";

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
  tagListAll,
  authClickHandler,
  signedIn,
  addTipToDb,
}) => {
  return (
    <header className="header">
        <GldSvg />
      <h1>{title}</h1>
      <AuthButton authClickHandler={authClickHandler} signedIn={signedIn} />
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
