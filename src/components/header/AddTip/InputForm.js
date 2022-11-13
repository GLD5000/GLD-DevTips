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
  const inputFormHasState = inputFormState !== null;
  const currentId = inputFormHasState? inputFormState.id: newTipId;
  console.log("Current ID:" + currentId);
  if (inputFormHasState) console.log(inputFormState);
  const [inputState, setInputState] = useState(() => {
    return { 0: { type: "text", content: null } };
  });
  const [tagsState, setTagsState] = useState(() => inputFormState?.tags || []);
  const [mainTitle, setMainTitle] = useState(() => inputFormState?.title || "No Title Yet");

  function callbackMainTitle(value, index) {
    setMainTitle(value);
  }

  function parseNewTip() {
    const dateRaw = new Date();
    const formattedDate = `${dateRaw.getDate()}/${
      dateRaw.getMonth() + 1
    }/${dateRaw.getFullYear()}`;
    const newObject = {
      id: currentId, //string
      date: formattedDate, // string
      tags: [...new Set(tagsState)], // array of strings
      title: mainTitle, // string
      sections: Object.values(inputState),
    };
    signedIn? addTipToDb(newObject): addObjectToInputFormState(newObject);
    setTip((object) => {
      const copyObject = {...object};
      copyObject[newObject.id]= newObject;
      return copyObject;
    });
  }
  console.log("Form has state = " + inputFormHasState);
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
        onReset={onReset}
      />
    </div>
  );

  function onSubmit() {
    parseNewTip();
    setShowAddTipForm(false);
  }
  function onReset(){
    addObjectToInputFormState(null);
    setShowAddTipForm(false);
  }


};
export default InputForm;
