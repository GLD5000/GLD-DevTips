import InputField from "./InputField";
import InputButtons from "./InputButtons";
import SvgButton from "../../../elements/SvgButton";
import SaveButtons from "./SaveButtons";
import { useInputFormContext } from "../../../contexts/Providers/InputFormProvider";
import SectionButtons from "./SectionButtons";
const selection = {};
export default function MultiInput () {
  const {
    inputForm: { data: {sections} },
    inputForm:{metadata: keyIncrementer},
    dispatchInputForm,
  } = useInputFormContext();


  function getSectionIndexFromId(e) {
    return parseInt(e.target.id.split("-")[0]);
  }

  function addField() {
    dispatchInputForm({type: "ADD_SECTION"});
  }
  function addTextareaToState(index, newContent) {
    dispatchInputForm({type: "REPLACE_SECTION_DATA_FIELD", field: "content", index: index, value: newContent});
  }
  function updateTextArea({ index, start, end }, content) {
    const inputElement = document.getElementById(index + "-InputField");
    inputElement.select();
    inputElement.setRangeText(content);
    inputElement.selectionStart = start;
    inputElement.selectionEnd = end;
    inputElement.focus();
  }
  function removeFlags(oldContent, textToAdd, index){
    const preSelection = oldContent[0].slice(0, index);
    const selectedText = oldContent[1] === textToAdd[1] ? "" : oldContent[1];
    const postSelection = oldContent[2].slice(textToAdd[2].length);
    selection.start = index;
    selection.end = selection.start + selectedText.length;

    return [preSelection, selectedText, postSelection].join("");
  }
  function addFlags(oldContent, textToAdd){
    const preSelection = oldContent[0] + textToAdd[0];
    const selectedText = oldContent[1] === "" ? textToAdd[1] : oldContent[1];
    const postSelection = textToAdd[2] + oldContent[2];
    selection.start = preSelection.length;
    selection.end = selection.start + selectedText.length;
    return [preSelection, selectedText, postSelection].join("");
  }

  function addHash(oldContent, textToAdd){
    const preSelection = oldContent[0] + "#";
    const selectedText = oldContent[1] === "" ? textToAdd[1] : oldContent[1];
    const postSelection = oldContent[2];
    selection.start = preSelection.length;
    selection.end = selection.start + selectedText.length;

    return [preSelection, selectedText, postSelection].join("");
}
  function findFlagIndex(string, flag){
    const index = string.lastIndexOf(flag);
    const flagIsPresent =
      index > -1 &&
      index === string.length - flag.length;
    return [flagIsPresent, index];

  }

  function toggleHeaderFlags(textToAdd, oldContent, selection) {
    const notAtStart = selection.start > 4;
    const finalFlag = notAtStart? "\n####": "####";

    const [finalFlagIsPresent, indexOfFinalFlag] =  findFlagIndex(oldContent[0], finalFlag);

    if (finalFlagIsPresent) {
      return removeFlags(oldContent, textToAdd, indexOfFinalFlag);
    }
      

    const shortFlag = "##";
    let indexOfFirstFlag = oldContent[0].lastIndexOf(textToAdd[0]);
    const indexOfShortFlag = oldContent[0].lastIndexOf(shortFlag);
    if (indexOfFirstFlag === -1 && indexOfShortFlag > -1) {
      indexOfFirstFlag = indexOfShortFlag;
      textToAdd[0] = shortFlag; 



    }
    const shouldRemoveLineBreak = selection.start === 0 || indexOfFirstFlag === 0 || oldContent[0][oldContent[0].length-1] === "\n";
    if (shouldRemoveLineBreak) textToAdd[0] = shortFlag; 
    const firstFlagIsPresent = finalFlagIsPresent === false &&
    indexOfFirstFlag > -1 &&
    indexOfFirstFlag === oldContent[0].length - textToAdd[0].length;
    
    const intermediateFlag = "###";
    const indexOfIntermediateFlag = oldContent[0].lastIndexOf(intermediateFlag);
    const intermediateFlagIsPresent = finalFlagIsPresent === false &&
      indexOfIntermediateFlag > -1 &&
      indexOfIntermediateFlag ===
        oldContent[0].length - intermediateFlag.length;



    if (firstFlagIsPresent || intermediateFlagIsPresent ) {
      return addHash(oldContent, textToAdd);
    }
    if (textToAdd[0].length < 3 && selection.start !== 0 && oldContent[0][oldContent[0].length-1] !== "\n") textToAdd[0] = "\n" + textToAdd[0]
      return addFlags(oldContent, textToAdd);
    }


  function toggleLinkFlags(textToAdd, oldContent, selection) {

    // could have selection or not
    // [text](url)
    // [title](title=title)
    // [tag1 tag2](tags=tag1,tag2)

    const indexOfFirstFlag = oldContent[0].lastIndexOf(textToAdd[0]);
    const firstFlagIsPresent =
    indexOfFirstFlag > -1 &&  indexOfFirstFlag === oldContent[0].length - textToAdd[0].length;
    const SecondFlagIsPresent =
      oldContent[2].indexOf(textToAdd[2]) === 0 || textToAdd[2].length === 0;

    if (firstFlagIsPresent && SecondFlagIsPresent) {
      return removeFlags(oldContent, textToAdd, indexOfFirstFlag);
    }
    return addFlags(oldContent, textToAdd);
  }
  function toggleFlags(textToAdd, oldContent, selection) {
    if (textToAdd[1] === "Header") {
      return toggleHeaderFlags(textToAdd, oldContent, selection);
    }
    
    if (textToAdd[1] === "Link Name") {
      return toggleLinkFlags(textToAdd, oldContent, selection);
    }

    const indexOfFirstFlag = oldContent[0].lastIndexOf(textToAdd[0]);
    const firstFlagIsPresent =
    indexOfFirstFlag > -1 &&  indexOfFirstFlag === oldContent[0].length - textToAdd[0].length;
    const SecondFlagIsPresent =
      oldContent[2].indexOf(textToAdd[2]) === 0 || textToAdd[2].length === 0;

    if (firstFlagIsPresent && SecondFlagIsPresent) {
      return removeFlags(oldContent, textToAdd, indexOfFirstFlag);
    }
    return addFlags(oldContent, textToAdd);
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
    // setInputFormState((object) => {
    //   const newObject = { ...object };
    //   const targetSection = newObject.sections[index];
    //   const type = inputObject.type || targetSection["type"];
    //   const content = inputObject.content || targetSection["content"];
    //   newObject.sections[index] = {
    //     type: type,
    //     content: content,
    //   };
    //   const title = inputObject.title || targetSection["title"];
    //   if (title !== undefined) newObject.sections[index].title = title;
    //   return newObject;
    // });
    //updateSelection(index);
  }
  function makeInputArray() {
    return sections.map((object, index) => {
      const returnObject = (
        <div key={keyIncrementer + "a" + index} className="field-container">
          <h2>Section {index + 1}</h2>
          <InputButtons
            key={keyIncrementer + "a" + index + "InputButtons"}
            type={object.type}
            index={index}
            changeValue={dispatchInputForm}
            title={object.title}
            AddToTextarea={AddToTextarea}
          />
          <InputField
            key={keyIncrementer + "a" + index + "InputField"}
            id={index + "-InputField"}
            name={index}
            type={object.type}
            value={object.content}
            changeText={dispatchInputForm}
          />
          <SectionButtons index={index}/>
        </div>
      );
      return returnObject;
    });
  }
  const inputArray = makeInputArray();

  return (
    <>
      <h2>Add sections</h2>
      {inputArray}
      <SvgButton
        type="add"
        key="addField"
        color="text-black"
        backgroundColor="bg-dodgerBlue"
        text="Add Section"
        clickFunction={addField}
        id="add-field"
        svgClasses="stroke-1 stroke-current fill-none"
        activeClasses="active:bg-slate-400"
      />

      <SaveButtons/>
    </>
  );
};

