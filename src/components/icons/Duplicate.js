export default function DuplicateSvg({fill = "white", stroke = "black"}) {
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
        <rect x="2" y="2" width="9" height="9" rx="1" style={style}
        />
        <rect x="5" y="5" width="9" height="9" rx="1" style={style}
        />
      </svg>
    </div>
  );
}
