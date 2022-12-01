export default function UnPencilSvg({fill = "white", stroke = "black"}) {
  const style = {
    stroke: stroke,
    strokeWidth: "1",
    strokeLinecap: "butt",
    strokeLinejoin: "round",
    fill: fill,
  };

  return (
    <div className="svg-wrapper">
      <svg
        id="unPencil-svg"
        alt="Cancel Writing"
        height="100%"
        width="100%"
        viewBox="0 0 16 16"
      >
        <path d="M 13,3 C 11,1 11,0 8,3 l -7,7 v 5 H 6 l 7,-7 c 2.5,-2.5 2,-3 0,-5 z" style={style}/>
        <path d="m 8,3 5,5" style={style}/>
        <path d="m 1,10 5,5" style={style}/>
        <path d="M 4,10 8,6" style={style}/>
        <path d="M 6,12 10,8" style={style}/>
        <path d="M 1,1 L 15,15" style={style}/>
      </svg>
    </div>
  );
}

