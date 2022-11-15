import MultiInput from "./MultiInput";
import SelectMulti from "../../../elements/SelectMulti";
import MainTitle from "./MainTitle";

const InputForm = ({
  tagListAll,
  inputFormState,
  setInputFormState,
  addFieldToInputFormState,
  addObjectToInputFormState,
  setInputTags,
  inputTags,
  callbackMainTitle,
  onSubmit,
  onPreview,
  currentId,
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
            defaultValue={inputFormState?.title || null}
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
        onSubmit={onSubmit}
        inputFormState={inputFormState}
        setInputFormState={setInputFormState}
        addFieldToInputFormState={addFieldToInputFormState}
        addObjectToInputFormState={addObjectToInputFormState}
        onPreview={onPreview}
        isOwner={isOwner}
      />
    </div>
  );
};
export default InputForm;
