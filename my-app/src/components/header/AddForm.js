import { useState } from "react"
import MultiInput from "./MultiInput"

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

export default AddForm