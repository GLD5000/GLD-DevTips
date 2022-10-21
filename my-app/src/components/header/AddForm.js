import { useState } from "react"
import InputText from "../../elements/InputText"
import MultiInput from "./MultiInput"

const AddForm = ({setTip}) => {
  return (
    <div className="add-form">
          <div className="form-control">
            <label>Title</label>
            <input type="text" placeholder="Add Title" />
          </div>
          < MultiInput />
        </div>
  )
}

export default AddForm