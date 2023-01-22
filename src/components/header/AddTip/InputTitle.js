function defaultOnInput(value) {
  console.log(`No function assigned!
  Value is: ${value}`);
}

const InputTitle = ({
  placeholder = "Type here...",
  onInput = defaultOnInput,
  type = "text",
  name = undefined,
  value = "",
}) => {
  const handler = (e) => {
    const value = e.target.value;
    const index = e.target.name;
    onInput({
      type: "REPLACE_SECTION_DATA_FIELD",
      payload: { index, value, field: "title" },
    });
  };
  return (
    <input
      type={type}
      onChange={(e) => handler(e)}
      placeholder={placeholder}
      name={name}
      autoComplete="true"
      value={value}
    ></input>
  );
};

export default InputTitle;
