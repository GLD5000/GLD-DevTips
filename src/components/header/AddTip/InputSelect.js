function InputSelect({ type, name, changeType, value }) {
  function makeOptionsArray() {
    const options = ['text', 'code', 'hint', 'table'];
    return options.map((option, index) => (
      <option className="text-black" key={index} value={option}>
        {option}
      </option>
    ));
  }

  function handleChange(e) {
    const { value } = e.target;
    const index = e.target.name;
    changeType({
      type: 'REPLACE_SECTION_DATA_FIELD',
      payload: { index, value, field: 'type' },
    });
  }
  const optionsArray = makeOptionsArray(type);
  return (
    <select
      className="w-full rounded border border-zinc-600 bg-inherit"
      name={name}
      id=""
      onChange={handleChange}
      value={value}
    >
      {optionsArray}
    </select>
  );
}

export default InputSelect;
