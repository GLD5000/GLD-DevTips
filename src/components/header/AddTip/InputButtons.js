import InputTitle from "./InputTitle";
import InputSelect from "./InputSelect";
import SvgButton from "../../../elements/SvgButton";

function getReturnArray(type) {
  if (type !== "text") return null;
 const buttonArray = [
  {type: "bold", text: "Bold", function: (e)=>console.log("clicked " + e.target.name)},
  {type: "italic", text: "Italic", function: (e)=>console.log("clicked " + e.target.name)},
  {type: "italic", text: "Link", function: (e)=>console.log("clicked " + e.target.name)},
  {type: "italic", text: "Header", function: (e)=>console.log("clicked " + e.target.name)},
  {type: "italic", text: "Quote", function: (e)=>console.log("clicked " + e.target.name)},
 ];

 return <div className="markdown-buttons">
  
 {buttonArray.map(btn => <SvgButton
  wide="false"
  type={btn.type}
  color="whitesmoke"
  backgroundColor="transparent"
  key={btn.text}
  name={btn.text}
  text={btn.text}
  clickFunction={btn.function}
  marginLeft="0"
/>
)}
</div>
}

export default function InputButtons({ index, type, changeValue, title }) {
  const extraButtons = getReturnArray(type);
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
