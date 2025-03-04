import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LetterGrid from './components/LetterGrid';
import ActivityList from './components/ActivityList';
import ActivityDetails from './components/ActivityDetails';
import Profile from './components/Profile';
import Navigation from './components/Navigation';

function App() {
  return (
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 animate-gradient">
          <div className="container mx-auto py-12 px-4">
            <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-12">
              Alphabet Dating
            </h1>
            <Routes>
              <Route path="/" element={<LetterGrid />} />
              <Route path="/letter/:letter" element={<ActivityList />} />
              <Route path="/activity/:letter" element={<ActivityDetails />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <Navigation />
        </div>
      </Router>
  );
}

export default App