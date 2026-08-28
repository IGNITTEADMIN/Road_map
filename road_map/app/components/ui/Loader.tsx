"use client";

interface LoaderProps {
  show: boolean;
  fullScreen?: boolean;
  /** Base size in px. Border and dot size scale proportionally with this. */
  size?: number;
}

export default function Loader({
  show,
  fullScreen = true,
  size,
}: LoaderProps) {
  if (!show) return null;

  // Preserve original ratios: border = size/8, dot (background-size) = size/4
  const resolvedSize = size ?? (fullScreen ? 80 : 60);
  const border = resolvedSize / 8;
  const dot = resolvedSize / 4;

  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-[9999]"
          : "flex items-center justify-center py-4"
      }
    >
      <div
        className="loader"
        style={
          {
            "--loader-size": `${resolvedSize}px`,
            "--loader-border": `${border}px`,
            "--loader-dot": `${dot}px`,
          } as React.CSSProperties
        }
      />

      <style jsx>{`
        .loader {
          width: var(--loader-size);
          aspect-ratio: 1;
          border: var(--loader-border) solid #000;
          box-sizing: border-box;
          background: radial-gradient(farthest-side, #e5dfed 98%, #0000) top,
            radial-gradient(farthest-side, #7D3CFF 98%, #0000) top,
            radial-gradient(farthest-side, #1F72FF 98%, #0000) left,
            radial-gradient(farthest-side, #7D3CFF 98%, #0000) right,
            radial-gradient(farthest-side, #1F72FF 98%, #0000) bottom,
            #000;
          background-size: var(--loader-dot) var(--loader-dot);
          background-repeat: no-repeat;
          filter: blur(4px) contrast(10);
          animation: l19 2s infinite;
        }
        @keyframes l19 {
          0% {
            background-position: top, top, left, right, bottom;
          }
          25% {
            background-position: right, top, left, right, bottom;
          }
          50% {
            background-position: bottom, top, left, right, bottom;
          }
          75% {
            background-position: left, top, left, right, bottom;
          }
          100% {
            background-position: top, top, left, right, bottom;
          }
        }
      `}</style>
    </div>
  );
}