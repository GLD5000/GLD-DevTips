import InputText from "./InputText";
import { useState } from "react";
import TagSet from "../components/header/TagSet";
let keyMod = 0;
export default function SelectMulti({
  tagListAll,
  inputFormState,
  addFieldToInputFormState,
}) {
  function initNewInputTagState(tagListAll) {
    const newObject = {};
    tagListAll.sort().forEach((tag) => {
      newObject[tag] = "visible";
    });
    inputFormState.tags.forEach((tag) => {
      newObject[tag] = "active";
    });
    return newObject;
  }

  const [newInputTagState, setNewInputTagState] = useState(
    initNewInputTagState(tagListAll)
  );

  const inputFormStateTags = inputFormState?.tags || null;
  function customTagsStringReducer(acc, value) {
    if (Object.hasOwn(newInputTagState, value)) return acc;

    return acc + value + ", ";
  }
  const inputFormStateTagsString =
    inputFormStateTags?.reduce(customTagsStringReducer, "") || null;
  function selectedTagReducer(acc, entry) {
    if (entry[1] === "active") acc.push(entry[0]);
    return acc;
  }
  function getSelectedTagArray(newInputTagState) {
    if (newInputTagState == null) return [];

    return Object.entries(newInputTagState).reduce(selectedTagReducer, []);
  }

  function updateCustomTags(e) {
    const selectedTags = getSelectedTagArray(newInputTagState);
    const text = e;
    const tags = text.split(/[,\s]+/).filter((tag) => tag.length > 0);
    const uniqueTags = getUniqueTags(selectedTags, tags);
    addFieldToInputFormState("tags", uniqueTags);
  }

  function getUniqueTags(arrayA, arrayB) {
    return [...new Set([...arrayA, ...arrayB])];
  }

  return (
    <>
      <TagSet
        key={keyMod + "a"}
        title={"Choose Tags"}
        tagState={newInputTagState}
        updateTagState={updateTagState}
        setTagState={setNewInputTagState}
        keyMod={keyMod}
      />

      <label className="label-box">
        Add new tags as a List (separated by spaces or commas)
        <InputText
          key={keyMod + "b"}
          placeholder=" E.G.: JavaScript, Fundamentals"
          onInput={updateCustomTags}
          defaultValue={inputFormStateTagsString}
        />
      </label>
    </>
  );

  function updateTagState(tag) {
    const newValue = newInputTagState[tag] === "active" ? "visible" : "active";
    setNewInputTagState((object) => {
      return { ...object, [tag]: newValue };
    });
    if (newValue === "active") {
      addFieldToInputFormState("tags", [...inputFormState.tags, tag]);
    } else {
      addFieldToInputFormState(
        "tags",
        inputFormState.tags.filter((x) => x !== tag)
      );
    }
  }
}
