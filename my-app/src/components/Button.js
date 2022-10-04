import PropTypes from "prop-types";

const Button = ({
  color = "white",
  backgroundColor = "black",
  text = "Add",
}) => {
  const onClick = (e) => {
    console.log(e.target);
  };
  return (
    <button
      onClick={onClick}
      className="btn"
      style={{ color: color, backgroundColor: backgroundColor }}
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
