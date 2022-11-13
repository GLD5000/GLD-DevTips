import Button from "../../../elements/Button";
import InputForm from "./InputForm";
import { useState } from "react";

const AddTip = ({ setTip, newTipId, tagListAll, addTipToDb, signedIn }) => {
  const [showAddTipForm, setShowAddTipForm] = useState(() => false);
  function onClickAdd() {
    setShowAddTipForm((state) => !state);
  }
  const [inputFormState, setInputFormState] = useState(() => null);

  function addObjectToInputFormState(object){
    if (object === null) {
      setInputFormState(() => null)
    return
  };
    setInputFormState(() => {
      const newObject = {...object};
      return newObject;
    })
    console.log("Not signed in")
    console.log(object);
  }


  return (
    <div className="add-tip-container">
      {showAddTipForm ? (
        <>
          <Button
            color="black"
            backgroundColor="white"
            text="Add A New Tip To The Collection!"
            clickFunction={onClickAdd}
          />
          <InputForm
            setShowAddTipForm={onClickAdd}
            setTip={setTip}
            newTipId={newTipId}
            tagListAll={tagListAll}
            addTipToDb={addTipToDb}
            signedIn={signedIn}
            addObjectToInputFormState={addObjectToInputFormState}
            inputFormState={inputFormState}

          />
        </>
      ) : (
        <Button
          color="black"
          backgroundColor="white"
          text="Add A New Tip To The Collection!"
          clickFunction={onClickAdd}
        />
      )}
    </div>
  );
};

export default AddTip;
