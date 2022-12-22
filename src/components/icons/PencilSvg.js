export default function PencilSvg({ classes }) {
  return (
    <div className="svg-wrapper m-1">
      <svg
        id="add-svg"
        alt="Add Section"
        height="100%"
        width="100%"
        viewBox="0 0 16 16"
      >
        <path
          d="M 13,3 C 11,1 11,0 8,3 l -7,7 v 5 H 6 l 7,-7 c 2.5,-2.5 2,-3 0,-5 z"
          className={classes}
        />
        <path d="m 8,3 5,5" className={classes} />
        <path d="m 1,10 5,5" className={classes} />
        <path d="M 4,10 8,6" className={classes} />
        <path d="M 6,12 10,8" className={classes} />
      </svg>
    </div>
  );
}
