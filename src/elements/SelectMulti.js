import InputText from "./InputText";
import { useState, useEffect } from "react";
import TagSet from "../components/header/TagSet";
let keyMod = 0
export default function SelectMulti({
  tagListAll,
  inputFormState,
  addFieldToInputFormState,
}) {
function initNewInputTagState(){
  const newObject = {};
  tagListAll.sort().forEach((tag) => {
   newObject[tag] = "visible";
  });
  inputFormState.tags.forEach((tag) => {
   newObject[tag] = "active";
  });
  return newObject;
}

  const [newInputTagState, setNewInputTagState] = useState(initNewInputTagState());
  
  const inputFormStateTags = inputFormState?.tags || null;
  const inputFormStateTagsString = inputFormStateTags?.join(", ") || null;
  const [customTags, setCustomTags] = useState(
     () =>  []
    // () => inputFormState?.tags || []
    );
  function selectedTagReducer(acc, entry){
    if (entry[1] === "active") acc.push(entry[0]);
    return acc;
  }
  function getSelectedTagArray(newInputTagState){
    if (newInputTagState == null) return [];
    
    return Object.entries(newInputTagState).reduce(selectedTagReducer, []);
  }

  function updateCustomTags(e) {
    const selectedTags = getSelectedTagArray(newInputTagState);
    const text = e;
    const tags = text.split(/[,\s]+/).filter((tag) => tag.length > 0);
    const uniqueTags = getUniqueTags(selectedTags, tags);
    setCustomTags(() => {
      return uniqueTags;
    });
    addFieldToInputFormState("tags", uniqueTags);
  }

  function getUniqueTags(arrayA, arrayB){
    return [...new Set([...arrayA, ...arrayB])];

  }

  // useEffect(()=> {
  //   const selectedTags = getSelectedTagArray(newInputTagState);
  //   const uniqueTags = [...new Set([...selectedTags, ...customTags.filter(tag => newInputTagState[tag] !== "visible")])];
  //   setCustomTags(() => {
  //     return [...uniqueTags]; 
  //   });
  //   keyMod +=1;
  //   addFieldToInputFormState("tags", uniqueTags)
  // },[newInputTagState] );

  // useEffect(() => {    keyMod +=1;
  // }, [inputFormState])
  
  return (
    <>
      <TagSet key={keyMod + "a"} title={"Choose Tags"} tagState={newInputTagState} setTagState={setNewInputTagState} keyMod={keyMod} />

      <label className="label-box">
        Add new tags as a List (separated by spaces or commas)
        <InputText
          key={keyMod + "b"}
          placeholder="E.G.: JavaScript, Fundamentals"
          onInput={updateCustomTags}
          defaultValue={inputFormStateTagsString}
        />
      </label>
    </>
  );
}
