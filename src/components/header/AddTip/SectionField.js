const placeHolderObject = {
  text: `  
  Type or paste some text here...
  
  Use the buttons above to help you add text effects etc...`,
  hint: `  
  Type or paste some text here...
  
  Use the buttons above to help you add text effects etc...`,
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
// const informationLookup = {
//   text: 'You can use some basic markdown to enhance your text, use the buttons above to help you!',
//   hint: `Type or paste your hint here...`,
//   code: `Type or paste some code here...`,
//   table: `Type or paste comma separated values (CSV) here...`,
// };

const classNameLookup = {
  text: 'resize-y p-2 overflow-x-auto w-full border-zinc-600 border-2 rounded bg-inherit',
  hint: 'resize-y overflow-x-auto whitespace-pre-wrap w-full border-l-8 border-x-hintYellow bg-cornsilk p-2 text-black rounded',
  code: 'resize-y p-2 bg-black text-vsGreen font-mono w-full whitespace-pre overflow-x-auto border-vsGreen border-2 rounded ',
  table:
    'resize-y p-2 whitespace-pre overflow-x-auto w-full border-zinc-600 border-2 rounded bg-inherit',
};

export default function SectionField({ objectType, changeText, name, content, id = null }) {
  // const showInformation = true;
  function handleChange(e) {
    const { value } = e.target;
    const index = e.target.name;
    changeText({
      type: 'REPLACE_SECTION_DATA_FIELD',
      payload: { index, value, field: 'content' },
    });
  }
  const placeHolder = placeHolderObject[objectType];
  // function getInformation(type) {
  //   return informationLookup[type];
  // }
  // const information = getInformation(objectType);

  return (
    <>
      {/* <label className="grid " id={`${id}info`}>
        {showInformation === true && information}
      </label> */}

      <textarea
        id={id}
        placeholder={placeHolder}
        name={name}
        className={classNameLookup[objectType]}
        rows="7"
        // cols='70'
        onInput={handleChange}
        value={content}
        wrap="hard"
      />
    </>
  );
}
