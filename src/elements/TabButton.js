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
      className={`rounded-none border-2 border-transparent py-1 px-2 transition delay-100 duration-200 ease-in-out active:bg-slate-300 ${activeClasses} ${className} ${
        backgroundColor && backgroundColor
      } ${active && conditionalClasses}`}
    >
      {text}
    </button>
  );
}
