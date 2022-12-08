import InputTitle from "./InputTitle";
import InputSelect from "./InputSelect";
import SvgButton from "../../../elements/SvgButton";

function getReturnArray(type, index, appendIndexedField) {
  if (type !== "text") return null;
  const buttonArray = [
    {
      type: "header",
      text: "Header",
      function: (e) => {
        appendIndexedField(e, "\r\n##Header");
      },
    },
    {
      type: "bold",
      text: "Bold",
      function: (e) => {
        appendIndexedField(e, " **Bold**");
      },
    },
    {
      type: "italic",
      text: "Italic",
      function: (e) => {
        appendIndexedField(e, " _Italic_");
      },
    },
    {
      type: "quote",
      text: "Quote",
      function: (e) => {
        appendIndexedField(e, "\r\n>Block Quote");
      },
    },
    {
      type: "code",
      text: "Code",
      function: (e) => {
        appendIndexedField(e, "\r\n```Code\r\n\r\n  \r\n\r\n\r\n```\r\n");
      },
    },
    {
      type: "link",
      text: "Link",
      function: (e) => {
        appendIndexedField(e, " [Link](www.examplelink.com)");
      },
    },

    {
      type: "bullet",
      text: "Bullet Point",
      function: (e) => {
        appendIndexedField(e, "\r\n - Bullet Point");
      },
    },
    {
      type: "numbered",
      text: "Numbered List",
      function: (e) => {
        appendIndexedField(e, "\r\n n. Numbered List");
      },
    },
    {
      type: "table",
      text: "Table",
      function: (e) => {
        appendIndexedField(e, "\r\n|||\r\nHeaderA,HeaderB\r\nRow1a,Row1b\r\n|||\r\n"); 
      },
    },

  ];

  return (
    <div className="markdown-buttons">
      {buttonArray.map((btn) => (
        <SvgButton
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
          showText={false}
        />
      ))}
    </div>
  );
}

export default function InputButtons({
  index,
  type,
  changeValue,
  title,
  appendIndexedField,
}) {
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
          placeholder=" Add Title (optional)"
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
