import InputField from "./InputField";
import Button from "../../../elements/Button";
import InputButtons from "./InputButtons";

const MultiInput = ({ onSubmit, onPreview, inputFormState, isOwner, setInputFormState }) => {



  function addField() {
    setInputFormState((object) => {
      const newObject = {...object};
      newObject.sections = [...newObject.sections, { type: "text", content: null }];
      return  newObject;
    });
  }

  function changeValue(inputObject, index) {
    setInputFormState((object) => {
      const newObject = {...object};
      const targetSection = newObject.sections[index]
      const title = inputObject.title || targetSection["title"];
      const type = inputObject.type || targetSection["type"];
      const content = inputObject.content || targetSection["content"];
      newObject.sections[index] = { title: title, type: type, content: content };
      return newObject;
    });
  }

  function makeInputArray() {
    //console.log(inputFormState);
    return inputFormState.sections.map((object, index) => {
      const returnObject = (
        <div key={index} className="field-container">
          <h2>Section {index + 1}</h2>
          <InputButtons
            key={index + "InputButtons"}
            type={object.type}
            index={index}
            changeValue={changeValue}
            title={object.title}
          />
          <InputField
            key={index + "InputField"}
            name={index}
            type={object.type}
            defaultValue={object.content}
            changeText={changeValue}
          />
        </div>
      );

      return returnObject;
    });
  }

  const inputArray = makeInputArray();
  const submitText= isOwner? "Submit to database": "Submit to database (Not available to you)";
  const submitColour= isOwner? "green": "silver";
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
        id="add-field"
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
        backgroundColor={submitColour}
        text={submitText}
        clickFunction={onSubmit}
      />
    </>
  );
};

export default MultiInput;
