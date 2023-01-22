import SvgButton from "../../../elements/SvgButton"
import {useInputFormContext} from "../../../contexts/Providers/InputFormProvider";
export default function SectionButtons({index}) {
  const {dispatchInputForm, inputForm: {data:{sections}}} = useInputFormContext();
  return (
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
      backgroundColor="bg-transparent"
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
      svgClasses="stroke-1 stroke-whitesmoke fill-black"
    />
    <SvgButton
      type="delete"
      key={index + "deleteIndexedField"}
      text="Delete"
      clickFunction={deleteIndexedField}
      id={index + "-deleteIndexedField"}
    />
  </div>
)

function moveFieldUp(e) {
  
  const index = getSectionIndexFromId(e);
  const newSections = swapArrayPositions(sections, index, "up");
  dispatchInputForm({type: "REPLACE_FIELD", payload: {field: "sections", value: newSections}});
  
}
function moveFieldDown(e) {
  
  const index = getSectionIndexFromId(e);
  const duplicateSections = sections.map(x => {return{...x}});
  const newSections = swapArrayPositions(duplicateSections, index, "down");

  dispatchInputForm({type: "REPLACE_FIELD", payload: {field: "sections", value: newSections}});
}
function getSectionIndexFromId(e) {
  return parseInt(e.target.id.split("-")[0]);
}
function deleteIndexedField(e) {
  
  const index = getSectionIndexFromId(e);
  const newSections = sections.filter((_, i) => index !== i);
  dispatchInputForm({type: "REPLACE_FIELD", payload: {field: "sections", value: newSections}});
}

function duplicateField(e) {
  
  const index = getSectionIndexFromId(e);
    const duplicateObject = { ...sections[index] };
    duplicateObject.title =
    sections[index].title === undefined
    ? `Copy of section ${index + 1}`
    : `${sections[index].title} (copy)`;
    dispatchInputForm({type: "REPLACE_FIELD", payload: {field: "sections", value: [...sections, duplicateObject]}});
  }
  
  
  
  function swapArrayPositions(array, index, direction = "up") {
    const indexModifier = direction === "down" ? 1 : -1;
    const secondIndex = index + indexModifier;
    const indexLimit = array.length - 1;
    if (secondIndex > indexLimit || secondIndex < 0) return array;
    [array[index], array[secondIndex]] = [array[secondIndex], array[index]];
    return array;
  }
}
