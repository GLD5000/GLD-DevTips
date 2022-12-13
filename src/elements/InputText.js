function defaultOnInput(value) {
  console.log(`No function assigned!
  Value is: ${value}`);
}

const InputText = ({
  placeholder = "Type here...",
  onInput = defaultOnInput,
  type = "text",
  listId= null,
  defaultValue=""
}) => {


  const handler = (value) => {
    onInput(value);
  };


  return (
    <input
      className="input-text"
      type={type}
      onFocus={(e) => e.target.select()}
      onChange={(e) => handler(e.target.value)}
      placeholder={placeholder}
      list={listId}
      autoComplete="off"
      defaultValue={defaultValue}
    ></input>
  );
};

export default InputText;
