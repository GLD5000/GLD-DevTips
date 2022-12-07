export default function Header({fill = "transparent", stroke = "black"}) {

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
        <path d="M 4,3 V 13"  style={style} />
        <path d="m 4,8 h 8"  style={style} />
        <path d="M 12,3 V 13"  style={style} />
      </svg>
    </div>
  )
}









