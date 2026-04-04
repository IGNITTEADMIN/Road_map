"use client";

import { useEffect, useState } from "react";

export default function Loader({ show }: { show: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (show) {
      timer = setTimeout(() => setVisible(true), 150); // delay
    } else {
      setVisible(false);
    }

    return () => clearTimeout(timer);
  }, [show]);

  if (!visible) return null;

  return (
    <div className="flex items-center justify-center py-10 min-h-[120px]">
      <svg viewBox="0 0 100 150" className="loader-svg">
        <g>
          <path d="M 50,100 A 1,1 0 0 1 50,0" />
        </g>
        <g>
          <path d="M 50,75 A 1,1 0 0 0 50,-25" />
        </g>

        <defs>
          <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF56A1" />
            <stop offset="100%" stopColor="#FF9350" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}