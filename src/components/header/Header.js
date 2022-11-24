
import GldSvg from "../icons/Gld";
import PropTypes from "prop-types";
import AuthButton from "./AuthButton";

const Header = ({
  title,
  authClickHandler,
  signedIn,
}) => {
  return (
    <section className="header-container">

    <header className="header">
        <GldSvg />
      <h1>{title}</h1>
      <AuthButton authClickHandler={authClickHandler} signedIn={signedIn} />
    </header>
    </section>
  );
};
Header.defaultProps = {
  title: "Default Title",
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
