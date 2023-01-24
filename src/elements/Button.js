function defaultOnClick(e) {
  console.log(e.target);
}

export default function Button({
  borderRadius = "4px",
  color = "white",
  backgroundColor = null,
  text = "Add",
  clickFunction = defaultOnClick,
  id = null,
  name = null,
  className = "w-full h-full",
  border = "1px solid var(--border-grey)",
  activeClasses = "active:bg-slate-400",
  conditionalClasses = null
}) {
  function clickHandler(e) {
    clickFunction(e);
  }
  return (
    <button
      id={id}
      name={name}
      onClick={clickHandler}
      className={`border-2 py-1 px-2 active:bg-slate-300 ${activeClasses} ${className} ${backgroundColor && backgroundColor} ${conditionalClasses && conditionalClasses}`}
    >
      {text}
    </button>
  );
}
