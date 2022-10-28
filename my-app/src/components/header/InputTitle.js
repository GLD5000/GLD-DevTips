import { useCallback } from "react";
function defaultOnInput(value) {
  console.log(`No function assigned!
  Value is: ${value}`);
}

const InputTitle = ({
  placeholder = "Type here...",
  onInput = defaultOnInput,
  type = "text",
  name= undefined
}) => {
  const delay = 500;

  const debounce = (handler, delay = 250) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => handler(...args), delay);
    };
  };

  const handler = (e) => {
    const value = e.target.value;
    const index = e.target.name;
    onInput({title: value}, index);
  };

  const debouncedHandler = useCallback(debounce(handler, delay), [
    handler,
    delay
  ]);

  return (
    <input
      type={type}
      onChange={(e) => debouncedHandler(e)}
      placeholder={placeholder}
      name={name}
      autoComplete="off"
    ></input>
  );
};

export default InputTitle;
