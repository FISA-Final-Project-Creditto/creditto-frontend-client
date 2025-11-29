'use client';

import React from 'react';

export default function GradientSparkleButton({ label = '해외 송금하기', onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group
        w-full h-[5em] rounded-lg flex items-center justify-center gap-3
        bg-[#1A3668] cursor-pointer
        transition-all duration-[450ms] ease-in-out
        bg-gradient-to-b from-[#1A3668] to-[#212790]
        shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.4),
                      inset_0px_-4px_0px_0px_rgba(0,0,0,0.2),
                      0px_0px_0px_4px_rgba(255,255,255,0.2),
                      0px_0px_180px_0px_#64729a]
        hover-translate-y-[2px]
        ${className}
      `}
    >
      <svg
        height="24"
        width="24"
        viewBox="0 0 24 24"
        className="
          fill-[#ffffff]
          transition-all duration-[800ms] ease
          group-fill-white group-scale-[1.2]
        "
      >
        <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z" />
      </svg>

      <span
        className="
          font-semibold text-[#ffffff] text-[1rem]
          transition-all duration-[450ms] ease-in-out
          group-text-white
        "
      >
        {label}
      </span>
    </button>
  );
}
