import WriteTipBtn from "./WriteTipBtn";
import GldSvg from "../icons/GldSvg";
import PropTypes from "prop-types";
import AuthButton from "./AuthButton";

const Header = ({
  title,
  showAddTipForm,
  setShowAddTipForm,
  addObjectToInputFormState,
  setSearchQuery,
  clearTags
}) => {
  return (
    <section className="header-container z-[999]">
      <header className=" justify-between col-start-2 flex flex-wrap max-w-[800px] min-w-[240px] w-[calc(100vw-1.25rem)]">
        <div className="flex flex-wrap gap-1">

        <GldSvg />
        <h1>{title}</h1>
        </div>
        <div className="flex flex-wrap gap-1">
        <WriteTipBtn
          showAddTipForm={showAddTipForm}
          setShowAddTipForm={setShowAddTipForm}
          addObjectToInputFormState={addObjectToInputFormState}
          setSearchQuery={setSearchQuery}
          clearTags={clearTags}
        />
        <AuthButton />

        </div>
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
