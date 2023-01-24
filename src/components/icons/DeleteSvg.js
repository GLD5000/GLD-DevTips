export default function DeleteSvg({ classes }) {
  return (
    <div className="pointer-events-none m-1 h-6 w-6">
      <svg
        id="add-svg"
        alt="Add Section"
        height="100%"
        width="100%"
        viewBox="0 0 16 16"
      >
        <path
          d="M 2,2
      L 14,14 
      M 14,2
      L 2,14"
          className={classes}
        />
      </svg>
    </div>
  );
}
