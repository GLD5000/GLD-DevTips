export default function CodeSvg({fill = "transparent", stroke = "black"}) {

    const style = {
        stroke: stroke,
        strokeWidth: "2",
        strokeLinecap: "round",
        fill: fill,
      };
    
  return (
    <div className="svg-wrapper">
      <svg
        id="code-svg"
        alt="Code"
        height="100%"
        width="100%"
        viewBox="0 0 16 16"
      >
        <path d="M 6,4 2,8 6,12"  style={style} />
        <path d="m 10,4 4,4 -4,4"  style={style} />
      </svg>
    </div>
  )
}


       
