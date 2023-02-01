import TickSvg from '../components/icons/TickSvg';
import UnTickSvg from '../components/icons/UnTickSvg';

const showText = true;
export default function ToggleButton({
  color: colourIn,
  backgroundColor: backgroundColorIn,
  text = 'Add',
  clickFunction,
  id = null,
  name = null,
  style = 'tick',
  toggle,
}) {
  function clickHandler(e) {
    // return if wrong
    clickFunction(e);
  }
  const backgroundColor = toggle ? backgroundColorIn : '#b0b0b0';
  const color = toggle ? colourIn : '#000000';
  const styles = {
    backgroundColor,
    color,
  };
  const svg = getSvg(style)[toggle];
  function getSvg(value) {
    const svgLookup = {
      tick: { true: <TickSvg />, false: <UnTickSvg fill={backgroundColorIn} /> },
    };
    return svgLookup[value];
  }

  return (
    <button
      type="button"
      id={id}
      name={name}
      onClick={clickHandler}
      className="grid grid-cols-autoAuto items-center gap-2 border-2 border-zinc-600 px-2 py-1 transition delay-100 duration-200 ease-in-out hover:border-white"
      style={styles}
    >
      {showText && text}
      {svg}
    </button>
  );
}
