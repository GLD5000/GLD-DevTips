export default function TagButton({
  color = 'white',
  backgroundColor = 'black',
  text = 'Add',
  clickFunction,
  id = null,
  name = null,
  className = 'btn',
}) {
  function clickHandler(e) {
    clickFunction(e);
  }
  return (
    <button
      type="button"
      id={id}
      name={name}
      onClick={clickHandler}
      className={`rounded border py-1 px-2 hover:border-white active:bg-slate-600 ${className} hover:transition focus:transition`}
      style={{ color, backgroundColor }}
    >
      {text}
    </button>
  );
}
