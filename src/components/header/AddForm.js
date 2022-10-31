import { useState } from "react";
import MultiInput from "./MultiInput";
import SelectMulti from "../../elements/SelectMulti";

const AddForm = ({ setTip, newTipId, tagListAll }) => {

  const [inputState, setInputState] = useState(() => {
    return { 0: { type: "text", content: null } };
  });
  const [tagsState, setTagsState] = useState(() => []);


  function setTags(e){
    const collection = e.target.selectedOptions;
    const tags = Object.values(collection).map(x => x.value);
    setTagsState(object => {
      const newObject = [...tags]
    return newObject
    });
  }
  console.log(tagsState);


  function parseNewTip() {
    //add title to state
    //Parse new tip from state
    const dateRaw = new Date();
    const formattedDate = `${dateRaw.getDate()}/${dateRaw.getMonth()}/${dateRaw.getFullYear()}`;
    const modelObject = {
      id: newTipId, //string
      date: formattedDate, // string
      tags: ["JavaScript", "How-To"], // array of strings
      title: "title", // string
      sections: Object.values(inputState)
      ,
    };
    console.log(Object.values(inputState));
    console.log(modelObject);
  }

  return (
    <div className="add-form">
      <div className="form-control">
        <h2>Main Title</h2>
        <input
          autoFocus
          className="titleInput"
          type="text"
          placeholder="Add a title or topic for your tip..."
        />
        <SelectMulti tagListAll={tagListAll} setTags={setTags}/>
      </div>
      <MultiInput
        inputState={inputState}
        setInputState={setInputState}
        onSubmit={onSubmit}
      />
    </div>
  );

  function onSubmit() {
    parseNewTip();
  }
};
export default AddForm;
