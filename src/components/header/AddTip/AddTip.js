import Button from "../../../elements/Button";
import InputForm from "./InputForm";
import { useState } from "react";

const AddTip = ({
  setTip,
  newTipId,
  tagListAll,
  addTipToDb,
  signedIn,
  isOwner,
  inputFormState,
  addObjectToInputFormState,
  showAddTipForm,
  setShowAddTipForm,
  mainTitle,
  setMainTitle,
  inputTags,
  setInputTags,
}) => {
  function onClickAdd() {
    if (showAddTipForm === true) onClose();
    setShowAddTipForm((state) => !state);
  }

  const inputFormHasState = inputFormState !== null;
  const currentId = inputFormHasState ? inputFormState.id : newTipId;
  if (inputFormHasState) {
    console.log(inputFormState);
    console.log("Current ID:" + currentId);
    console.log("Form has state = " + inputFormHasState);
    console.log("maintitle = " + mainTitle);
    console.log("inputTags = " + inputTags);
  }
  const [inputState, setInputState] = useState(() => {
    return { 0: { type: "text", content: null } };
  });

  function callbackMainTitle(value, index) {
    setMainTitle(value);
  }

  function addNewObjectToTips(newObject) {
    setTip((object) => {
      const copyObject = { ...object };
      copyObject[newObject.id] = newObject;
      return copyObject;
    });
  }
  function makeNewTipObject() {
    const dateRaw = new Date();
    const formattedDate = `${dateRaw.getDate()}/${
      dateRaw.getMonth() + 1
    }/${dateRaw.getFullYear()}`;
    const newObject = {
      id: currentId, //string
      date: formattedDate, // string
      tags: [...new Set(inputTags)], // array of strings
      title: mainTitle, // string
      sections: Object.values(inputState),
    };
    return newObject;
  }

  function onSubmit() {
    const newObject = makeNewTipObject();
    if (isOwner) addTipToDb(newObject);
    addNewObjectToTips(newObject);
    clearInputFormState();
  }
  function clearInputFormState() {
    addObjectToInputFormState(null);
    setShowAddTipForm(false);
  }
  function onPreview() {
    const newObject = makeNewTipObject();
    addObjectToInputFormState(newObject);
    addNewObjectToTips(newObject);
  }
  function onClose() {
    addObjectToInputFormState(null);
    //const newObject = makeNewTipObject();
    //addObjectToInputFormState(newObject);
  }
  const AddTipText = showAddTipForm
    ? "Close and Clear form"
    : "Add A New Tip To The Collection!";
  const AddTipColour = showAddTipForm ? "pink" : "aquamarine";

  return (
    <div className="add-tip-container">
      <>
        <Button
          color="black"
          backgroundColor={AddTipColour}
          text={AddTipText}
          clickFunction={onClickAdd}
        />
        {showAddTipForm && (
          <InputForm
            setShowAddTipForm={onClickAdd}
            setTip={setTip}
            newTipId={newTipId}
            tagListAll={tagListAll}
            addTipToDb={addTipToDb}
            signedIn={signedIn}
            isOwner={isOwner}
            addObjectToInputFormState={addObjectToInputFormState}
            inputFormState={inputFormState}
            inputTags={inputTags}
            setInputTags={setInputTags}
            setInputState={setInputState}
            callbackMainTitle={callbackMainTitle}
            onSubmit={onSubmit}
            onPreview={onPreview}
            currentId={currentId}
            inputState={inputState}
          />
        )}{" "}
      </>
    </div>
  );
};

export default AddTip;
