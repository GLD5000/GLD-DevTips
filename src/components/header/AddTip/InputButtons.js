import InputTitle from "./InputTitle";
import InputSelect from "./InputSelect";
import SvgButton from "../../../elements/SvgButton";

function getReturnArray(type, index, appendIndexedField) {
  if (type !== "text") return null;
 const buttonArray = [
  {type: "bold", text: "Bold", function: (e)=> {appendIndexedField(e, " **Bold Text**")} },
  {type: "italic", text: "Italic", function: (e)=> {appendIndexedField(e, " _Italic Text_")} },
  {type: "italic", text: "Link", function: (e)=> {appendIndexedField(e, " [Link Text](www.examplelink.com)")} },
  {type: "italic", text: "Header 1", function: (e)=> {appendIndexedField(e, "\n\r#Header 1")} },
  {type: "italic", text: "Header 2", function: (e)=> {appendIndexedField(e, "\n\r##Header 2")} },
  {type: "italic", text: "Quote", function: (e)=> {appendIndexedField(e, "\n\r>Block Quote Text")} },
  {type: "italic", text: "Bullet Point", function: (e)=> {appendIndexedField(e, "\n\r - Bullet Point Text")} },
  {type: "italic", text: "Numbered List", function: (e)=> {appendIndexedField(e, "\n\r n. Numbered List Text")} },
  {type: "italic", text: "Code", function: (e)=> {appendIndexedField(e, "\n\r```\n\r Code \n\r```\n\r")} },
 ];

 return <div className="markdown-buttons">
  
 {buttonArray.map(btn => <SvgButton
  wide="false"
  type={btn.type}
  color="whitesmoke"
  backgroundColor="transparent"
  id={index + "-" + btn.text}
  key={btn.text}
  name={btn.text}
  text={btn.text}
  clickFunction={btn.function}
  marginLeft="0"
/>
)}
</div>
}

export default function InputButtons({ index, type, changeValue, title, appendIndexedField }) {
  const extraButtons = getReturnArray(type, index, appendIndexedField);
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
      {extraButtons}
    </div>
  );
}
