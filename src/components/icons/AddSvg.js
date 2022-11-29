export default function AddSvg({fill = "white", stroke = "black"}) {
  const style = {
    stroke: stroke,
    strokeWidth: "1",
    strokeLinecap: "round",
    fill: fill,
  };

  return (
    <div className="svg-wrapper">
      <svg
        id="add-svg"
        alt="Add Section"
        height="100%"
        width="100%"
        viewBox="0 0 16 16"
      >
        <path d="M 2,8 h 12 M 8,2 v 12" style={style}
        />
      </svg>
    </div>
  );
}
