import { forwardRef } from "react";

const StatCard = forwardRef(function StatCard({ value, description, className = "" }, ref) {
  return (
    <div
      ref={ref}
      className={`absolute z-10 flex w-[clamp(10rem,16vw,15.5rem)] flex-col items-start gap-1 rounded-[10px] px-5 py-4 sm:px-7 sm:py-6 ${className}`}
    >
      <span className="text-[clamp(1.6rem,3.2vw,3.6rem)] leading-none font-semibold">{value}</span>
      <p className="text-[clamp(0.65rem,0.9vw,0.875rem)] leading-snug">{description}</p>
    </div>
  );
});

export default StatCard;
