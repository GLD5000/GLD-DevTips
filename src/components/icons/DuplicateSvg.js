export default function DuplicateSvg({ classes }) {
  return (
    <div className="svg-wrapper m-1">
      <svg
        id="add-svg"
        alt="Add Section"
        height="100%"
        width="100%"
        viewBox="0 0 16 16"
      >
        <rect x="2" y="2" width="9" height="9" rx="1" className={classes} />
        <rect x="5" y="5" width="9" height="9" rx="1" className={classes} />
      </svg>
    </div>
  );
}
