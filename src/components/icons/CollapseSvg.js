export default function CollapseSvg({
  className = ' stroke-border dark:stroke-border-dk fill-none stroke',
}) {
  return (
    <div className="pointer-events-none m-1 h-6 w-6">
      <svg id="collapse-svg" alt="Collapse" height="100%" width="100%" viewBox="0 0 10 10">
        <path
          d="M 1,5
    L 5,1 
    L 9,5"
          className={className}
          style={{
            strokeLinecap: 'round',
          }}
        />
      </svg>
    </div>
  );
}
