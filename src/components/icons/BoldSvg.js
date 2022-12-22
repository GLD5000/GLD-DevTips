export default function BoldSvg({ classes }) {
  return (
    <div className="svg-wrapper m-1">
      <svg
        id="bold-svg"
        alt="Bold"
        height="100%"
        width="100%"
        viewBox="0 0 16 16"
      >
        <path
          d="m 4,4 h 6 c 1.46957,1.4265035 1.190947,2.7421722 0,4 H 4 V 4"
          className={classes}
        />
        <path
          d="m 4,8 h 7 c 1.158208,1.242191 1.499177,2.548693 0,4 H 4 V 8"
          className={classes}
        />
      </svg>
    </div>
  );
}
