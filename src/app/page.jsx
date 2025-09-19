"use client";

import { useState, useCallback } from "react";
import { Settings, Lock } from "lucide-react";
import { useShowScheduler } from "../hooks/useShowScheduler";
import { useActivityTracker } from "../hooks/useActivityTracker";
import {
  INACTIVITY_TIMEOUT,
  LOCK_PASSWORD,
} from "../components/ShowCallScheduler/constants";
import Header from "../components/ShowCallScheduler/Header";
import TimePicker from "../components/ShowCallScheduler/TimePicker";
import ActionButtons from "../components/ShowCallScheduler/ActionButtons";
import StatusDisplay from "../components/ShowCallScheduler/StatusDisplay";
import ActivityLog from "../components/ShowCallScheduler/ActivityLog";
import ConfirmationDialog from "../components/ShowCallScheduler/ConfirmationDialog";
import PasswordScreen from "../components/ShowCallScheduler/PasswordScreen";
import SettingsPanel from "../components/ShowCallScheduler/SettingsPanel";

export default function ShowCallSchedulerPage() {
  const [isLocked, setIsLocked] = useState(false);
  const [lockPassword, setLockPassword] = useState("");
  const [lockError, setLockError] = useState("");

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Settings state
  const [showSettings, setShowSettings] = useState(false);
  const [showSettingsUnlock, setShowSettingsUnlock] = useState(false);
  const [settingsPassword, setSettingsPassword] = useState("");
  const [settingsError, setSettingsError] = useState("");

  const [fohEnabled, setFohEnabled] = useState(true);
  const [backstageEnabled, setBackstageEnabled] = useState(true);
  const [fohVolume, setFohVolume] = useState(0.8);
  const [backstageVolume, setBackstageVolume] = useState(0.8);

  const scheduler = useShowScheduler({
    fohEnabled,
    backstageEnabled,
    fohVolume,
    backstageVolume,
  });

  const onInactive = useCallback(() => {
    if (!showSettings && !showSettingsUnlock) {
      setIsLocked(true);
    }
  }, [showSettings, showSettingsUnlock]);

  const { resetTimer } = useActivityTracker(
    onInactive,
    INACTIVITY_TIMEOUT,
    !isLocked && !showSettings && !showSettingsUnlock,
  );

  const handleUnlock = () => {
    setIsLocked(false);
    setLockPassword("");
    setLockError("");
    resetTimer();
  };

  const handleSettingsUnlockSuccess = () => {
    setShowSettings(true);
    setShowSettingsUnlock(false);
    setSettingsPassword("");
    setSettingsError("");
    resetTimer();
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
    resetTimer();
  };

  const handleStartSchedule = () => {
    scheduler.startSchedule();
    setShowConfirmDialog(false);
  };

  const handleTestFoh = () => scheduler.playAudio("foh_test.mp3", "foh");
  const handleTestBackstage = () =>
    scheduler.playAudio("backstage_test.mp3", "backstage");

  if (isLocked) {
    return (
      <PasswordScreen
        Icon={Lock}
        title="Enter Password to Unlock"
        passwordToMatch={LOCK_PASSWORD}
        onSuccess={handleUnlock}
        submitButtonText="Unlock"
        password={lockPassword}
        setPassword={setLockPassword}
        error={lockError}
        setError={setLockError}
      />
    );
  }

  if (showSettingsUnlock) {
    return (
      <PasswordScreen
        Icon={Settings}
        title="Enter Password to Access Settings"
        passwordToMatch={LOCK_PASSWORD}
        onSuccess={handleSettingsUnlockSuccess}
        onCancel={() => {
          setShowSettingsUnlock(false);
          setSettingsPassword("");
          setSettingsError("");
        }}
        submitButtonText="Open Settings"
        password={settingsPassword}
        setPassword={setSettingsPassword}
        error={settingsError}
        setError={setSettingsError}
      />
    );
  }

  if (showSettings) {
    return (
      <SettingsPanel
        fohEnabled={fohEnabled}
        setFohEnabled={setFohEnabled}
        fohVolume={fohVolume}
        setFohVolume={setFohVolume}
        backstageEnabled={backstageEnabled}
        setBackstageEnabled={setBackstageEnabled}
        backstageVolume={backstageVolume}
        setBackstageVolume={setBackstageVolume}
        onClose={handleCloseSettings}
        onTestFoh={handleTestFoh}
        onTestBackstage={handleTestBackstage}
      />
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#191B22", color: "white" }}
    >
      <Header
        onSettingsClick={() => setShowSettingsUnlock(true)}
        currentTime={scheduler.currentTime}
      />

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <TimePicker
          hour={scheduler.hour}
          minute={scheduler.minute}
          onAdjustTime={scheduler.adjustTime}
          onSetPresetTime={scheduler.setPresetTime}
          onConfirm={() => setShowConfirmDialog(true)}
          scheduleStarted={scheduler.scheduleStarted}
        />

        <div className="text-center">
          <button
            onClick={() => scheduler.setMediaAllowed(!scheduler.mediaAllowed)}
            className={`px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-150 ${
              scheduler.mediaAllowed
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
            style={{ minHeight: "64px" }}
          >
            {scheduler.mediaAllowed
              ? "📷 Photos/Videos Allowed"
              : "🚫 No Photos/Videos Allowed"}
          </button>
        </div>

        <ActionButtons
          onHouseOpen={scheduler.houseOpen}
          onCancelSchedule={scheduler.cancelSchedule}
          onLockScreen={() => setIsLocked(true)}
          scheduleStarted={scheduler.scheduleStarted}
        />

        <StatusDisplay
          fohCalls={scheduler.fohCalls}
          backstageCalls={scheduler.backstageCalls}
          fohEnabled={fohEnabled}
          backstageEnabled={backstageEnabled}
        />

        <ActivityLog logs={scheduler.logs} />
      </div>

      {showConfirmDialog && (
        <ConfirmationDialog
          hour={scheduler.hour}
          minute={scheduler.minute}
          onConfirm={handleStartSchedule}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}

      <style jsx global>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
