import Button from "../../../elements/Button";
import InputForm from "./InputForm";
import { useState } from "react";

const AddTip = ({ setTip, newTipId, tagListAll, addTipToDb, signedIn }) => {
  const [showAddTipForm, setShowAddTipForm] = useState(() => false);
  function onClickAdd() {
    console.log(newTipId);
    setShowAddTipForm((state) => !state);
  }

  return (
    <div>
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
