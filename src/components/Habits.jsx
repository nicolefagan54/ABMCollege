import React, { useEffect, useState } from "react";

const STORAGE_KEY = "dlo_habits";

const todayKey = () => new Date().toISOString().slice(0, 10); // YYYY-MM-DD

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setHabits(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setHabits((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: trimmed,
        isDoneToday: false,
        lastDoneDate: null,
        streak: 0,
      },
    ]);
    setName("");
  };

  const toggleHabit = (id) => {
    const today = todayKey();
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;

        const nowDone = !h.isDoneToday;

        if (!nowDone) {
          // unchecking: just mark not done today
          return { ...h, isDoneToday: false };
        }

        // checking as done
        if (h.lastDoneDate === today) {
          // already counted today
          return { ...h, isDoneToday: true };
        }

        let newStreak = 1;
        if (h.lastDoneDate) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yKey = yesterday.toISOString().slice(0, 10);
          if (h.lastDoneDate === yKey) {
            newStreak = (h.streak || 0) + 1;
          }
        }

        return {
          ...h,
          isDoneToday: true,
          lastDoneDate: today,
          streak: newStreak,
        };
      })
    );
  };

  return (
    <div className="card">
      <h2>Habits</h2>
      <div className="input-row">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New habit (e.g., Drink water)"
        />
        <button onClick={addHabit}>Add</button>
      </div>
      <ul className="list">
        {habits.map((habit) => (
          <li key={habit.id} className="list-item">
            <div>
              <div>{habit.name}</div>
              <div className="streak">
                🔥 Streak: {habit.streak || 0} day
                {habit.streak === 1 ? "" : "s"}
              </div>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={habit.isDoneToday}
                onChange={() => toggleHabit(habit.id)}
              />
              <span className="toggle-label">
                {habit.isDoneToday ? "Done today" : "Not yet"}
              </span>
            </label>
          </li>
        ))}
        {habits.length === 0 && <p className="empty">No habits yet.</p>}
      </ul>
    </div>
  );
}
