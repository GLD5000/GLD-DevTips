export default function ExpandSvg({
  className = ' stroke-border dark:stroke-border-dk fill-none stroke',
}) {
  return (
    <div className="pointer-events-none m-1 h-6 w-6">
      <svg id="expand-svg" alt="Expand" height="100%" width="100%" viewBox="0 0 10 10">
        <path
          d="M 1,1
    L 5,5 
    L 9,1"
          className={className}
          style={{
            strokeLinecap: 'round',
          }}
        />
      </svg>
    </div>
  );
}
