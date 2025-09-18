"use client";

export default function StatusDisplay({
  fohCalls,
  backstageCalls,
  fohEnabled,
  backstageEnabled,
}) {
  if (
    !((fohCalls.length > 0 && fohEnabled) || (backstageCalls.length > 0 && backstageEnabled))
  ) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {fohEnabled && (
        <div className="p-6 rounded-lg" style={{ backgroundColor: "#2A2F3A" }}>
          <h3 className="text-lg font-semibold mb-4">🎟️ FOH Status (Left)</h3>
          <div className="space-y-2">
            {fohCalls.length > 0 ? (
              fohCalls.map((call, index) => (
                <div key={index} className="text-sm opacity-90">
                  {call}
                </div>
              ))
            ) : (
              <div className="text-sm opacity-75">
                No upcoming FOH calls
              </div>
            )}
          </div>
        </div>
      )}

      {backstageEnabled && (
        <div className="p-6 rounded-lg" style={{ backgroundColor: "#2A2F3A" }}>
          <h3 className="text-lg font-semibold mb-4">
            🎙️ Backstage Status (Right)
          </h3>
          <div className="space-y-2">
            {backstageCalls.length > 0 ? (
              backstageCalls.map((call, index) => (
                <div key={index} className="text-sm opacity-90">
                  {call}
                </div>
              ))
            ) : (
              <div className="text-sm opacity-75">
                No upcoming backstage calls
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
