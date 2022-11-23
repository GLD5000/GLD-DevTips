import InputText from "./InputText";
import { useState } from "react";

export default function SelectMulti({
  tagListAll,
  inputFormState,
  addFieldToInputFormState
}) {
  const inputFormStateTags = inputFormState?.tags || null;
  const inputFormStateTagsString = inputFormStateTags?.join(", ") || null;
  const [selectedTags, setSelectedTags] = useState(() => []);
  const [customTags, setCustomTags] = useState(
    () => inputFormState?.tags || []
  );
  function updateSelectedTags(e) {
    const collection = e.target.selectedOptions;
    const tags = Object.values(collection).map((x) => x.value);
    setSelectedTags(() => {
      const newObject = [...tags];
      return newObject;
    });
    addFieldToInputFormState("tags", [...tags, ...customTags]);
  }

  function updateCustomTags(e) {
    const text = e;
    const tags = text.split(/[,\s]+/).filter(tag => tag.length > 0);
    setCustomTags(() => {
      return tags;
    });
    addFieldToInputFormState("tags", [...selectedTags, ...tags]);
  }

  function makeOptionsArray() {
    return tagListAll.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ));
  }
  const optionsArray = makeOptionsArray();

  return (
    <>
      <h2>Add Tags</h2>
      <label>
        Click to choose existing tags
        <select
          name="selectedTags"
          id="selectedTags"
          multiple
          onInput={updateSelectedTags}
        >
          {optionsArray}
        </select>
      </label>
      <label>
        Add new tags as a List (separated by spaces or commas)
        <InputText
          placeholder="E.G.: JavaScript, Fundamentals"
          onInput={updateCustomTags}
          defaultValue={inputFormStateTagsString}
        />
      </label>
    </>
  );
}
