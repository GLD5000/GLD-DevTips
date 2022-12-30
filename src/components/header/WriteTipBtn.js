import SvgButton from "../../elements/SvgButton";
const writeClasses =
  " hover:bg-aquamarine hover:text-black text-aquamarine bg-transparent";
const cancelClasses =
  "bg-transparent text-pink-300 hover:bg-pink-300 hover:text-black";

export default function WriteTipBtn({
  showAddTipForm,
  setShowAddTipForm,
  addObjectToInputFormState,
  setSearchQuery,
  clearTags,
}) {
  function onClickAdd() {
    if (showAddTipForm === true) {
      onClose();
      return;
    }
    clearTags();
    setSearchQuery(() => "  ");
    setShowAddTipForm(true);
  }
  function onClose() {
    addObjectToInputFormState(null);
    setSearchQuery(() => "");
    setShowAddTipForm(false);
  }
  const AddTipText = showAddTipForm ? "Cancel" : "Create";
  const type = showAddTipForm ? "cancelWrite" : "add";
  return (
    <div className="h-full width-fit col-start-4">
      <SvgButton
        wide="false"
        type={type}
        // color={buttonState.colour}
        // backgroundColor={buttonState.background}
        text={AddTipText}
        clickFunction={onClickAdd}
        reverse={true}
        buttonClasses={showAddTipForm ? cancelClasses : writeClasses}
      />
    </div>
  );
}
