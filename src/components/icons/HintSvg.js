export default function HintSvg({fill = "white", stroke = "black"}) {
    // const style = {
    //   stroke: stroke,
    //   strokeWidth: "1",
    //   strokeLinecap: "round",
    //   fill: fill,
    // };
  
    return (
      <div className="svg-wrapper">
        <svg
          id="add-svg"
          alt="Add"
          height="100%"
          width="100%"
          viewBox="0 0 16 16"
        >
<g
     id="g518"
     transform="translate(-0.5,-0.5)"><circle
       style={{fill:"none",stroke:stroke,strokeWidth:"1",strokeLinecap:"round",strokeLinejoin:"round"}}
       id="path296"
       cx="8"
       cy="8"
       r="6.5" /><path
       style={{fill:"none",stroke:stroke,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}}
       d="m 8,7 v 5"
       id="path352"
        /><circle
       style={{fill:stroke,stroke:"none",strokeLinecap:"round",strokeLinejoin:"round"}}
       id="path354"
       cx="8"
       cy="4"
       r="1.25" /></g>
        </svg>
      </div>
    );
  }
