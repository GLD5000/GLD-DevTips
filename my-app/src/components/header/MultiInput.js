import InputField from "./InputField";
import Button from "../../elements/Button";
import InputSelect from "./InputSelect";

const MultiInput = ({inputState, setInputState}) => {
  function addField() {
    setInputState((object) => {
      const key = Object.keys(object).length;
      const newPart = { type: "text", content: null };
      return {...object, [key]: newPart};
    });

  }
  function changeType(value, index) {

    setInputState((object) =>{
      const text = object[index]["content"];
      return {...object, [index]: {type: value, content:text}};
    });
  }

  function changeText(value, index) {

    setInputState((object) =>{
      const type = object[index]["type"];
      return {...object, [index]: {type: type, content:value}};
    });
  }
  console.log(inputState)
  function makeInputArray() {
    return Object.values(inputState).map((object, index) => {
      const returnObject = (
        <div key={index} className="field-container">
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
            changeText={changeText}
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
