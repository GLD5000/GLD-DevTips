import MultiInput from "./MultiInput";
import SelectMulti from "../../../elements/SelectMulti";
import MainTitle from "./MainTitle";

const InputForm = ({
  authClickHandler,
  tagListAll,
  inputFormState,
  setInputFormState,
  addFieldToInputFormState,
  addObjectToInputFormState,
  callbackMainTitle,
  onSubmit,
  onPreview,
  currentId,
  signedIn,
  isOwner,
}) => {



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
        signedIn={signedIn}
        authClickHandler={authClickHandler}
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
