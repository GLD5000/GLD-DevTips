export default function TabButton({
  backgroundColor = null,
  text = 'Add',
  clickFunction,
  id = null,
  name = null,
  className = 'w-full h-full',
  activeClasses = 'active:bg-slate-400',
  conditionalClasses = null,
  currentTab,
}) {
  const active = currentTab === id;
  function clickHandler(e) {
    clickFunction(e);
  }
  return (
    <button
      type="button"
      id={id}
      name={name}
      onClick={clickHandler}
      className={`rounded-none border border-transparent py-1 px-2 hover:transition focus:transition active:bg-slate-300 ${activeClasses} ${className} ${
        backgroundColor && backgroundColor
      } ${active && conditionalClasses}`}
    >
      {text}
    </button>
  );
}
