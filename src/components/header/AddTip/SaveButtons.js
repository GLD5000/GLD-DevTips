import SvgButton from "../../../elements/SvgButton";
import Button from "../../../elements/Button";
import { useAuth } from "../../../auth";
import { useInputFormContext } from "../../../contexts/Providers/InputFormProvider";
import { useTipsContext } from "../../../contexts/Providers/TipsProvider";
import formattedDate from "../../../utilities/formattedDate";
import { useSearchStringContext } from "../../../contexts/Providers/SearchStringProvider";

export default function SaveButtons() {
  const { dispatchInputForm, inputForm:{data} } = useInputFormContext();
  const { dispatchTips, tips } = useTipsContext();
  const {setSearchString} = useSearchStringContext();
  const appAuth = useAuth();
  const signedIn = appAuth.authUser !== null;
  const isOwner = signedIn === true && appAuth.authUser?.isOwner === true;
  const authClickHandler = appAuth.clickHandler;
  const submitText = isOwner
    ? "Save"
    : signedIn
    ? "Save (Wrong User)"
    : "Sign in to Save";
  const submitFunction = isOwner
    ? onSubmit
    : signedIn
    ? signedInNonOwner
    : authClickHandler;
  const conditionalClasses= isOwner ? "bg-aquamarine text-black hover:border-zinc-300" : "bg-transparent hover:bg-zinc-300 hover:text-black text-zinc-300";
  
  return (
    <div className="grid grid-rows-2 w-full grid-cols-1 gap-2">
      <SvgButton
        type="preview"
        key="preview"
        color="text-black"
        backgroundColor="bg-mediumPurple"
        text="Preview"
        clickFunction={onPreview}
        svgClasses="stroke-1 stroke-current"
        activeClasses="active:bg-slate-400 hover:border-zinc-300"
      />
      <Button
        key="saveTip"
        text={submitText}
        clickFunction={submitFunction}
        conditionalClasses={conditionalClasses}
      />
    </div>
  );

  function onSubmit() {
    // dispatchInputForm({type: "SAVE_TIP"});

    if (tips[data.id] !== undefined) {
      let text = `
      This will overwrite:    
      '${data.title}'
      Do you wish to continue?`;
      if (window.confirm(text) === false) {
        window.alert("You cancelled!");
        return ;
      }
  }
      // console.log(data.id, data.title, formattedDate());
    dispatchTips({type: "ADD_TIP", payload: {tip: data, date:`Saved on: ${formattedDate()}`}});
    setSearchString(data.title);
    dispatchInputForm({type:"CLOSE_FORM"});

  }
  function onPreview() {
    dispatchInputForm({type: "PREVIEW_TIP"});
  }
  function signedInNonOwner() {
    alert("You are not allowed to submit to the database- sorry!");
  }
}
