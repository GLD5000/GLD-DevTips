export default function DuplicateSvg() {
  return (
    <div className="pointer-events-none m-1 h-6 w-6">
      <svg id="duplicate-svg" alt="copy" height="100%" width="100%" viewBox="0 0 16 16">
        <path
          className="stroke-1, fill-none stroke-current"
          style={{ strokeLinejoin: 'round' }}
          d="M 1.5,1.5 V 11.5 h 3 V 4.5 H 11.5 v -3 z m 3,10 v 3 H 14.5 V 4.5 h -3"
        />
      </svg>
    </div>
  );
}
