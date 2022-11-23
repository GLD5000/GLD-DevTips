export default function DeleteSvg({fill = "none", stroke = "black"}) {
    return (
     <div className="svg-wrapper">
     <svg
       id="add-svg"
       alt="Add Section"
       height="100%"
       width="100%"
       viewBox="0 0 16 16"
     >
      <path d="M 2,2
      L 14,14 
      M 14,2
      L 2,14"        
      style={{
        stroke: stroke,
        strokeWidth: "1",
        strokeLinecap: "round",
        fill: fill,
      }}
      />
     </svg>
   </div>
  )
  }