"use client";

export default function ResetProgress() {
  function handleReset() {
    localStorage.removeItem("quiz_progress");
    window.location.reload();
  }

  return (
    <button
      onClick={handleReset}
      className="text-xs px-3 py-1 border border-red-400 text-red-400 rounded-md hover:bg-red-500/10"
    >
      Reset
    </button>
  );
}