export default function BulletSvg({fill = "transparent", stroke = "black"}) {

    const style = {
        stroke: stroke,
        strokeWidth: "1",
        strokeLinecap: "round",
        fill: stroke,
      };
    
  return (
    <div className="svg-wrapper">
      <svg
        id="bullet-svg"
        alt="Bullet"
        height="100%"
        width="100%"
        viewBox="0 0 16 16"
      >
        <path d="M 4,3 h -2 v 2 h 2 z"  style={style} />
        <path  d="M 8,4 h 6" style={style} />
        <path d="M 4,10 h -2 v 2 h 2 z"  style={style} />
        <path  d="M 8,11 h 6" style={style} />
      </svg>
    </div>
  )
}
