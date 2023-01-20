import InputForm from "./InputForm";

const AddTip = ({
  setTip,
  newTipId,
  tagListAll,
  addTipToDb,
  inputFormState,
  setInputFormState,
  addFieldToInputFormState,
  addObjectToInputFormState,
}) => {
  

  return (
    <div className="add-tip-container">
          <InputForm
            setTip={setTip}
            newTipId={newTipId}
            tagListAll={tagListAll}
            addTipToDb={addTipToDb}
            inputFormState={inputFormState}
            setInputFormState={setInputFormState}
            addFieldToInputFormState={addFieldToInputFormState}
            addObjectToInputFormState={addObjectToInputFormState}
          />
    </div>
  );
};

export default AddTip;
