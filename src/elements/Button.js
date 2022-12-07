function defaultOnClick(e) {
  console.log(e.target);
}

export default function Button({
  borderRadius = "4px",
  color = "white",
  backgroundColor = "black",
  text = "Add",
  clickFunction = defaultOnClick,
  id=null,
  name=null,
  className = "btn",
  border = "1px solid var(--border-grey)",
  
}) {
  function clickHandler(e){
    clickFunction(e);
  }
  return (
    <button
      id={id}
      name={name}
      onClick={clickHandler}
      className={className}
      style={{ color: color, backgroundColor: backgroundColor, borderRadius: borderRadius, border: border }}
    >
      {text}
    </button>
  );
};

