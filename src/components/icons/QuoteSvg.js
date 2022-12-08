export default function QuoteSvg({fill = "transparent", stroke = "black"}) {

    const style = {
        stroke: stroke,
        strokeWidth: "2",
        strokeLinecap: "round",
        fill: fill,
      };
    
  return (
    <div className="svg-wrapper">
      <svg
        id="quote-svg"
        alt="Quote"
        height="100%"
        width="100%"
        viewBox="0 0 16 16"
      >
        <path d="M 4,10 C 6,10 6,9 6,5 H 4 v 2 h 2"  style={style} />
        <path  d="m 10,10 c 2,0 2,-1 2,-5 h -2 v 2 h 2"  style={style} />
      </svg>
    </div>
  )
}