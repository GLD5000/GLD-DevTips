import { useState } from "react"
import MultiInput from "./MultiInput"
function parseNewTip(){
  //add title to state
  //Parse new tip from state
  const modelObject =     {
    id: "", //string
    date: "4th Feb 2022",// string
    tags: ["JavaScript", "How-To"],// array of strings
    title: "Crockford Objects",// string
    sections: [ // array of objects
      {
        title: "",//string
        type: "",//string
        content: "",//string
      },
    ],
  };
  console.log(modelObject)

}

const AddForm = ({setTip}) => {
  const [inputState, setInputState] = useState(() => { return {0:
    { type: "text", content: null },
  }});
  return (
    <div className="add-form">
          <div className="form-control">
            <label>Title</label>
            <input className="titleInput" type="text" placeholder="Add Title" />
          </div>
          < MultiInput inputState={inputState} setInputState={setInputState} />
        </div>
  )
}
parseNewTip();
export default AddForm