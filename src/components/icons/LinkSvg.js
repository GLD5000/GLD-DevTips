export default function LinkSvg({fill = "transparent", stroke = "black"}) {

    const style = {
        stroke: stroke,
        strokeWidth: "2",
        strokeLinecap: "round",
        fill: fill,
      };
    
  return (
    <div className="svg-wrapper">
      <svg
        id="link-svg"
        alt="Link"
        height="100%"
        width="100%"
        viewBox="0 0 16 16"
      >
        <path d="M 10,8 C 8,5 8,5 5,5 3,5 2,6 2,8 c 0,2 1,3 3,3"  style={style} />
        <path d="m 6,8 c 2,3 2,3 5,3 2,0 3,-1 3,-3 0,-2 -1,-3 -3,-3"
  style={style} />
      </svg>
    </div>
  )
}
