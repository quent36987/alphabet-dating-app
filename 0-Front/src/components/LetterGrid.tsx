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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {letters.map((letter) => {
          const selected = selectedActivities[letter];

          return (
              <button
                  key={letter}
                  onClick={() => selected ? navigate(`/activity/${letter}`) : navigate(`/letter/${letter}`)}
                  className="aspect-square glass-effect rounded-3xl card-shadow card-hover transition-all duration-300 flex flex-col items-center justify-center relative group overflow-hidden"
              >
                {selected ? (
                    <>
                      {selected.photoUrl ? (
                          <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                              style={{ backgroundImage: `url(${selected.photoUrl})` }}
                          />
                      ) : (
                          <span className="text-7xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    {selected.emoji}
                  </span>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-4 glass-effect">
                        <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-800">
                      {selected.name.charAt(0)}
                    </span>
                          <span className="text-sm font-medium text-gray-600">
                      {selected.name.slice(1)}
                    </span>
                        </div>
                      </div>
                    </>
                ) : (
                    <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-pink-600 group-hover:scale-110 transition-transform duration-300">
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