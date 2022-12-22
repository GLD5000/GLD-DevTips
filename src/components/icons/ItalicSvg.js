export default function ItalicSvg({ classes }) {
  return (
    <div className="svg-wrapper m-1">
      <svg
        id="italic-svg"
        alt="Italic"
        height="100%"
        width="100%"
        viewBox="0 0 16 16"
      >
        <path d="m 5,4 h 8" className={classes} />
        <path d="M 10,4 6,12" className={classes} />
        <path d="m 3,12 h 8" className={classes} />
      </svg>
    </div>
  );
}
