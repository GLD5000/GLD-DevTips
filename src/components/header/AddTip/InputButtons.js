import InputTitle from "./InputTitle";
import InputSelect from "./InputSelect";


export default function InputButtons({index, type, changeValue, title}) {
  return (
    <div className="input-buttons">
                              <label>Section Type:</label>

          <InputSelect
            key={index + "InputSelect"}
            type={type}
            index={index}
            name={index}
            changeType={changeValue}
            defaultValue={type}
          />
                      <label>Section Title:</label>

        <InputTitle
            key={index + "InputTitle"}
            placeholder="Add Title (optional)"
            index={index}
            name={index}
            onInput={changeValue}
            defaultValue={title}
        />
    </div>
  )
}
