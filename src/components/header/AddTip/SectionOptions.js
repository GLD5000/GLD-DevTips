import SectionTitle from './SectionTitle';
import InputSelect from './InputSelect';

export default function SectionOptions({ index, type, changeValue, title }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <label className="grid">
        Section Type:
        <InputSelect
          key={`${index}InputSelect`}
          type={type}
          index={index}
          name={index}
          changeType={changeValue}
          value={type}
        />
      </label>
      <label className="grid">
        Section Title:
        <SectionTitle
          key={`${index}SectionTitle`}
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
