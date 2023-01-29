export default function UnTickSvg({ fill = 'none' }) {
  return (
    <div className="pointer-events-none h-6 w-6">
      <svg id="untick-svg" alt="Toggle Off" height="100%" width="100%" viewBox="0 0 16 16">
        <circle
          cx="8"
          cy="8"
          r="6.5"
          style={{
            stroke: '#000000',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            fill,
          }}
        />
      </svg>
    </div>
  );
}
