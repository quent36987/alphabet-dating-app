import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { activities } from '../data/activities';
import type { SelectedActivity } from '../types';

const LetterGrid: React.FC = () => {
  const navigate = useNavigate();
  const letters = Object.keys(activities);
  const [selectedActivities, setSelectedActivities] = useState<Record<string, SelectedActivity>>({});

  useEffect(() => {
    const saved = localStorage.getItem('selectedActivities');
    if (saved) {
      setSelectedActivities(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto p-6">
      {letters.map((letter) => {
        const selected = selectedActivities[letter];
        
        return (
          <button
            key={letter}
            onClick={() => selected ? navigate(`/activity/${letter}`) : navigate(`/letter/${letter}`)}
            className="aspect-square bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center relative group overflow-hidden"
          >
            {selected ? (
              <>
                {selected.photoUrl ? (
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${selected.photoUrl})` }}
                  />
                ) : (
                  <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {selected.emoji}
                  </span>
                )}
                <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white">
                      {selected.name.charAt(0)}
                    </span>
                    <span className="text-sm text-white/90">
                      {selected.name.slice(1)}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <span className="text-4xl font-bold text-gray-800 group-hover:scale-110 transition-transform duration-300">
                {letter}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default LetterGrid;