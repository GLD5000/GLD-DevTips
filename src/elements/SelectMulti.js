import InputText from "./InputText";
import { useState } from "react";
import TagSet from "../components/header/TagSet";

export default function SelectMulti({
  tagListAll,
  inputFormState,
  addFieldToInputFormState,
}) {
  const [newInputTagState, setNewInputTagState] = useState(() => {
   const newObject = {};
   tagListAll.sort().forEach((tag) => {
    newObject[tag] = "visible";
   });
   return newObject;
  });
    
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
    const tags = text.split(/[,\s]+/).filter((tag) => tag.length > 0);

    tags.forEach(tag => {
      setNewInputTagState((state) => {state[tag] ="active";
    return state;
    });
    });

    setCustomTags(() => {
      return tags;
    });
    addFieldToInputFormState("tags", [...selectedTags, ...tags]);
  }


  return (
    <>
      <TagSet title={"Choose Tags"} tagState={newInputTagState} setTagState={setNewInputTagState} />

      <label className="label-box">
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
