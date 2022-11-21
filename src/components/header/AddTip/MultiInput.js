import InputField from "./InputField";
import Button from "../../../elements/Button";
import InputButtons from "./InputButtons";
let keyInc = 0;
const MultiInput = ({
  authClickHandler,
  onSubmit,
  onPreview,
  inputFormState,
  signedIn,
  isOwner,
  setInputFormState,
}) => {
  function deepCloneInputFormState(){
    return {...inputFormState, sections: inputFormState.sections.map(x => {return{...x}}), tags: [...inputFormState.tags]};
  }
  function addField() {
    setInputFormState((object) => {
      const newObject = { ...object };
      newObject.sections = [
        ...newObject.sections.map((x) => {
          return { ...x };
        }),
        { type: "text", content: null },
      ];
      return newObject;
    });
  }
  function duplicateField(e) {
    const index = e.target.id.split("-")[0];
    setInputFormState((object) => {
      const newObject = { ...object };
      newObject.sections = [
        ...newObject.sections.map((x) => {
          return { ...x };
        }),
        newObject.sections[index],
      ];
      return newObject;
    });
  }
  function swapArrayPositions(array, index, direction = "up"){
    const indexModifier = direction === "down"? -1: 1;
    const secondIndex = index + indexModifier;
    const indexLimit = array.length -1;
    if (secondIndex > indexLimit || secondIndex < 0) return array;
    [array[index], array[secondIndex]] = [array[secondIndex], array[index]];
    return array
  }

  function deleteIndexedField(e) {
    keyInc += 1;
    console.log(`keyInc ${keyInc}`);
    
    const index = e.target.id.split("-")[0];
    console.log(`index ${index}`);
    const newObject = deepCloneInputFormState();
    const newSections = newObject.sections.filter((_, i) => parseInt(index) !== i);
    console.log(newObject.sections);
    setInputFormState(() => {
      newObject.sections = newSections;
      console.log(newObject.sections);
      return newObject;
    });
  }
  function changeValue(inputObject, index) {
    setInputFormState((object) => {
      const newObject = { ...object };
      const targetSection = newObject.sections[index];
      const type = inputObject.type || targetSection["type"];
      const content = inputObject.content || targetSection["content"];
      newObject.sections[index] = {
        type: type,
        content: content,
      };
      const title = inputObject.title || targetSection["title"];
      if (title !== undefined) newObject.sections[index].title = title;
      return newObject;
    });
  }
  function makeInputArray() {
    return inputFormState.sections.map((object, index) => {
      const returnObject = (
        <div key={(keyInc + "a" + index)} className="field-container">
          <h2>Section {index + 1}</h2>
          <InputButtons
            key={(keyInc + "a" + index) + "InputButtons"}
            type={object.type}
            index={index}
            changeValue={changeValue}
            title={object.title}
          />
          <InputField
            key={(keyInc + "a" + index) + "InputField"}
            id={index + "InputField"}
            name={index}
            type={object.type}
            defaultValue={object.content}
            changeText={changeValue}
          />
          <Button
            key={index + "duplicateField"}
            color="black"
            backgroundColor="green"
            text="Duplicate Section"
            clickFunction={duplicateField}
            id={index +"-duplicatefield"}
          />
          <Button
            key={index + "deleteIndexedField"}
            color="black"
            backgroundColor="red"
            text="Delete this Section"
            clickFunction={deleteIndexedField}
            id={index +"-deleteIndexedField"}
          />


        </div>
      );

      return returnObject;
    });
  }
  function signedInNonOwner(){
    alert("You are not allowed to submit to the database- sorry!");
  };
  const inputArray = makeInputArray();
  const submitText = isOwner
    ? "Submit to database"
    : signedIn? "You are not allowed to submit to the database": "Sign in to submit to the database";
  const submitBackColour = isOwner ? "green" : "silver";
  const submitTextColour = isOwner ? "white" : "black";
  const submitFunction = isOwner ? onSubmit: signedIn? signedInNonOwner: authClickHandler;
  return (
    <>
      <h2>Add sections</h2>
      {inputArray}
      <Button
        key="addField"
        color="black"
        backgroundColor="blue"
        text="Add New Section"
        clickFunction={addField}
        id="add-field"
      />
      <Button
        key="preview"
        color="black"
        backgroundColor="violet"
        text="Preview Tip"
        clickFunction={onPreview}
      />
      <Button
        key="saveTip"
        color={submitTextColour}
        backgroundColor={submitBackColour}
        text={submitText}
        clickFunction={submitFunction}
      />
    </>
  );
};

export default MultiInput;
