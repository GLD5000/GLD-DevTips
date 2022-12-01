export default function ItalicSvg({fill = "transparent", stroke = "black"}) {
  const style = {
    stroke: stroke,
    strokeWidth: "2",
    strokeLinecap: "round",
    fill: fill,
  };

  return (
    <div className="svg-wrapper">
      <svg
        id="italic-svg"
        alt="Italic"
        height="100%"
        width="100%"
        viewBox="0 0 16 16"
      >
        <path d="m 6,4 h 6"  style={style} />
        <path d="M 9,4 8,12"  style={style} />
        <path d="M 4.9999996,12 H 11"  style={style} />
      </svg>
    </div>
  );
}

