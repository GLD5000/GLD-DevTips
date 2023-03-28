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
  className,
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
      className={`grid grid-cols-autoAuto items-center gap-2 border border-zinc-600 px-2 py-1 text-sm hover:border-white hover:transition focus:transition ${className}`}
      style={styles}
    >
      {showText && text}
      {svg}
    </button>
  );
}
