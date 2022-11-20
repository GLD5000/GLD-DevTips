const TipTitle = ({ title, onClick, expanded }) => {
  return (
    <button className="tip-title" onClick={onClick}>
      <h2>{title}</h2>
      {expanded ? (
        <div className="svg-wrapper">
          <svg
            id="copy-svg"
            className="copy-svg svg-icon svg icon-copybtn-svg"
            alt="Copy Colours"
            height="100%"
            width="100%"
          >
            <line
              x1="10%"
              y1="50%"
              x2="50%"
              y2="10%"
              style={{
                stroke: "#ffffff",
                strokeWidth: "20%",
                strokeLinecap: "round",
              }}
            />
            <line
              x1="50%"
              y1="10%"
              x2="90%"
              y2="50%"
              style={{
                stroke: "#ffffff",
                strokeWidth: "20%",
                strokeLinecap: "round",
              }}
            />
          </svg>
        </div>
      ) : (
        <div className="svg-wrapper">
          <svg
            id="copy-svg"
            className="copy-svg svg-icon svg icon-copybtn-svg"
            alt="Copy Colours"
            height="100%"
            width="100%"
          >
            <line
              x1="10%"
              y1="10%"
              x2="50%"
              y2="50%"
              style={{
                stroke: "#ffffff",
                strokeWidth: "20%",
                strokeLinecap: "round",
              }}
            />
            <line
              x1="50%"
              y1="50%"
              x2="90%"
              y2="10%"
              style={{
                stroke: "#ffffff",
                strokeWidth: "20%",
                strokeLinecap: "round",
              }}
            />
          </svg>
        </div>
      )}
    </button>
  );
};

export default TipTitle;
