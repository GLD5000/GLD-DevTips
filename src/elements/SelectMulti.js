import InputText from "./InputText";
import { useState, useEffect } from "react";
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
  const [customTags, setCustomTags] = useState(
    () => inputFormState?.tags || []
  );
  function selectedTagReducer(acc, entry){
    if (entry[1] === "active") acc.push(entry[0]);
    return acc;
  }
  function getSelectedTagArray(newInputTagState){
    if (newInputTagState == null) return [];
    console.group(`newInputTagState`);
    console.log(newInputTagState);
    console.groupEnd();
    
    return Object.entries(newInputTagState).reduce(selectedTagReducer, []);
  }

  function updateCustomTags(e) {
    const selectedTags = getSelectedTagArray(newInputTagState);
    const text = e;
    const tags = text.split(/[,\s]+/).filter((tag) => tag.length > 0);

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
