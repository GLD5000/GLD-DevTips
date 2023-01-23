import SectionTitle from "./SectionTitle";
import InputSelect from "./InputSelect";

export default function SectionOptions({
  index,
  type,
  changeValue,
  title,
}) {
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
          value={type}
        />
      </label>
      <label className="label-box">
        Section Title:
        <SectionTitle
          key={index + "SectionTitle"}
          placeholder=" Add Title (optional)"
          index={index}
          name={index}
          onInput={changeValue}
          value={title}
        />
      </label>
    </div>
  );
}
