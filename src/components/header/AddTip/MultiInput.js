import InputField from "./InputField";
import Button from "../../../elements/Button";
import InputButtons from "./InputButtons";
import SvgButton from "../../../elements/SvgButton";
let keyInc = 0;
let autoFocusIndex = null;
const MultiInput = ({
  authClickHandler,
  onSubmit,
  onPreview,
  inputFormState,
  signedIn,
  isOwner,
  setInputFormState,
}) => {
  function deepCloneInputFormState() {
    return {
      ...inputFormState,
      sections: inputFormState.sections.map((x) => {
        return { ...x };
      }),
      tags: [...inputFormState.tags],
    };
  }
  function addField() {
    setInputFormState((object) => {
      const newObject = { ...object };
      newObject.sections = [
        ...newObject.sections.map((x) => {
          return { ...x };
        }),
        { type: "text", content: "" },
      ];
      autoFocusIndex = newObject.sections.length -1;

      return newObject;
    });
  }
  function duplicateField(e) {
    incrementKeys();
    const index = getIndexOfE(e);
    const newObject = deepCloneInputFormState();
    const duplicateObject = { ...newObject.sections[index] };
    autoFocusIndex = index + 1;
    newObject.sections[index].title =
      newObject.sections[index].title === undefined
        ? `Copy of section ${index + 1}`
        : `${newObject.sections[index].title} (copy)`;
    newObject.sections.splice(index, 0, duplicateObject);

    setInputFormState(() => {
      return newObject;
    });
  }
  function swapArrayPositions(array, index, direction = "up") {
    const indexModifier = direction === "down" ? 1 : -1;
    const secondIndex = index + indexModifier;
    const indexLimit = array.length - 1;
    if (secondIndex > indexLimit || secondIndex < 0) return array;
    [array[index], array[secondIndex]] = [array[secondIndex], array[index]];
    return array;
  }
  function incrementKeys() {
    keyInc += 1;
  }
  function moveFieldUp(e) {
    incrementKeys();
    const index = getIndexOfE(e);
    const newObject = deepCloneInputFormState();
    const newSections = swapArrayPositions(newObject.sections, index, "up");

    setInputFormState(() => {
      newObject.sections = newSections;
      return newObject;
    });
  }
  function moveFieldDown(e) {
    incrementKeys();
    const index = getIndexOfE(e);
    const newObject = deepCloneInputFormState();
    const newSections = swapArrayPositions(newObject.sections, index, "down");

    setInputFormState(() => {
      newObject.sections = newSections;
      return newObject;
    });
  }
  function getIndexOfE(e) {
    return parseInt(e.target.id.split("-")[0]);
  }
  function deleteIndexedField(e) {
    incrementKeys();
    const index = getIndexOfE(e);
    const newObject = deepCloneInputFormState();
    const newSections = newObject.sections.filter((_, i) => index !== i);

    setInputFormState(() => {
      newObject.sections = newSections;
      return newObject;
    });
  }
  function appendIndexedField(e, textToAdd) {
    console.group(`document.getSelection()`);
    console.log(document.getSelection());
    console.groupEnd();

    incrementKeys();
    const index = getIndexOfE(e);
    const newObject = deepCloneInputFormState();
    newObject.sections[index].content += textToAdd;

    setInputFormState(() => {
      return newObject;
    });
  }

  function onHover(e){
    console.log(`hovering ${e.target.id}`); 
    console.log(document.getSelection());
    console.log(document.getSelection().anchorNode);
    console.log(document.getSelection().anchorNode);
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
      const autoFocus = index === autoFocusIndex;
      const returnObject = (
        <div key={keyInc + "a" + index} className="field-container">
          <h2>Section {index + 1}</h2>
          <InputButtons
            key={keyInc + "a" + index + "InputButtons"}
            type={object.type}
            index={index}
            changeValue={changeValue}
            title={object.title}
            appendIndexedField={appendIndexedField}
            onHover={onHover}
            autoFocus={autoFocus}
          />
          <InputField
            key={keyInc + "a" + index + "InputField"}
            id={index + "InputField"}
            name={index}
            type={object.type}
            defaultValue={object.content}
            changeText={changeValue}
          />
          <div className="svg-btn-grid">
            <SvgButton
              type="up"
              key={index + "moveFieldUp"}
              text="Up"
              clickFunction={moveFieldUp}
              id={index + "-moveFieldUp"}
            />
            <SvgButton
              type="down"
              key={index + "moveFieldDown"}
              backgroundColor="transparent"
              text="Down"
              clickFunction={moveFieldDown}
              id={index + "-moveFieldDown"}
            />

            <SvgButton
              type="duplicate"
              key={index + "duplicateField"}
              text="Copy"
              clickFunction={duplicateField}
              id={index + "-duplicatefield"}
            />
            <SvgButton
              type="delete"
              key={index + "deleteIndexedField"}
              text="Delete"
              clickFunction={deleteIndexedField}
              id={index + "-deleteIndexedField"}
            />
          </div>
        </div>
      );
      return returnObject;
    });
  }
  function signedInNonOwner() {
    alert("You are not allowed to submit to the database- sorry!");
  }
  const inputArray = makeInputArray();
  const submitText = isOwner
    ? "Save"
    : signedIn
    ? "Save (Wrong User)"
    : "Sign in to Save";
  const submitBackColour = isOwner ? "green" : "silver";
  const submitTextColour = isOwner ? "white" : "black";
  const submitFunction = isOwner
    ? onSubmit
    : signedIn
    ? signedInNonOwner
    : authClickHandler;

  return (
    <>
      <h2>Add sections</h2>
      {inputArray}
      <SvgButton
        type="add"
        key="addField"
        color="black"
        backgroundColor="dodgerBlue"
        text="Add Section"
        clickFunction={addField}
        id="add-field"
      />
      <SvgButton
        type="preview"
        key="preview"
        color="black"
        backgroundColor="mediumPurple"
        text="Preview"
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
