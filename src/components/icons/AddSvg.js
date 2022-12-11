export default function AddSvg({fill = "white", stroke = "black"}) {
  const style = {
    stroke: stroke,
    strokeWidth: "1",
    strokeLinecap: "round",
    fill: "none",
  };

  return (
    <div className="svg-wrapper">
      <svg
        id="add-svg"
        alt="Add"
        height="100%"
        width="100%"
        viewBox="0 0 16 16"
      >
        <path d="M 4,8 h 8 M 8,4 v 8" style={style}
        />
        <circle cx="8" cy="8" r="7" style={style}/>
      </svg>
    </div>
  );
}
