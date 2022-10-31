import PropTypes from "prop-types";
function defaultOnClick(e) {
  console.log(e.target);
}

const Button = ({
  borderRadius = "4px",
  color = "white",
  backgroundColor = "black",
  text = "Add",
  clickFunction = defaultOnClick,
}) => {
  return (
    <button
      onClick={clickFunction}
      className="btn"
      style={{ color: color, backgroundColor: backgroundColor, borderRadius: borderRadius }}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  text: PropTypes.string,
};

export default Button;
