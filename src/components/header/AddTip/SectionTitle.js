function defaultOnInput(value) {
  console.log(`No function assigned!
  Value is: ${value}`);
}

const SectionTitle = ({
  placeholder = 'Type here...',
  onInput = defaultOnInput,
  type = 'text',
  name = undefined,
  value = '',
}) => {
  const handler = (e) => {
    const value = e.target.value;
    const index = e.target.name;
    onInput({
      type: 'REPLACE_SECTION_DATA_FIELD',
      payload: { index, value, field: 'title' },
    });
  };
  return (
    <input
      className="rounded border border-zinc-600 bg-inherit"
      type={type}
      onChange={(e) => handler(e)}
      placeholder={placeholder}
      name={name}
      autoComplete="off"
      value={value}
    ></input>
  );
};

export default SectionTitle;
