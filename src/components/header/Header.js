import CreateButton from "./CreateButton";
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
    <section className="sticky top-0 left-0 right-0 z-[999] grid h-16 w-screen grid-cols-frAutoFr bg-neutral-800 content-center">
      <header className=" col-start-2 flex w-body min-w-body max-w-body flex-wrap justify-between items-center align-middle  ">
        <div className="flex flex-wrap gap-4 items-center py-4">
          <GldSvg />
          <h1>{title}</h1>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-center py-4 relative h-full">
          <CreateButton
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
