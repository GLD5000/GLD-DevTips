import SvgButton from "../../../elements/SvgButton";
import Button from "../../../elements/Button";
import { useAuth } from "../../../auth";
import { useInputFormContext } from "../../../contexts/Providers/InputFormProvider";

export default function SaveButtons() {
  const { dispatchInputForm } = useInputFormContext();

  const appAuth = useAuth();
  const signedIn = appAuth.authUser !== null;
  const isOwner = signedIn === true && appAuth.authUser?.isOwner === true;
  const authClickHandler = appAuth.clickHandler;
  const submitText = isOwner
    ? "Save"
    : signedIn
    ? "Save (Wrong User)"
    : "Sign in to Save";
  const submitBackColour = isOwner ? "green" : "silver";
  const submitTextColour = isOwner ? "white" : "black";
  const submitFunction = isOwner
    ? onSubmit
    : signedIn
    ? signedInNonOwner
    : authClickHandler;

  return (
    <>
      <SvgButton
        type="preview"
        key="preview"
        color="text-black"
        backgroundColor="bg-mediumPurple"
        text="Preview"
        clickFunction={onPreview}
        svgClasses="stroke-1 stroke-current"
        activeClasses="active:bg-slate-400"
      />
      <Button
        key="saveTip"
        color={submitTextColour}
        backgroundColor={submitBackColour}
        text={submitText}
        clickFunction={submitFunction}
      />
    </>
  );

  function onSubmit() {
    dispatchInputForm({type: "SAVE_TIP"});
  }
  function onPreview() {
    dispatchInputForm({type: "PREVIEW_TIP"});
  }
  function signedInNonOwner() {
    alert("You are not allowed to submit to the database- sorry!");
  }
}
