import MultiInput from "./MultiInput";
import SelectMulti from "../../../elements/SelectMulti";
import MainTitle from "./MainTitle";

const InputForm = ({
  tagListAll,
  inputFormState,
  addFieldToInputFormState,
  addObjectToInputFormState,
  setInputTags,
  inputTags,
  setInputState,
  callbackMainTitle,
  onSubmit,
  onPreview,
  currentId,
  inputState,
  isOwner,
}) => {
  return (
    <div className="add-form">
      <div className="form-control">
        <label>
          <h2>Add Title</h2>
          <MainTitle
            onInput={callbackMainTitle}
            name={currentId + "MainTitle"}
            id={currentId + "MainTitle"}
            defaultValue={inputFormState.title}
          />
        </label>
        <SelectMulti
          tagListAll={tagListAll}
          setInputTags={setInputTags}
          inputTags={inputTags}
          inputFormState={inputFormState}
          addFieldToInputFormState={addFieldToInputFormState}

        />
      </div>
      <MultiInput
        inputState={inputState}
        setInputState={setInputState}
        onSubmit={onSubmit}
        inputFormState={inputFormState}
        addFieldToInputFormState={addFieldToInputFormState}
        addObjectToInputFormState={addObjectToInputFormState}
        onPreview={onPreview}
        isOwner={isOwner}
      />
    </div>
  );
};
export default InputForm;
