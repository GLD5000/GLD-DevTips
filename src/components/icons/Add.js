export default function AddSvg() {
    return (
     <div className="svg-wrapper">
     <svg
       id="add-svg"
       alt="Add Section"
       height="100%"
       width="100%"
       viewBox="0 0 10 10"
     >
      <path d="M 1,5
      H 9 
      M 5,1
      V 9"        
      style={{
        stroke: "#ffffff",
        strokeWidth: "20%",
        strokeLinecap: "round",
        fill: "none",
      }}
      />
     </svg>
   </div>
  )
  }