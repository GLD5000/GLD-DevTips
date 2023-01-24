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
  clearTags,
}) => {
  return (
    <section className="p-2 w-screen sticky top-0 left-0 right-0 grid grid-cols-frAutoFr bg-neutral-700 z-[999]">
      <header className=" col-start-2 flex w-body min-w-body max-w-body flex-wrap justify-between">
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
