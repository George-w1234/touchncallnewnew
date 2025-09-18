"use client";

export default function ActivityLog({ logs }) {
  return (
    <div
      className="p-6 rounded-lg"
      style={{ backgroundColor: "#111", maxHeight: "400px" }}
    >
      <h3 className="text-lg font-semibold mb-4">📋 Activity Log</h3>
      <div
        className="font-mono text-sm space-y-1 overflow-y-auto"
        style={{ maxHeight: "300px", color: "#00ff00" }}
      >
        {logs.length === 0 ? (
          <div className="opacity-75">
            Tap the time to confirm show start
          </div>
        ) : (
          logs.map((log, index) => <div key={index}>{log}</div>)
        )}
      </div>
    </div>
  );
}
