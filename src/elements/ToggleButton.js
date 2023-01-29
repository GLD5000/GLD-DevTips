import TickSvg from '../components/icons/TickSvg';
import UnTickSvg from '../components/icons/UnTickSvg';

let showText = true;
function defaultOnClick(e) {
  console.log(e.target);
}
export default function ToggleButton({
  borderRadius = '4px',
  color = 'white',
  backgroundColor = 'black',
  text = 'Add',
  clickFunction = defaultOnClick,
  id = null,
  name = null,
  type = 'tick',
  className = 'btn',
  toggle,
}) {
  function getSvg(type) {
    const svgLookup = {
      tick: { true: <TickSvg />, false: <UnTickSvg fill={backgroundColor} /> },
    };
    return svgLookup[type];
  }
  const svg = getSvg(type)[toggle];

  function clickHandler(e) {
    //return if wrong
    clickFunction(e);
  }
  if (toggle === false) {
    backgroundColor = '#b0b0b0';
    color = '#000000';
  }
  const styles = {
    color: color,
    backgroundColor: backgroundColor,
  };

  return (
    <>
      <button
        id={id}
        name={name}
        onClick={clickHandler}
        className={`grid grid-cols-autoAuto items-center gap-2 border-2 border-zinc-600 px-2 py-1 hover:border-white`}
        style={styles}
      >
        {showText && text}
        {svg}
      </button>
    </>
  );
}
