export default function Button({
  backgroundColor = null,
  text = 'Add',
  clickFunction,
  id = null,
  name = null,
  className = 'w-full h-full',
  activeClasses = 'active:bg-slate-400',
  conditionalClasses = null,
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
      className={`border-2 py-1 px-2 transition delay-100 duration-200 ease-in-out active:bg-slate-300 ${activeClasses} ${className} ${
        backgroundColor && backgroundColor
      } ${conditionalClasses && conditionalClasses}`}
    >
      {text}
    </button>
  );
}
