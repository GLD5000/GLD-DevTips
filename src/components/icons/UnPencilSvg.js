export default function UnPencilSvg({ classes }) {
  return (
    <div className="pointer-events-none m-1 h-6 w-6">
      <svg id="unPencil-svg" alt="Cancel Writing" height="100%" width="100%" viewBox="0 0 16 16">
        <path
          d="M 13,3 C 11,1 11,0 8,3 l -7,7 v 5 H 6 l 7,-7 c 2.5,-2.5 2,-3 0,-5 z"
          className={classes}
        />
        <path d="m 8,3 5,5" className={classes} />
        <path d="m 1,10 5,5" className={classes} />
        <path d="M 4,10 8,6" className={classes} />
        <path d="M 6,12 10,8" className={classes} />
        <path d="M 1,1 L 15,15" className={classes} />
      </svg>
    </div>
  );
}
