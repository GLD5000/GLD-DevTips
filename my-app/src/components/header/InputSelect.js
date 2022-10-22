const InputSelect = ({ type, index, changeType }) => {
  function makeOptionsArray(type) {
    //Add selected="true" to type
    const options = ["text", "code", "hint", "table"];
    return options.map((option, index) => 
       <option key={index} value={option}>{option}</option>
      );
    }
  
  function handleChange(e){
    const value = e.target.value;
    changeType(value);

  }
  function setPlaceHolder(type){
    // conditionally set placeholder based on type
  }
  const placeHolder = setPlaceHolder(type);
  const optionsArray = makeOptionsArray(type);
  return (
    <select name="" id="" onChange={handleChange}>
      {optionsArray}
    </select>
  );
};

export default InputSelect;
