const placeHolderObject = {
  text: `  
  Type or paste some text here...`,
  hint: `  
  Type or paste some text here...`,
  code: `
  Type or paste some code here e.g:

      function add(a, b){

          return a + b;
          
      }`,
  table: `
  Type or paste comma separated values (CSV) here e.g.

      Column Header A,Column Header B,Column Header C
      First Row A,First Row B,First Row C
      Second Row A,Second Row B,Second Row C
      Third Row A,Third Row B,Third Row C   `,
};
const informationLookup = {
  text: "You can use some basic markdown to enhance your text, use the buttons above to help you!",
  hint: `Type or paste your hint here...`,
  code: `Type or paste some code here...`,
  table: `Type or paste comma separated values (CSV) here...`,
};

const classNameLookup = {
  text: "p-2 overflow-auto",
  hint: "overflow-auto whitespace-pre-wrap border-l-8 border-x-hintYellow bg-cornsilk p-2 text-black",
  code: "p-2 bg-black text-vsGreen font-mono whitespace-pre overflow-auto",
  table: "p-2 whitespace-pre overflow-auto",
};

export default function SectionField({
  type,
  changeText,
  name,
  value,
  id = null,
}) {
  let showInformation = true;
  function handleChange(e) {
    const value = e.target.value;
    const index = e.target.name;
    changeText({
      type: "REPLACE_SECTION_DATA_FIELD",
      payload: { index, value, field: "content" },
    });
  }
  const placeHolder = placeHolderObject[type];
  function getInformation(type) {
    return informationLookup[type];
  }
  const information = getInformation(type);

  return (
    <>
      <label className="label-box" id={id + "info"}>
        {showInformation === true && information}
      </label>

      <textarea
        id={id}
        placeholder={placeHolder}
        name={name}
        className={classNameLookup[type]}
        rows="12"
        // cols="70"
        onInput={handleChange}
        value={value}
      ></textarea>
    </>
  );
}
