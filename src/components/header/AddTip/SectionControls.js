import SvgButton from "../../../elements/SvgButton";
import { useEffect } from "react";
import { useInputFormContext } from "../../../contexts/Providers/InputFormProvider";
export default function SectionControls({ index }) {
  const {
    dispatchInputForm,
    inputForm: {
      data: { sections },
    },
    inputForm: {
      metadata: { focusId },
    },
  } = useInputFormContext();
  useEffect(()=>{
    let isMounted = true;
    if (isMounted && focusId > -1){
      const inputElement = document.getElementById(
        focusId + "-SectionField"
      );
      inputElement.focus();
    }

    return ()=> {isMounted = false;}

  },[focusId]);

  return (
    <div className="h-min w-full flex flex-wrap gap-2">
      <SvgButton
        buttonClasses="w-auto h-auto grid grid-cols-frAutoFr flex-grow flex-shrink"        
        type="up"
        key={index + "moveFieldUp"}
        text="Up"
        clickFunction={moveFieldUp}
        id={index + "-moveFieldUp"}
      />
      <SvgButton
        buttonClasses="w-auto h-auto grid grid-cols-frAutoFr flex-grow flex-shrink"        
        type="down"
        key={index + "moveFieldDown"}
        backgroundColor="bg-transparent"
        text="Down"
        clickFunction={moveFieldDown}
        id={index + "-moveFieldDown"}
      />

      <SvgButton
              buttonClasses="w-auto h-auto grid grid-cols-frAutoFr flex-grow flex-shrink"        

        type="duplicate"
        key={index + "duplicateField"}
        text="Copy"
        clickFunction={duplicateField}
        id={index + "-duplicatefield"}
        svgClasses="stroke-1 stroke-whitesmoke fill-black"
      />
      <SvgButton
              buttonClasses="w-auto h-auto grid grid-cols-frAutoFr flex-grow flex-shrink"        

        type="add"
        key="addField"
        text="Add"
        clickFunction={addField}
        id={index + "-addField"}
      />
     {index > 0 && <SvgButton
             buttonClasses="w-auto h-auto grid grid-cols-frAutoFr flex-grow flex-shrink"        

        type="delete"
        key={index + "deleteIndexedField"}
        text="Delete"
        clickFunction={deleteIndexedField}
        id={index + "-deleteIndexedField"}
      />}
    </div>
  );

  function moveFieldUp(e) {
    const index = getSectionIndexFromId(e);
    const newSections = swapArrayPositions(sections, index, "up");
    if (newSections !== null){
      dispatchInputForm({
        type: "REPLACE_FIELD",
        payload: { field: "sections", value: newSections, focusId: index - 1},
      });
    }
  }
  function moveFieldDown(e) {
    const index = getSectionIndexFromId(e);
    const duplicateSections = sections.map((x) => {
      return { ...x };
    });
    const newSections = swapArrayPositions(duplicateSections, index, "down");
    if (newSections !== null){
      dispatchInputForm({
        type: "REPLACE_FIELD",
        payload: { field: "sections", value: newSections, focusId: index + 1},
      });
    }
  }
  function getSectionIndexFromId(e) {
    return parseInt(e.target.id.split("-")[0]);
  }
  function deleteIndexedField(e) {
    const index = getSectionIndexFromId(e);
    const newSections = sections.filter((_, i) => index !== i);
    dispatchInputForm({
      type: "REPLACE_FIELD",
      payload: { field: "sections", value: newSections, focusId:-1 },
    });
  }

  function duplicateField(e) {
    console.log(`sections.length + 1 ${sections.length + 1}`);
    const index = getSectionIndexFromId(e);
    const duplicateObject = { ...sections[index] };
    duplicateObject.title =
      sections[index].title === undefined
        ? `Copy of section ${index + 1}`
        : `${sections[index].title} (copy)`;
    dispatchInputForm({
      type: "REPLACE_FIELD",
      payload: { field: "sections", value: [...sections, duplicateObject], focusId: sections.length },
    });
  }

  function swapArrayPositions(array, index, direction = "up") {
    const indexModifier = direction === "down" ? 1 : -1;
    const secondIndex = index + indexModifier;
    const indexLimit = array.length - 1;
    if (secondIndex > indexLimit || secondIndex < 0) return null;
    [array[index], array[secondIndex]] = [array[secondIndex], array[index]];
    return array;
  }

  function addField() {
    dispatchInputForm({ type: "ADD_SECTION" });
  }
}
