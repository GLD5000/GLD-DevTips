const InputSelect = ({ type, name, changeType, defaultValue }) => {

  function makeOptionsArray(type) {
    const options = ["text", "code", "hint", "table"];
    return options.map((option, index) => 
       <option key={index} value={option}>{option}</option>
      );
    }
  
  function handleChange(e){
    const value = e.target.value;
    const index = e.target.name;
    changeType({type: value}, index);

  }
  const optionsArray = makeOptionsArray(type);
  return (
    <select name={name} id="" onChange={handleChange} defaultValue={defaultValue}>
      {optionsArray}
    </select>
  );
};

export default InputSelect;
