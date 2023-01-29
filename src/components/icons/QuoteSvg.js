export default function QuoteSvg({ classes }) {
  return (
    <div className="pointer-events-none m-1 h-6 w-6">
      <svg id="quote-svg" alt="Quote" height="100%" width="100%" viewBox="0 0 16 16">
        <path d="M 4,10 C 6,10 6,9 6,5 H 4 v 2 h 2" className={classes} />
        <path d="m 10,10 c 2,0 2,-1 2,-5 h -2 v 2 h 2" className={classes} />
      </svg>
    </div>
  );
}
