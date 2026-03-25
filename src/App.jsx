import React from 'react';
import './App.css';
import Tasks from './components/Tasks';
import Habits from './components/Habits';
import MoodHealth from './components/MoodHealth';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Daily Life Organizer</h1>
      </header>
      <main className="main-content">
        <Tasks />
        <Habits />
        <MoodHealth />
      </main>
    </div>
  );
}

export default App;
