export default function HeaderSvg({ classes }) {
  return (
    <div className="svg-wrapper m-1">
      <svg
        id="header-svg"
        alt="Header"
        height="100%"
        width="100%"
        viewBox="0 0 16 16"
      >
        <path d="M 4,4 V 12" className={classes} />
        <path d="m 4,8 h 8" className={classes} />
        <path d="M 12,4 V 12" className={classes} />
      </svg>
    </div>
  );
}
