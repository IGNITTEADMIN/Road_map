"use client";

interface Props {
  videoUrl: string;
  onClose: () => void;
}

function toEmbed(url: string) {
  try {
    const u = new URL(url);
    let id = u.searchParams.get("v");
    if (!id && u.hostname.includes("youtu.be")) {
      id = u.pathname.slice(1);
    }
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}`;
  } catch {
    return null;
  }
}

export default function YouTubeOverlay({ videoUrl, onClose }: Props) {
  const embed = toEmbed(videoUrl);
  if (!embed) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "70%",
          height: "70%",
          background: "#000",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={embed}
          width="100%"
          height="100%"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
}
