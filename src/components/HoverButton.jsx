
import React from "react";

const DrawOutlineButton = ({ children, className = "", ...rest }) => {
  return (
    <button
      {...rest}
      className={`
        group relative overflow-hidden rounded-full
        px-8 py-3 font-semibold text-lg
        transition-all duration-300
        hover:scale-105
        active:scale-95
        ${className}
      `}
    >
      {/* Animated Border */}
      <span
        className="
          absolute inset-0 rounded-full
          border-2 border-white/40
          transition-all duration-300
          group-hover:border-white
          group-hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]
        "
      />

      {/* Shine Effect */}
      <span
        className="
          absolute inset-0 -translate-x-full
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          transition-transform duration-700
          group-hover:translate-x-full
        "
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default DrawOutlineButton;