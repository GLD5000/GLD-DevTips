export default function PreviewSvg({ classes }) {
  return (
    <div className="svg-wrapper m-1">
      <svg
        id="add-svg"
        alt="Add Section"
        height="100%"
        width="100%"
        viewBox="0 0 16 16"
      >
        <path d="M 2,8 Q 8,2 14,8 M 2,8 Q 8,15 14,8 " className={classes + " fill-none"} />
        <circle cx="8" cy="8" r="2" className={classes + " fill-current"} />
      </svg>
    </div>
  );
}
