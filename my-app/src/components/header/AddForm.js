import { useState } from "react"
import MultiInput from "./MultiInput"
import markdownParser from "../../utilities/markdownParser";

const AddForm = ({setTip}) => {
  const [inputState, setInputState] = useState(() => { return {0:
    { type: "text", content: null },
  }});
  function parseNewTip(){
    //add title to state
    //Parse new tip from state
  }
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
markdownParser();
export default AddForm