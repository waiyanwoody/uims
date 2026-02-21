import React from "react";

/**
 * Modern Technology Background inspired by diagonal slashes and clean gradients.
 * Designed to be subtle and match the modern look of the reference image.
 */
export const TechBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {/* Background fill that inherits from parent for theme compatibility */}
      <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/10" />

      <svg
        className="absolute inset-0 w-full h-full opacity-[0.12] dark:opacity-[0.25]"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="slash-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          
          <pattern id="dot-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.6" fill="currentColor" fillOpacity="0.15" />
          </pattern>
        </defs>

        {/* Global color inheritance */}
        <g className="text-primary/30 dark:text-primary/40">
          {/* Broad Diagonal Slashes */}
          <g transform="rotate(-30, 500, 500)">
            <rect x="-500" y="100" width="2000" height="150" fill="url(#slash-grad)" opacity="0.3" />
            <rect x="-500" y="400" width="2000" height="200" fill="url(#slash-grad)" opacity="0.15" />
            <rect x="-500" y="800" width="2000" height="120" fill="url(#slash-grad)" opacity="0.25" />
            
            {/* Fine Diagonal Lines */}
            <g stroke="currentColor" strokeWidth="0.8" opacity="0.4">
              <line x1="-500" y1="260" x2="1500" y2="260" />
              <line x1="-500" y1="265" x2="1500" y2="265" opacity="0.6" />
              
              <line x1="-500" y1="620" x2="1500" y2="620" />
              
              <line x1="-500" y1="920" x2="1500" y2="920" />
              <line x1="-500" y1="930" x2="1500" y2="930" opacity="0.6" />
            </g>
          </g>
        </g>

        {/* Subtle Background Grid/Dots */}
        <rect width="100%" height="100%" fill="url(#dot-pattern)" className="text-foreground" />
      </svg>
      
      {/* Decorative Glows at the edges to match the reference photo depth */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-primary/20 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-purple-500/10 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4 opacity-50" />
    </div>
  );
};
