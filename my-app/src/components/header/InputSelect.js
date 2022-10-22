const InputSelect = ({ type, name, changeType }) => {
  function makeOptionsArray(type) {
    //Add selected="true" to type
    const options = ["text", "code", "hint", "table"];
    return options.map((option, index) => 
       <option key={index} value={option}>{option}</option>
      );
    }
  
  function handleChange(e){
    const value = e.target.value;
    const index = e.target.name;
    console.log(e.target)
    changeType(value, index);

  }
  function setPlaceHolder(type){
    // conditionally set placeholder based on type
  }
  const placeHolder = setPlaceHolder(type);
  const optionsArray = makeOptionsArray(type);
  return (
    <select name={name} id="" onChange={handleChange}>
      {optionsArray}
    </select>
  );
};

export default InputSelect;
