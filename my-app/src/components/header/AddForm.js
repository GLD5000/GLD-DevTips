import { useState } from "react"
import InputText from "../../elements/InputText"
import MultiInput from "./MultiInput"

const AddForm = ({setTip}) => {
    const [sectionsCounter, setSectionsCounter] = useState(() => 2);
    const sectionsArray = new Array(sectionsCounter).reduce((acc,_,i) => {acc.push(<MultiInput key={i}/>); return acc;}, []);
  return (
    <form className="add-form">
          <div className="form-control">
            <label>Title</label>
            <input type="text" placeholder="Add Title" />
          </div>
          {sectionsArray}
          <div className="form-control">
            <label>Title</label>
            <input type="text" placeholder="Add Title" />
          </div>
        </form>
  )
}

export default AddForm