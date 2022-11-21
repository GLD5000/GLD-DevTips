function defaultOnClick(e) {
  console.log(e.target);
}

const Button = ({
  borderRadius = "4px",
  color = "white",
  backgroundColor = "black",
  text = "Add",
  clickFunction = defaultOnClick,
  id=null,
  name=null
}) => {
  return (
    <button
      id={id}
      name={name}
      onClick={clickFunction}
      className="btn"
      style={{ color: color, backgroundColor: backgroundColor, borderRadius: borderRadius }}
    >
      {text}
    </button>
  );
};

export default Button;
