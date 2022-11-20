const TipTitle = ({title, onClick, expanded}) => {
  return (
    <button className="tip-title" onClick={onClick}>
      <h2>{title}</h2>
      <div className="svg-wrapper">
                  <svg id="copy-svg" className="copy-svg svg-icon svg icon-copybtn-svg" alt="Copy Colours" height="100%"
                    width="100%">
                    <rect className="svg" x="10%" y="30%" width="60%" height="60%" rx="4%"
                      style={{strokeWidth: "4%", strokeLinecap: "round", stroke: "white"}} />
                    <rect className="svg" x="30%" y="10%" width="60%" height="60%" rx="4%"
                      style={{strokeWidth: "4%", strokeLinecap: "round", stroke: "white"}} />
                  </svg>
      </div>
      </button>
  )
}

export default TipTitle

