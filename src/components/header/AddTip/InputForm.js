import InputSections from "./InputSections";
import InputTags from "../../../elements/InputTags";
import InputTitle from "./InputTitle";

import { useInputFormContext } from "../../../contexts/Providers/InputFormProvider";

export default function InputForm() {
  const {
    inputForm: { data: inputFormState },
    dispatchInputForm,
    inputForm: {
      metadata: { currentTipId },
    },
  } = useInputFormContext();

  return (
    <div className="add-tip-container">
      <div className="add-form">
        <div className="form-control">
          <label className="label-box">
            <h2>Add Title</h2>
            <InputTitle />
          </label>
          <InputTags />
        </div>
        <InputSections />
      </div>
    </div>
  );
}
