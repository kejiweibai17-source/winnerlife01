export default function SnapSection({
  children,
  className = "",
  viewportClassName = "",
  tall = false,
  hideTail = false,
}) {
  return (
    <div className={`lp-snap-section ${className}`.trim()}>
      <div
        className={`lp-snap-section__viewport ${tall ? "is-tall" : ""} ${viewportClassName}`.trim()}
      >
        {children}
      </div>
      {!hideTail ? (
        <div className="lp-snap-section__tail" aria-hidden="true" />
      ) : null}
    </div>
  );
}
