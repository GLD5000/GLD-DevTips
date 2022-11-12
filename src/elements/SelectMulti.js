import InputText from "./InputText";
import { useState } from "react";

export default function SelectMulti({tagListAll, setTagsState}) {
  const [selectedTags, setSelectedTags] = useState(() => []);
  const [customTags, setCustomTags] = useState(() => []);

  function updateSelectedTags(e) {
    const collection = e.target.selectedOptions;
    const tags = Object.values(collection).map((x) => x.value);
    setSelectedTags(() => {
      const newObject = [...tags];
      return newObject;
    })
    setTagsState(() => {
      const newObject = [...tags, ...customTags];
      return newObject;
    })

  }

  function updateCustomTags(e) {
    const text = e;
    const tags = text.split(/[,\s]+/);
    setCustomTags(() => {
      const newObject = [...tags];
      return newObject;
    })
    setTagsState(() => {
      const newObject = [...selectedTags, ...tags];
      return newObject;
    })
  }

  function makeOptionsArray() {
    return tagListAll.map((option, index) => 
       <option key={index} value={option}>{option}</option>
      );
    }
    const optionsArray = makeOptionsArray();

  return (
    <>
    <h2>Add Tags</h2>
    <label>
      Click to choose existing tags
      <select name="selectedTags" id="selectedTags" multiple onInput={updateSelectedTags}> 
          {optionsArray}
      </select>
    </label>
    <label>
      Add new tags as a List (separated by spaces or commas)
      <InputText placeholder="E.G.: JavaScript, Fundamentals" onInput={updateCustomTags}/>
    </label>
    </>
  )
}
