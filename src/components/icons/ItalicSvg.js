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
        <path d="m 5,4 h 8"  style={style} />
        <path d="M 10,4 6,12"  style={style} />
        <path d="m 3,12 h 8"  style={style} />
      </svg>
    </div>
  );
}


         
         
         
