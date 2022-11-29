export default function PreviewSvg({fill = "white", stroke = "black"}) {
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
        <path d="M 2,8 Q 8,2 14,8 M 2,8 Q 8,15 14,8 " style={style}
        />
        <circle   cx="8"
  cy="8"
  r="2"
/>
      </svg>
    </div>
  );
}
