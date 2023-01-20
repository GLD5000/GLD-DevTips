import MultiInput from "./MultiInput";
import SelectMulti from "../../../elements/SelectMulti";
import MainTitle from "./MainTitle";

import { useInputFormContext } from "../../../contexts/Providers/InputFormProvider";

export default function InputForm() {
  const {
    inputForm: { data: inputFormState },
    dispatchInputForm,
    inputForm: {metadata: {currentTipId}}
  } = useInputFormContext();

  return (
    <div className="add-tip-container">
    <div className="add-form">
      <div className="form-control">
        <label className="label-box">
          <h2>Add Title</h2>
          <MainTitle
          />
        </label>
        <SelectMulti
        />
      </div>
      <MultiInput
      />
    </div>
    </div>
  );
}
