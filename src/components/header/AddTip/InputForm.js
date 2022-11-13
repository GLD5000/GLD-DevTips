import { useState } from "react";
import MultiInput from "./MultiInput";
import SelectMulti from "../../../elements/SelectMulti";
import MainTitle from "./MainTitle";

const InputForm = ({
  setShowAddTipForm,
  setTip,
  newTipId,
  tagListAll,
  addTipToDb,
  signedIn,
  addObjectToInputFormState,
  inputFormState
}) => {
  const [inputState, setInputState] = useState(() => {
    return { 0: { type: "text", content: null } };
  });
  const [tagsState, setTagsState] = useState(() => []);
  const [mainTitle, setMainTitle] = useState(() => "No Title Yet");

  function callbackMainTitle(value, index) {
    setMainTitle(value);
  }

  function parseNewTip() {
    const dateRaw = new Date();
    const formattedDate = `${dateRaw.getDate()}/${
      dateRaw.getMonth() + 1
    }/${dateRaw.getFullYear()}`;
    const newObject = {
      id: newTipId, //string
      date: formattedDate, // string
      tags: tagsState, // array of strings
      title: mainTitle, // string
      sections: Object.values(inputState),
    };
    signedIn? addTipToDb(newObject): addObjectToInputFormState(newObject);
    setTip((object) => {
      return [...object, newObject];
    });
  }
  const inputFormHasState = inputFormState !== null;
  console.log("Form has state = " + inputFormHasState);
  return ( 
    <div className="add-form">
      <div className="form-control">
        <label >
          <h2>Add Title</h2>
          <MainTitle
            onInput={callbackMainTitle}
            name={newTipId + "MainTitle"}
            id={newTipId + "MainTitle"}
            defaultValue={inputFormState?.title || ""}
            />
        </label>
        <SelectMulti tagListAll={tagListAll} setTagsState={setTagsState} defaultValue={inputFormState?.tags.join(", ") || ""} />
      </div>
      <MultiInput
        inputState={inputState}
        setInputState={setInputState}
        onSubmit={onSubmit}
      />
    </div>
  );

  function onSubmit() {
    parseNewTip();
    setShowAddTipForm(false);
  }
};
export default InputForm;
