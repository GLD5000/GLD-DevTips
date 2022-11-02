import Button from "../../../elements/Button";
import InputForm from "./InputForm";
import { useState } from "react";

const AddTip = ({setTip, newTipId, tagListAll}) => {
  const [showNewTip, setShowNewTip] = useState(() => false);
  function onClickAdd() {
    setShowNewTip(state => !state);
  }
  

  return (
    <div>
      {showNewTip ? (
      <>
      <Button
  color="black"
  backgroundColor="white"
  text="Add A New Tip To The Collection!"
  clickFunction={onClickAdd}
    /> 
    <InputForm setShowNewTip={onClickAdd} setTip={setTip} newTipId={newTipId} tagListAll={tagListAll}/>       
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
