const InputField = ({ type, changeText, name, defaultValue }) => {
  let showInformation = false;
  function handleChange(e) {
    const value = e.target.value;
    const index = e.target.name;
    changeText({ content: value }, index);
  }
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

  const placeHolder = placeHolderObject[type];
  function getInformation(type) {
    const informationLookup = {
      text: "You can use some basic markdown to enhance your text, use the buttons above to help you!",
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
    return informationLookup[type];
  }
  const information = getInformation(type);

  return (
    <label>
      {showInformation === true && { information }}

      <textarea
        placeholder={placeHolder}
        name={name}
        className={type}
        rows="8"
        cols="70"
        onInput={handleChange}
        defaultValue={defaultValue}
      ></textarea>
    </label>
  );
};

export default InputField;
