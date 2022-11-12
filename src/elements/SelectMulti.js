import InputText from "./InputText";
import { useState } from "react";

export default function SelectMulti({tagListAll, setTags}) {
  const [selectedTags, setSelectedTags] = useState(() => []);
  const [customTags, setCustomTags] = useState(() => []);

  function updateSelectedTags(e) {
    const collection = e.target.selectedOptions;
    const tags = Object.values(collection).map((x) => x.value);
    setSelectedTags((object) => {
      const newObject = [...tags];
      return newObject;
    })
  }

  function updateCustomTags(e) {
    console.log(e);
    const text = e;
    const tags = text.split(/[,\s]+/);
    setCustomTags((object) => {
      const newObject = [...tags];
      return newObject;
    })
  }
  console.log(selectedTags);
  console.log(customTags);

  function makeOptionsArray() {
    return tagListAll.map((option, index) => 
       <option key={index} value={option}>{option}</option>
      );
    }
    const optionsArray = makeOptionsArray();

  return (
    <>
    <h2>Add Tags To Your Tip</h2>
    <label htmlFor="tags">Click to choose tags</label>
    <select name="tags" id="tags" multiple onInput={updateSelectedTags}> 
        {optionsArray}
    </select>
    <InputText placeholder="Add your own custom tags here (separated by spaces)..." onInput={updateCustomTags}/>
    </>
  )
}
