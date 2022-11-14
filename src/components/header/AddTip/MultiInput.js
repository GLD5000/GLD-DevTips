import InputField from "./InputField";
import Button from "../../../elements/Button";
import InputButtons from "./InputButtons";

const MultiInput = ({ inputState, setInputState, onSubmit, onPreview, inputFormState, isOwner }) => {

  

  function addField() {
    setInputState((object) => {
      const key = Object.keys(object).length;
      const newPart = { type: "text", content: null };
      return { ...object, [key]: newPart };
    });
  }

  function changeValue(inputObject, index) {
    setInputState((object) => {
      const title = inputObject.title || object[index]["title"];
      const type = inputObject.type || object[index]["type"];
      const content = inputObject.content || object[index]["content"];

      return {
        ...object,
        [index]: { title: title, type: type, content: content },
      };
    });
  }

  function makeInputArray() {
    console.log(inputFormState);
    return Object.values(inputState).map((object, index) => {
      const returnObject = (
        <div key={index} className="field-container">
          <h2>Section {index + 1}</h2>
          <InputButtons
            key={index + "InputButtons"}
            type={object.type}
            index={index}
            changeValue={changeValue}
          />
          <InputField
            key={index + "InputField"}
            name={index}
            type={object.type}
            content={object.content}
            changeText={changeValue}
          />
        </div>
      );

      return returnObject;
    });
  }

  const inputArray = makeInputArray();
  const submitText= isOwner? "Submit to database": "Submit to database (Not available to you)";
  return (
    <>
      <h2>Add sections</h2>
      {inputArray}
      <Button
        key="addField"
        color="black"
        backgroundColor="white"
        text="Add Another Section"
        clickFunction={addField}
      />
      <Button
        key="preview"
        color="white"
        backgroundColor="blue"
        text="Preview"
        clickFunction={onPreview}
      />
      <Button
        key="saveTip"
        color="white"
        backgroundColor="green"
        text={submitText}
        clickFunction={onSubmit}
      />
    </>
  );
};

export default MultiInput;
