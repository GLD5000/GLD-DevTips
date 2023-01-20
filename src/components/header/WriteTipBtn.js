import SvgButton from "../../elements/SvgButton";
import { useInputFormContext } from "../../contexts/Providers/InputFormProvider";
const writeClasses =
  " focus:bg-aquamarine focus:text-black hover:bg-aquamarine hover:text-black text-aquamarine bg-transparent";
const cancelClasses =
  "bg-transparent text-pink-300 focus:bg-pink-300 focus:text-black hover:bg-pink-300 hover:text-black";

export default function WriteTipBtn() {

  const {dispatchInputForm, inputForm:{metadata: {editing}}} = useInputFormContext();
  function onCreate() {
    if (editing === true) {
      onClose();
      return;
    }
    dispatchInputForm({type: "NEW_TIP"});
  }
  function onClose() {
    dispatchInputForm({type: "CANCEL_EDIT"});
  }
  const AddTipText = editing ? "Cancel" : "Create";
  const type = editing ? "cancelWrite" : "add";
  return (
    <div className="h-full width-fit col-start-4">
      <SvgButton
        wide="false"
        type={type}
        text={AddTipText}
        clickFunction={onCreate}
        reverse={true}
        buttonClasses={editing ? cancelClasses : writeClasses}
        activeClasses="active:bg-slate-400"
      />
    </div>
  );
}
