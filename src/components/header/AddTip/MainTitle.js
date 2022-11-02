import { useCallback } from "react";
function defaultOnInput(value, index) {
  console.log(`No function assigned!
  Value is: ${value}
  index/name is: ${index}`);
}

const MainTitle = ({
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
    onInput(value, index);
  };

  const debouncedHandler = useCallback(debounce(handler, delay), [
    handler,
    delay
  ]);

  return (
    <input
      autoFocus
      className="titleInput"
      type="text"
      placeholder="Add a title or topic for your tip..."
      onChange={(e) => debouncedHandler(e)}
      name={name}
      autoComplete="off"
    ></input>
  );
};

export default MainTitle;
