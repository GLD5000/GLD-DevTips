function InputSelect({ type, name, changeType, value: content }) {
  function makeOptionsArray() {
    const options = ['text', 'code', 'hint', 'table'];
    return options.map((option, index) => {
      const key = index;
      return (
        <option className="text-black" key={key} value={option}>
          {option}
        </option>
      );
    });
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
      value={content}
    >
      {optionsArray}
    </select>
  );
}

export default InputSelect;
