import Button from "../../../elements/Button";
import InputForm from "./InputForm";

const AddTip = ({
  setTip,
  newTipId,
  tagListAll,
  addTipToDb,
  signedIn,
  isOwner,
  inputFormState,
  setInputFormState,
  addFieldToInputFormState,
  addObjectToInputFormState,
  showAddTipForm,
  setShowAddTipForm,
  inputTags,
  setInputTags,
}) => {
  function onClickAdd() {
    if (showAddTipForm === true) onClose();
    setShowAddTipForm((state) => !state);
  }

  const inputFormHasState = inputFormState !== null;
  const currentId = inputFormState?.id || newTipId;
  if (inputFormHasState) {
    // console.log(inputFormState);
    // console.log("Current ID:" + currentId);
    // console.log("Form has state = " + inputFormHasState);
    // console.log("maintitle = " + inputFormState.title);
    // console.log("inputTags = " + inputFormState.tags);
  }

  function callbackMainTitle(value) {
    addFieldToInputFormState("title", value);
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
      tags: [...new Set(inputFormState.tags)], // array of strings
      title: inputFormState.title|| "No Title Added Yet", // string
      sections: inputFormState.sections,
    };
    return newObject;
  }

  function onSubmit() {
    const newObject = makeNewTipObject();
    if (isOwner) addTipToDb(newObject);
    addNewObjectToTips(newObject);
    clearInputFormState();
    setShowAddTipForm(false);

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
            inputFormState={inputFormState}
            setInputFormState={setInputFormState}
            addFieldToInputFormState={addFieldToInputFormState}
            addObjectToInputFormState={addObjectToInputFormState}
            inputTags={inputTags}
            setInputTags={setInputTags}
            callbackMainTitle={callbackMainTitle}
            onSubmit={onSubmit}
            onPreview={onPreview}
            currentId={currentId}
          />
        )}{" "}
      </>
    </div>
  );
};

export default AddTip;
