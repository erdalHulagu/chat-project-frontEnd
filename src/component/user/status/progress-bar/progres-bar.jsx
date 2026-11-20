
import React from "react";
import "./progress-bar.css";
const ProgressBar = ({
  index,
  activeIndex,
  duration = 5000,
}) => {
  const isCompleted = index < activeIndex;
  const isActive = index === activeIndex;

  return (
    <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
      <div
        className={`h-full rounded-full ${
          isCompleted
            ? "w-full bg-white"
            : isActive
              ? "status-progress-fill bg-white"
              : "w-0 bg-white"
        }`}
        style={
          isActive
            ? {
                animationDuration: `${duration}ms`,
              }
            : undefined
        }
      />
    </div>
  );
};

export default ProgressBar;
