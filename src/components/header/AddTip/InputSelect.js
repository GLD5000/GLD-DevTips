const InputSelect = ({ type, name, changeType, value }) => {

  function makeOptionsArray() {
    const options = ["text", "code", "hint", "table"];
    return options.map((option, index) => 
       <option className="text-black" key={index} value={option}>{option}</option>
      );
    }
  
  function handleChange(e){
    const value = e.target.value;
    const index = e.target.name;
    changeType({
      type: "REPLACE_SECTION_DATA_FIELD",
      payload: { index, value, field: "type" },
    });

  }
  const optionsArray = makeOptionsArray(type);
  return (
    <select
    className="border-zinc-600 border rounded bg-inherit w-full"
    name={name} id="" onChange={handleChange} value={value}>
      {optionsArray}
    </select>
  );
};

export default InputSelect;
