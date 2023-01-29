export default function AddSvg({ classes }) {
  return (
    <div className=" pointer-events-none m-1 h-6  w-6">
      <svg id="add-svg" alt="Add" height="100%" width="100%" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="7" className={classes} />
        <path d="M 4,8 h 8 M 8,4 v 8" className={classes} />
      </svg>
    </div>
  );
}
