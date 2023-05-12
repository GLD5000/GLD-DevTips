export default function DuplicateSvg() {
  return (
    <div className="pointer-events-none m-1 h-6 w-6">
      <svg id="duplicate-svg" alt="copy" height="100%" width="100%" viewBox="0 0 16 16">
        <rect
          x="2"
          y="2"
          width="9"
          height="9"
          rx="1"
          className="fill-neutral-100 stroke-current stroke-1 dark:fill-neutral-800"
        />
        <rect
          x="5"
          y="5"
          width="9"
          height="9"
          rx="1"
          className="fill-neutral-100 stroke-current stroke-1 dark:fill-neutral-800"
        />
      </svg>
    </div>
  );
}
