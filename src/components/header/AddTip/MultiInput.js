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

  function appendTextArea(sectionIndex, textToAdd) {
    //incrementKeys();
    console.count("AppendFlags");

    // const newObject = deepCloneInputFormState();
    // const content = newObject.sections[sectionIndex].content + textToAdd.join("");
    // newObject.sections[sectionIndex].content = content;

    const inputElement = document.getElementById(sectionIndex + "-InputField");
    const currentValue = inputElement.value;
    const content = currentValue + textToAdd.join("");
    updateTextArea(selection, content);

    // setInputFormState(() => {
    //   return newObject;
    // });
  }
  function updateTextArea({ section, start, end }, content) {
    const inputElement = document.getElementById(section + "-InputField");
    inputElement.select();
    inputElement.setRangeText(content);
    inputElement.selectionStart = start;
    inputElement.selectionEnd = end;
    inputElement.focus();
  }
  function toggleFlags(textToAdd, oldContent, selection) {
    console.group(`oldContent`);
    console.log(oldContent);
    console.groupEnd();
    const indexOfFirstFlag = oldContent[0].lastIndexOf(textToAdd[0]);
    const FirstFlagIsPresent =
      indexOfFirstFlag === oldContent[0].length - textToAdd[0].length;
    const SecondFlagIsPresent =
      oldContent[2].indexOf(textToAdd[2]) === 0 || textToAdd[2].length === 0;

    if (FirstFlagIsPresent && SecondFlagIsPresent) {
      console.count("RemoveFlags");
      const preSelection = oldContent[0].slice(0, indexOfFirstFlag);
      const selectedText = oldContent[1] === textToAdd[1]? "": oldContent[1];
      const postSelection = oldContent[2].slice(textToAdd[2].length);
      selection.start = indexOfFirstFlag;
      selection.end = selection.start + selectedText.length;
      
      return [preSelection, selectedText, postSelection].join("");
    }
    console.count("AddFlags");
    const preSelection = oldContent[0] + textToAdd[0];
    const selectedText = oldContent[1] === "" ? textToAdd[1] : oldContent[1];
    const postSelection = textToAdd[2] + oldContent[2];
    console.log(`preSelection ${preSelection}`);
    console.log(`selectedText ${selectedText}`);
    console.log(`postSelection ${postSelection}`);
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
    // incrementKeys();
    // const newObject = deepCloneInputFormState();
    console.count("insertTextArea");
    const inputElement = document.getElementById(
      selection.section + "-InputField"
    );
    const currentValue = inputElement.value;
    console.log(`currentValue ${currentValue}`);
    const oldContent = splitContent(selection, currentValue);
    const newContent = toggleFlags(textToAdd, oldContent, selection);
    // newObject.sections[selection.section].content = newContent;

    // setInputFormState(() => {
    //   return newObject;
    // });
    updateTextArea(selection, newContent);
  }

  function AddToTextarea(e, textToAdd) {
    console.log(selection);
    const sectionIndex = getSectionIndexFromId(e);
    const sectionIsMatch = sectionIndex === selection.section;
    const selectionNotEmpty = selection.start !== selection.end;
    // if (sectionIsMatch && selectionNotEmpty) {
    if (sectionIsMatch) {
      insertTextArea(selection, textToAdd);
      return;
    }
    appendTextArea(sectionIndex, textToAdd);
  }

  function onHover(e) {
    const sectionNumber = getSectionIndexFromId(e);
    selection.start = document.getElementById(
      sectionNumber + "-InputField"
    ).selectionStart;
    selection.end = document.getElementById(
      sectionNumber + "-InputField"
    ).selectionEnd;
    selection.section = sectionNumber;
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
            AddToTextarea={AddToTextarea}
            onHover={onHover}
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
