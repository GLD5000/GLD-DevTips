function defaultOnInput(value) {
  console.log(`No function assigned!
  Value is: ${value}`);
}

const InputTitle = ({
  placeholder = "Type here...",
  onInput = defaultOnInput,
  type = "text",
  name = undefined,
  defaultValue = null
}) => {


  const handler = (e) => {
    const value = e.target.value;
    const index = e.target.name;
    onInput({title: value}, index);
  };


  return (
    <input
      type={type}
      onChange={(e) => handler(e)}
      placeholder={placeholder}
      name={name}
      autoComplete="off"
      defaultValue={defaultValue}
    ></input>
  );
};

export default InputTitle;
