import PropTypes from "prop-types";
import Button from "../../elements/Button";
import InputText from "../../elements/InputText";
import setSearchQuery from "../../App"

function onClickAdd(e) {
  console.log("Add Clicked " + e.target.innerHTML);
}
function onClickSearch(e) {
  console.log("Search Added: " + e.target.value);
}

const Header = ({ title, setSearchQuery }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <InputText placeholder="Search Topic..." onInput={setSearchQuery} />
      <Button
        color="black"
        backgroundColor="white"
        text="add"
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
