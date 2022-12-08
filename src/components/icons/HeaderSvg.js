export default function HeaderSvg({fill = "transparent", stroke = "black"}) {

    const style = {
        stroke: stroke,
        strokeWidth: "2",
        strokeLinecap: "round",
        fill: fill,
      };
    
  return (
    <div className="svg-wrapper">
      <svg
        id="header-svg"
        alt="Header"
        height="100%"
        width="100%"
        viewBox="0 0 16 16"
      >
        <path d="M 4,4 V 12"  style={style} />
        <path d="m 4,8 h 8"  style={style} />
        <path d="M 12,4 V 12"  style={style} />
      </svg>
    </div>
  )
}