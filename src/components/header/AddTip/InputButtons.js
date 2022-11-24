import InputTitle from "./InputTitle";
import InputSelect from "./InputSelect";
import Button from "../../../elements/Button";

export default function InputButtons({ index, type, changeValue, title }) {
  return (
    <div className="input-buttons">
      <label className="label-box">
        Section Type:
        <InputSelect
          key={index + "InputSelect"}
          type={type}
          index={index}
          name={index}
          changeType={changeValue}
          defaultValue={type}
        />
      </label>
      <label className="label-box">
        Section Title:
        <InputTitle
          key={index + "InputTitle"}
          placeholder="Add Title (optional)"
          index={index}
          name={index}
          onInput={changeValue}
          defaultValue={title}
        />
      </label>
    </div>
  );
}
