import React, { useState, useEffect } from "react";

const BlackPage = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <div
      className="min-h-screen w-full bg-black"
      style={{ backgroundColor: "#000" }}
    >
      <span
        className="fixed bottom-4 right-4 text-4xl font-mono select-none"
        style={{ color: "#ffffff" }}
      >
        {mins}:{secs}
      </span>
    </div>
  );
};

export default BlackPage;
