import { useState } from "react";
import MultiInput from "./MultiInput";

const AddForm = ({ setTip, newTipId }) => {
  const [inputState, setInputState] = useState(() => {
    return { 0: { type: "text", content: null } };
  });
  console.log(newTipId);
  function parseNewTip() {
    //add title to state
    //Parse new tip from state
    const dateRaw = new Date();
    const formattedDate = `${dateRaw.getDate()}/${dateRaw.getMonth()}/${dateRaw.getFullYear()}`;
    const modelObject = {
      id: newTipId, //string
      date: formattedDate, // string
      tags: ["JavaScript", "How-To"], // array of strings
      title: "Crockford Objects", // string
      sections: [
        // array of objects
        {
          title: "", //string
          type: "", //string
          content: "", //string
        },
      ],
    };
    console.log(newTipId);
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
