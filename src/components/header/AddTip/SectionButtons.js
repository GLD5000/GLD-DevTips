import SvgButton from "../../../elements/SvgButton"
let keyInc = 0;

export default function SectionButtons({index}) {
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
}

  function moveFieldUp(e) {
    incrementKeys();
    // const index = getSectionIndexFromId(e);
    // const newObject = deepCloneInputFormState();
    // const newSections = swapArrayPositions(newObject.sections, index, "up");

  }
  function moveFieldDown(e) {
    incrementKeys();
    // const index = getSectionIndexFromId(e);
    // const newObject = deepCloneInputFormState();
    // const newSections = swapArrayPositions(newObject.sections, index, "down");
  }
  function getSectionIndexFromId(e) {
    return parseInt(e.target.id.split("-")[0]);
  }
  function deleteIndexedField(e) {
    incrementKeys();
    // const index = getSectionIndexFromId(e);
    // const newObject = deepCloneInputFormState();
    // const newSections = newObject.sections.filter((_, i) => index !== i);

  }

  function duplicateField(e) {
    incrementKeys();
    const index = getSectionIndexFromId(e);
    // const newObject = deepCloneInputFormState();
    // const duplicateObject = { ...newObject.sections[index] };
    // newObject.sections[index].title =
    //   newObject.sections[index].title === undefined
    //     ? `Copy of section ${index + 1}`
    //     : `${newObject.sections[index].title} (copy)`;
    // newObject.sections.splice(index, 0, duplicateObject);

  }


  function incrementKeys() {
    keyInc += 1;
  }

  function swapArrayPositions(array, index, direction = "up") {
    const indexModifier = direction === "down" ? 1 : -1;
    const secondIndex = index + indexModifier;
    const indexLimit = array.length - 1;
    if (secondIndex > indexLimit || secondIndex < 0) return array;
    [array[index], array[secondIndex]] = [array[secondIndex], array[index]];
    return array;
  }
