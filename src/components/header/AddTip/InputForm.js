import MultiInput from "./MultiInput";
import SelectMulti from "../../../elements/SelectMulti";
import MainTitle from "./MainTitle";

import { useInputFormContext } from "../../../contexts/Providers/InputFormProvider";

export default function InputForm({
  tagListAll,
  setInputFormState,
  addFieldToInputFormState,
  addObjectToInputFormState,
  callbackMainTitle,
  currentId,
}) {
  const {
    inputForm: { data: inputFormState },
    dispatchInputForm,
  } = useInputFormContext();

  return (
    <div className="add-form">
      <div className="form-control">
        <label className="label-box">
          <h2>Add Title</h2>
          <MainTitle
            onInput={callbackMainTitle}
            name={currentId + "MainTitle"}
            id={currentId + "MainTitle"}
            defaultValue={inputFormState?.title || null}
          />
        </label>
        <SelectMulti
          tagListAll={tagListAll}
          inputFormState={inputFormState}
          addFieldToInputFormState={addFieldToInputFormState}
        />
      </div>
      <MultiInput
        inputFormState={inputFormState}
        setInputFormState={setInputFormState}
        addFieldToInputFormState={addFieldToInputFormState}
        addObjectToInputFormState={addObjectToInputFormState}
      />
    </div>
  );
}
