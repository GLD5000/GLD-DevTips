import { useState } from "react";
import InputField from "./InputField";
import Button from "../../elements/Button";
import InputSelect from "./InputSelect";

const MultiInput = () => {
  const [inputState, setInputState] = useState(() => [
    { type: "text", content: null },
  ]);
  function addField() {
    setInputState((object) => {
      //const key = object.length;
      const newPart = { type: "text", content: null };
      return [...object, newPart];
    });
  }
  function changeType(value, index) {
    console.log(`index: ${index} - type changed to ${value}`);
    console.log(inputState);
  }

  function makeInputArray() {
    return inputState.map((object, index) => {
      const returnObject = (
        <div key={index}>
          <InputSelect
            key={index + "InputSelect"}
            name={index}
            type={object.type}
            index={index}
            changeType={changeType}
          />
          <InputField
            key={index + "InputField"}
            name={index}
            type={object.type}
            content={object.content}
          />
        </div>
      );

      return returnObject;
    });
  }
  function submit() {
    console.log(`thanks for your help with the submissions`);
  }

  const inputArray = makeInputArray();

  return (
    <>
      {inputArray}
      <Button
        key="addField"
        color="black"
        backgroundColor="white"
        text="Add Input Field"
        clickFunction={addField}
      />
      <Button
        key="saveTip"
        color="black"
        backgroundColor="white"
        text="Save Tip"
        clickFunction={submit}
      />
    </>
  );
};

export default MultiInput;
