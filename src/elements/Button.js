import { useState } from "react";
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
  name=null,
  className = "btn",
}) => {
  const filterDim = "brightness(90%)"
  const filterBright = "brightness(100%)"
  const [filter, setFilter] = useState(() => filterDim);
  function brightenFilter(){
    setFilter(() => filterBright)
  }
  function dimFilter(){
    setFilter(filterDim);
  }
  function clickHandler(e){
    if (filter === filterDim) return;
    clickFunction(e);
  }
  return (
    <button
      id={id}
      name={name}
      onClick={clickHandler}
      className={className}
      style={{ filter: filter, color: color, backgroundColor: backgroundColor, borderRadius: borderRadius }}
      onPointerOver={brightenFilter}
      onPointerLeave={dimFilter}
    >
      {text}
    </button>
  );
};

export default Button;
