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
}) {
  let pointerTarget;
  function pointerHandler(e){
    pointerTarget = e.target.id;
  }
  function clickHandler(e){
    if (pointerTarget !== e.target.id) return;
    clickFunction(e);
  }
  return (
    <button
      id={id}
      name={name}
      onClick={clickHandler}
      onPointerOver={pointerHandler}
      className={className}
      style={{ color: color, backgroundColor: backgroundColor, borderRadius: borderRadius }}
    >
      {text}
    </button>
  );
};

