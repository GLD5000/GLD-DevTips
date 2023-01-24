import SvgButton from "../../elements/SvgButton";
import { useInputFormContext } from "../../contexts/Providers/InputFormProvider"
export default function EditButton({tipId}) {
    const {dispatchInputForm} = useInputFormContext();
    function editTip(e){
        dispatchInputForm({type: "EDIT_TIP", payload: e.target.id});
    }
  return (
<SvgButton
        wide="false"
        type="write"
        key={"edit"+tipId}
        id={tipId}
        buttonClasses="text-whitesmoke bg-transparent ml-auto grid-cols-autoFr"
        text="Edit"
        clickFunction={editTip}
        svgClasses="stroke-whitesmoke stroke-1 fill-none"
      />  )
}
