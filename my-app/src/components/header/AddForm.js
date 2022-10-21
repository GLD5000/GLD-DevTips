import InputText from "../../elements/InputText"
import MultiInput from "./MultiInput"

const AddForm = ({setTip}) => {
  return (
    <form className="add-form">
          <div className="form-control">
            <label>Title</label>
            <input type="text" placeholder="Add Title" />
          </div>
          <MultiInput/>
          <div className="form-control">
            <label>Title</label>
            <input type="text" placeholder="Add Title" />
          </div>
        </form>
  )
}

export default AddForm