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
  console.log(`imageUrl ${imageUrl}`);

  return (
    <button
      type="button"
      id={id}
      name={name}
      onClick={clickHandler}
      className={`flex items-center gap-2 border-2 py-1 px-2 transition delay-100 duration-200 ease-in-out active:bg-slate-300 ${activeClasses} ${className} ${
        backgroundColor && backgroundColor
      } ${conditionalClasses && conditionalClasses}`}
    >
      {!imageUrl && text}
      {imageUrl && (
        <>
          Log Out
          <img className="aspect-square h-8 rounded-full" alt="User Profile" src={imageUrl} />
        </>
      )}
    </button>
  );
}
