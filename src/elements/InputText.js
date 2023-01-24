function defaultOnInput(value) {
  console.log(`No function assigned!
  Value is: ${value}`);
}

const InputText = ({
  placeholder = "Type here...",
  onInput = defaultOnInput,
  type = "text",
  listId= null,
  value=""
}) => {


  const handler = (value) => {
    onInput(value);
  };


  return (
    <input
      className="border-zinc-600 border rounded bg-inherit w-full h-8 p-1"
      type={type}
      onFocus={(e) => e.target.select()}
      onChange={(e) => handler(e.target.value)}
      placeholder={placeholder}
      list={listId}
      autoComplete="off"
      value={value}
    ></input>
  );
};

export default InputText;
