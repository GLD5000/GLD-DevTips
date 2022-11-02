import { useState } from "react";
import MultiInput from "./MultiInput";
import SelectMulti from "../../../elements/SelectMulti";
import MainTitle from "./MainTitle";

const InputForm = ({ setTip, newTipId, tagListAll }) => {

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


  function parseNewTip() {
    //add title to state
    //Parse new tip from state
    const dateRaw = new Date();
    const formattedDate = `${dateRaw.getDate()}/${dateRaw.getMonth()}/${dateRaw.getFullYear()}`;
    const modelObject = {
      id: newTipId, //string
      date: formattedDate, // string
      tags: tagsState, // array of strings
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
        <label htmlFor={newTipId + "MainTitle"}>
          <h2>Main Title</h2>
        </label>name={newTipId + "MainTitle"}
        <MainTitle name={newTipId + "MainTitle"} id={newTipId + "MainTitle"}/>
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
export default InputForm;
