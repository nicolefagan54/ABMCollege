import React, { useEffect, useState } from "react";

const STORAGE_KEY = "dlo_mood_history";

export default function MoodHealth() {
  const [mood, setMood] = useState(3);
  const [sleep, setSleep] = useState("");
  const [water, setWater] = useState("");
  const [note, setNote] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      setHistory(data);
      if (data.length > 0) {
        const last = data[data.length - 1];
        setMood(last.mood ?? 3);
        setSleep(String(last.sleepHours ?? ""));
        setWater(String(last.waterCups ?? ""));
        setNote(last.note ?? "");
      }
    }
  }, []);

  const save = () => {
    const entry = {
      mood,
      sleepHours: Number(sleep) || 0,
      waterCups: Number(water) || 0,
      note,
      timestamp: new Date().toISOString(),
    };
    const updated = [...history, entry];
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="card">
      <h2>Mood &amp; Health</h2>

      <label className="field-label">Mood (1 = low, 5 = great)</label>
      <input
        type="range"
        min="1"
        max="5"
        value={mood}
        onChange={(e) => setMood(Number(e.target.value))}
      />
      <div className="mood-value">Mood: {mood}</div>

      <label className="field-label">Sleep hours</label>
      <input
        type="number"
        value={sleep}
        onChange={(e) => setSleep(e.target.value)}
        placeholder="e.g., 7"
      />

      <label className="field-label">Water cups</label>
      <input
        type="number"
        value={water}
        onChange={(e) => setWater(e.target.value)}
        placeholder="e.g., 6"
      />

      <label className="field-label">Notes</label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="How are you feeling today?"
      />

      <button className="primary-btn" onClick={save}>
        Save today
      </button>

      <div className="last-saved">
        {history.length === 0 ? (
          "No entries yet."
        ) : (
          <>
            <strong>Recent entries:</strong>
            <ul className="history-list">
              {history
                .slice(-5)
                .reverse()
                .map((entry, idx) => (
                  <li key={idx}>
                    {new Date(entry.timestamp).toLocaleDateString()} — Mood{" "}
                    {entry.mood}, Sleep {entry.sleepHours}h, Water{" "}
                    {entry.waterCups} cups
                    {entry.note && <> — “{entry.note}”</>}
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
