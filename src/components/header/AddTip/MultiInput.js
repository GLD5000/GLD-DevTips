import InputField from "./InputField";
import Button from "../../../elements/Button";
import InputButtons from "./InputButtons";
import SvgButton from "../../../elements/SvgButton";
const selection = {};
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
      autoFocusIndex = newObject.sections.length - 1;

      return newObject;
    });
  }
  function duplicateField(e) {
    incrementKeys();
    const index = getSectionIndexFromId(e);
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
    const index = getSectionIndexFromId(e);
    const newObject = deepCloneInputFormState();
    const newSections = swapArrayPositions(newObject.sections, index, "up");

    setInputFormState(() => {
      newObject.sections = newSections;
      return newObject;
    });
  }
  function moveFieldDown(e) {
    incrementKeys();
    const index = getSectionIndexFromId(e);
    const newObject = deepCloneInputFormState();
    const newSections = swapArrayPositions(newObject.sections, index, "down");

    setInputFormState(() => {
      newObject.sections = newSections;
      return newObject;
    });
  }
  function getSectionIndexFromId(e) {
    return parseInt(e.target.id.split("-")[0]);
  }
  function deleteIndexedField(e) {
    incrementKeys();
    const index = getSectionIndexFromId(e);
    const newObject = deepCloneInputFormState();
    const newSections = newObject.sections.filter((_, i) => index !== i);

    setInputFormState(() => {
      newObject.sections = newSections;
      return newObject;
    });
  }
  function addTextareaToState(index, newContent) {
    setInputFormState(() => {
      const newObject = deepCloneInputFormState();
      newObject.sections[index].content = newContent;
      return newObject;
    });
  }
  function updateTextArea({ index, start, end }, content) {
    const inputElement = document.getElementById(index + "-InputField");
    inputElement.select();
    inputElement.setRangeText(content);
    inputElement.selectionStart = start;
    inputElement.selectionEnd = end;
    inputElement.focus();
  }
  function toggleHeaderFlags(textToAdd, oldContent, selection) {
    const finalFlag = "####";
    const indexOfFinalFlag = oldContent[0].lastIndexOf(finalFlag);
    const finalFlagIsPresent =
      indexOfFinalFlag > -1 &&
      indexOfFinalFlag === oldContent[0].length - finalFlag.length;

    const shortFlag = "##";
    let indexOfFirstFlag = oldContent[0].lastIndexOf(textToAdd[0]);
    if (indexOfFirstFlag === -1) indexOfFirstFlag = oldContent[0].lastIndexOf(shortFlag);
    if (selection.start === 0 || indexOfFirstFlag === 0 || oldContent[0][oldContent[0].length-1] === "\n") textToAdd[0] = textToAdd[0].slice(1); 
    const firstFlagIsPresent = finalFlagIsPresent === false &&
    indexOfFirstFlag > -1 &&
    indexOfFirstFlag === oldContent[0].length - textToAdd[0].length;
    
    const intermediateFlag = "###";
    const indexOfIntermediateFlag = oldContent[0].lastIndexOf(intermediateFlag);
    const intermediateFlagIsPresent = finalFlagIsPresent === false &&
      indexOfIntermediateFlag > -1 &&
      indexOfIntermediateFlag ===
        oldContent[0].length - intermediateFlag.length;


    if (finalFlagIsPresent) {
      const preSelection = oldContent[0].slice(0, indexOfFinalFlag);
      const selectedText = oldContent[1] === textToAdd[1] ? "" : oldContent[1];
      const postSelection = oldContent[2].slice(textToAdd[2].length);
      selection.start = indexOfFinalFlag;
      selection.end = selection.start + selectedText.length;

      return [preSelection, selectedText, postSelection].join("");
    }

    if (firstFlagIsPresent || intermediateFlagIsPresent) {
      const preSelection = oldContent[0] + "#";
      const selectedText = oldContent[1] === "" ? textToAdd[1] : oldContent[1];
      const postSelection = oldContent[2];
      selection.start = preSelection.length;
      selection.end = selection.start + selectedText.length;

      return [preSelection, selectedText, postSelection].join("");
    }

    const preSelection = oldContent[0] + textToAdd[0];
    const selectedText = oldContent[1] === "" ? textToAdd[1] : oldContent[1];
    const postSelection = textToAdd[2] + oldContent[2];
    selection.start = preSelection.length;
    selection.end = selection.start + selectedText.length;
    return [preSelection, selectedText, postSelection].join("");
  }
  function toggleFlags(textToAdd, oldContent, selection) {
    if (textToAdd[1] === "Header") {
      return toggleHeaderFlags(textToAdd, oldContent, selection);
    }
    const indexOfFirstFlag = oldContent[0].lastIndexOf(textToAdd[0]);
    const firstFlagIsPresent =
    indexOfFirstFlag > -1 &&  indexOfFirstFlag === oldContent[0].length - textToAdd[0].length;
    const SecondFlagIsPresent =
      oldContent[2].indexOf(textToAdd[2]) === 0 || textToAdd[2].length === 0;

    if (firstFlagIsPresent && SecondFlagIsPresent) {
      const preSelection = oldContent[0].slice(0, indexOfFirstFlag);
      const selectedText = oldContent[1] === textToAdd[1] ? "" : oldContent[1];
      const postSelection = oldContent[2].slice(textToAdd[2].length);
      selection.start = indexOfFirstFlag;
      selection.end = selection.start + selectedText.length;

      return [preSelection, selectedText, postSelection].join("");
    }
    const preSelection = oldContent[0] + textToAdd[0];
    const selectedText = oldContent[1] === "" ? textToAdd[1] : oldContent[1];
    const postSelection = textToAdd[2] + oldContent[2];
    selection.start = preSelection.length;
    selection.end = selection.start + selectedText.length;
    return [preSelection, selectedText, postSelection].join("");
  }
  function splitContent(selection, string) {
    return [
      string.slice(0, selection.start),
      string.slice(selection.start, selection.end),
      string.slice(selection.end),
    ];
  }
  function insertTextArea(selection, textToAdd) {
    const inputElement = document.getElementById(
      selection.index + "-InputField"
    );
    const currentValue = inputElement.value;
    const oldContent = splitContent(selection, currentValue);
    const newContent = toggleFlags(textToAdd, oldContent, selection);

    updateTextArea(selection, newContent);
    addTextareaToState(selection.index, newContent);
  }
  function AddToTextarea(e, textToAdd) {
    const sectionIndex = getSectionIndexFromId(e);
    updateSelection(sectionIndex);
    insertTextArea(selection, textToAdd);
  }
  function updateSelection(sectionNumber) {
    selection.start = document.getElementById(
      sectionNumber + "-InputField"
    ).selectionStart;
    selection.end = document.getElementById(
      sectionNumber + "-InputField"
    ).selectionEnd;
    selection.index = sectionNumber;
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
    //updateSelection(index);
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
            AddToTextarea={AddToTextarea}
            autoFocus={autoFocus}
          />
          <InputField
            key={keyInc + "a" + index + "InputField"}
            id={index + "-InputField"}
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
