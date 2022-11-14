import { useState } from "react";
import MultiInput from "./MultiInput";
import SelectMulti from "../../../elements/SelectMulti";
import MainTitle from "./MainTitle";

const InputForm = ({
  tagListAll,
  addObjectToInputFormState,
  inputFormState,
  setTagsState,
  setInputState,
  callbackMainTitle,
  onSubmit,
  onPreview,
  currentId,
  inputState,
  isOwner
}) => {
  return ( 
    <div className="add-form">
      <div className="form-control">
        <label >
          <h2>Add Title</h2>
          <MainTitle
            onInput={callbackMainTitle}
            name={currentId + "MainTitle"}
            id={currentId + "MainTitle"}
            defaultValue={inputFormState?.title || ""}
            />
        </label>
        <SelectMulti tagListAll={tagListAll} setTagsState={setTagsState}  inputFormState={inputFormState} />
      </div>
      <MultiInput
        inputState={inputState}
        setInputState={setInputState}
        onSubmit={onSubmit}
        addObjectToInputFormState={addObjectToInputFormState}
        inputFormState={inputFormState}
        onPreview={onPreview}
        isOwner={isOwner}
      />
    </div>
  );



};
export default InputForm;
