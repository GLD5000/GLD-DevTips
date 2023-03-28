export default function ImageButton({
  backgroundColor = null,
  text = 'Add',
  clickFunction,
  id = null,
  name = null,
  className = 'w-full h-full',
  activeClasses = 'active:bg-slate-400',
  conditionalClasses = null,
  imageUrl,
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
      className={`grid h-12 w-32 grid-cols-autoFr items-center gap-2 border py-1 px-2 hover:transition focus:transition active:bg-slate-300 ${activeClasses} ${className} ${
        backgroundColor && backgroundColor
      } ${conditionalClasses && conditionalClasses}`}
    >
      {!imageUrl && text}
      {imageUrl && (
        <>
          <img
            referrerPolicy="no-referrer"
            className="aspect-square h-8 rounded-full"
            alt="User Profile"
            src={imageUrl}
          />
          Log Out
        </>
      )}
    </button>
  );
}
