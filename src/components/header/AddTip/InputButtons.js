import InputTitle from "./InputTitle";
import InputSelect from "./InputSelect";
import SvgButton from "../../../elements/SvgButton";

function getReturnArray(type, index, appendIndexedField, onHover) {
  if (type === "code") return null;
  const buttonArraySelector = {
    text: ["header","bold","italic","quote","code","link","bullet","numbered","table","hint"],
    table: ["header","bold","italic","link"],
    hint: ["header","bold","italic","quote","link","bullet","numbered"],
  }

  const buttonObject = {
    header:  {
      type: "header",
      text: "Header",
      onHover: (e) => {onHover(e);},
      onClick: (e) => {
        appendIndexedField(e, "\r\n##Header\r\n\r\n");
      },
    },
    bold: {
      type: "bold",
      text: "Bold",
      onHover: (e) => {onHover(e);},
      onClick: (e) => {
        appendIndexedField(e, " **Bold**");
      },
    },
    italic:{
      type: "italic",
      text: "Italic",
      onHover: (e) => {onHover(e);},
      onClick: (e) => {
        appendIndexedField(e, " _Italic_");
      },
    },
    quote:{
      type: "quote",
      text: "Quote",
      onHover: (e) => {onHover(e);},
      onClick: (e) => {
        appendIndexedField(e, "\r\n>Block Quote");
      },
    },
    code:{
      type: "code",
      text: "Code",
      onHover: (e) => {onHover(e);},
      onClick: (e) => {
        appendIndexedField(e, "\r\n```Code\r\n\r\n  \r\n\r\n\r\n```\r\n");
      },
    },
    link:{
      type: "link",
      text: "Link",
      onHover: (e) => {onHover(e);},
      onClick: (e) => {
        appendIndexedField(e, " [Link](www.examplelink.com)");
      },
    },

    bullet:{
      type: "bullet",
      text: "Bullet Point",
      onHover: (e) => {onHover(e);},
      onClick: (e) => {
        appendIndexedField(e, "\r\n - Bullet Point");
      },
    },
    numbered:{
      type: "numbered",
      text: "Numbered List",
      onHover: (e) => {onHover(e);},
      onClick: (e) => {
        appendIndexedField(e, "\r\n n. Numbered List");
      },
    },
    table:{
      type: "table",
      text: "Table",
      onHover: (e) => {onHover(e);},
      onClick: (e) => {
        appendIndexedField(e, "\r\n|||\r\nHeaderA,HeaderB\r\nRow1a,Row1b\r\n|||\r\n"); 
      },
    },
    hint: {
      type: "hint",
      text: "hint",
      onHover: (e) => {onHover(e);},
      onClick: (e) => {
        appendIndexedField(e, "\r\n???\r\nHint\r\n???\r\n"); 
      },
    },
  };
  
// navigator.clipboard.writeText(Object.keys(buttonObject).map(x => `"${x}"`));
// console.log(Object.keys(buttonObject));
  const returnArray = buttonArraySelector[type].map((name) => {
    const btn = buttonObject[name];
   return <SvgButton
      wide="false"
      type={btn.type}
      color="whitesmoke"
      backgroundColor="transparent"
      id={index + "-" + btn.text}
      key={btn.text}
      name={btn.text}
      text={btn.text}
      clickFunction={btn.onClick}
      hoverFunction={btn.onHover}
      marginLeft="0"
      showText={false}
    />});

  return (
    <div className="markdown-buttons">
      {returnArray}
    </div>
  );
}

export default function InputButtons({
  index,
  type,
  changeValue,
  title,
  appendIndexedField,
  onHover,
  autoFocus,
}) {
  const extraButtons = getReturnArray(type, index, appendIndexedField, onHover);
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
          autoFocus={autoFocus}
        />
      </label>
      {extraButtons}
    </div>
  );
}
