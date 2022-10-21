import { useState } from "react";
import InputField from "./InputField";
import Button from "../../elements/Button";

const MultiInput = () => {
  const [inputState, setInputState] = useState(() => [{ type: "text", content: null }]);
  function addField() {
    setInputState((object) => {
      const key = object.length;
      const newPart = { type: "text", content: null };
      return [...object, newPart];
    });
  }
  function changeType(){
    console.log(`type changed`);
  }

  function makeInputArray() {
    return inputState.map((object, index) => {
        const returnObject = <>
        <InputSelect key={index} type={object.type} index={index} changeType={changeType}/>
        <InputField key={index} type={object.type} content={object.content} />
        </>
        
      return returnObject;
    });
  }
  function submit(){
    console.log(`thanks for your help with the submissions`);
  }

  const inputArray = makeInputArray();


  return ( <>
{inputArray}
<Button
  color="black"
  backgroundColor="white"
  text="Add Input Field"
  clickFunction={addField}
    /> 
      <Button
  color="black"
  backgroundColor="white"
  text="Save Tip"
  clickFunction={submit}
    /> 
    </>  );
};

export default MultiInput;
