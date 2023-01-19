import SvgButton from "../../elements/SvgButton";
import { useInputFormContext } from "../../contexts/Providers/InputFormProvider";
const writeClasses =
  " focus:bg-aquamarine focus:text-black hover:bg-aquamarine hover:text-black text-aquamarine bg-transparent";
const cancelClasses =
  "bg-transparent text-pink-300 focus:bg-pink-300 focus:text-black hover:bg-pink-300 hover:text-black";

export default function WriteTipBtn({
  showAddTipForm,
  setShowAddTipForm,
  addObjectToInputFormState,
}) {
  function onClickAdd() {
    if (showAddTipForm === true) {
      onClose();
      return;
    }
    setShowAddTipForm(true);
  }
  function onClose() {
    addObjectToInputFormState(null);
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
        activeClasses="active:bg-slate-400"
      />
    </div>
  );
}
