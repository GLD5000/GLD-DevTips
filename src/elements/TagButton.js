function defaultOnClick(e) {
  console.log(e.target);
}

export default function TagButton({
  borderRadius = '4px',
  color = 'white',
  backgroundColor = 'black',
  text = 'Add',
  clickFunction = defaultOnClick,
  id = null,
  name = null,
  className = 'btn',
  border = '1px solid var(--border-grey)',
}) {
  function clickHandler(e) {
    clickFunction(e);
  }
  return (
    <button
      id={id}
      name={name}
      onClick={clickHandler}
      className={'border-2 py-1 px-2 hover:border-white active:bg-slate-600 ' + className}
      style={{ color: color, backgroundColor: backgroundColor }}
    >
      {text}
    </button>
  );
}
