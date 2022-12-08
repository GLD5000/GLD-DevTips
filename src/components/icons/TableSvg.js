export default function TableSvg({fill = "transparent", stroke = "black"}) {

    const style = {
        stroke: stroke,
        strokeWidth: "1",
        strokeLinecap: "round",
        strokeLineJoin: "round",
        fill: fill,
      };
    
  return (
    <div className="svg-wrapper">
      <svg
        id="table-svg"
        alt="Table"
        height="100%"
        width="100%"
        viewBox="0 0 16 16"
      >
        <path d="M 2,3 H 14 V 7 H 2 V 3 13 H 14 V 7"  style={style} />
      </svg>
    </div>
  )
}



