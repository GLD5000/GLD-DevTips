import InputForm from "./InputForm";

const AddTip = ({
  authClickHandler,
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
  addNewObjectToTips,
  setSearchQuery,
}) => {
  const currentId = inputFormState?.id || newTipId;
  function callbackMainTitle(value) {
    addFieldToInputFormState("title", value);
    setSearchQuery(()=> value);
  }
  function makeNewTipObject() {
    const dateRaw = new Date();
    const formattedDate = `${dateRaw.getDate().toString().padStart(2, "0")}/${
      (dateRaw.getMonth() + 1).toString().padStart(2, "0")
    }/${dateRaw.getFullYear()} ${dateRaw.getHours().toString().padStart(2, "0")}:${dateRaw.getMinutes().toString().padStart(2, "0")}`;
    const newObject = {
      id: currentId,
      date: formattedDate,
      tags: [...new Set(inputFormState.tags)],
      title: inputFormState.title || "No Title Added Yet",
      sections: inputFormState.sections,
    };
    return newObject;
  }

  function onSubmit() {
    const newObject = makeNewTipObject();
    console.log(`isOwner ${isOwner}`);
    
    if (isOwner) addTipToDb(newObject);
    newObject.titleSuffix = " (saved)";
    newObject.updated = "Last save: " + newObject.date;
    addNewObjectToTips(newObject);
    clearInputFormState();
    setShowAddTipForm(false);
  }
  function clearInputFormState() {
    setSearchQuery(() => "");

    addObjectToInputFormState(null);
    setShowAddTipForm(false);
  }
  function onPreview() {
    const newObject = makeNewTipObject();
    addObjectToInputFormState(newObject);
    newObject.updated = "Last update: " + newObject.date;
    newObject.titleSuffix = " (preview)";
    addNewObjectToTips(newObject);
  }
  return (
    <div className="add-tip-container">
          <InputForm
            authClickHandler={authClickHandler}
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
            callbackMainTitle={callbackMainTitle}
            onSubmit={onSubmit}
            onPreview={onPreview}
            currentId={currentId}
          />
    </div>
  );
};

export default AddTip;
