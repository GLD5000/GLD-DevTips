export default function BulletSvg({ classes }) {
  return (
    <div className="pointer-events-none m-1 h-6 w-6">
      <svg
        id="bullet-svg"
        alt="Bullet"
        height="100%"
        width="100%"
        viewBox="0 0 16 16"
      >
        <path d="M 4,3 h -2 v 2 h 2 z" className={classes} />
        <path d="M 8,4 h 6" className={classes} />
        <path d="M 4,10 h -2 v 2 h 2 z" className={classes} />
        <path d="M 8,11 h 6" className={classes} />
      </svg>
    </div>
  );
}
