import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Smile } from 'lucide-react';
import { activities } from '../data/activities';
import type { Activity } from '../types';

const ActivityList: React.FC = () => {
  const { letter } = useParams<{ letter: string }>();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState({ name: '', emoji: '😊' });
  const [localActivities, setLocalActivities] = useState(() => {
    const saved = localStorage.getItem(`customActivities_${letter}`);
    return saved ? JSON.parse(saved) : [];
  });
  
  if (!letter || !activities[letter]) {
    return <div>Lettre non trouvée</div>;
  }

  const handleSelectActivity = (activity: Activity) => {
    const savedActivities = localStorage.getItem('selectedActivities');
    const currentActivities = savedActivities ? JSON.parse(savedActivities) : {};
    
    const updatedActivities = {
      ...currentActivities,
      [letter]: {
        ...activity,
        letter,
      },
    };
    
    localStorage.setItem('selectedActivities', JSON.stringify(updatedActivities));
    navigate('/');
  };

  const handleAddActivity = () => {
    if (newActivity.name.trim()) {
      const customActivity = {
        name: newActivity.name.trim(),
        emoji: newActivity.emoji
      };
      
      const updatedActivities = [...localActivities, customActivity];
      setLocalActivities(updatedActivities);
      localStorage.setItem(`customActivities_${letter}`, JSON.stringify(updatedActivities));
      
      setNewActivity({ name: '', emoji: '😊' });
      setShowAddForm(false);
    }
  };

  const emojiCategories = {
    "Sports & Loisirs": ['⚽️', '🎾', '🏀', '🏈', '⚾️', '🎳', '🏉', '🎱', '🏓', '🏸', '🏊‍♂️', '🚴‍♂️', '🏃‍♂️', '🧗‍♂️', '⛷️', '🏂', '🎣'],
    "Arts & Culture": ['🎭', '🎨', '🎬', '🎵', '🎸', '🎹', '🎺', '🎻', '📚', '🎪', '🎯', '🎲', '🎮'],
    "Activités": ['🍳', '🌳', '🏕️', '⛺️', '🏖️', '🗺️', '🎪', '🎡', '🎢', '🛝', '🎨', '📸', '🎥'],
    "Nourriture": ['🍕', '🍔', '🍜', '🍣', '🍪', '🍷', '🍺', '☕️', '🧁', '🍰', '🥐', '🥖', '🥗'],
    "Nature": ['🌺', '🌲', '🌊', '🏔️', '🌅', '🌄', '🏞️', '🦋', '🐠', '🦜', '🦊', '🐬', '🐋'],
    "Transport": ['🚗', '🚲', '🛵', '🏍️', '🚂', '⛵️', '🚤', '🛶', '🎠', '🚃', '🚡', '🛸', '✈️']
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Retour
      </button>
      
      <div className="space-y-4">
        {activities[letter].concat(localActivities).map((activity, index) => (
          <button
            key={index}
            onClick={() => handleSelectActivity(activity)}
            className="w-full bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{activity.emoji}</span>
              <span className="text-xl text-gray-800">{activity.name}</span>
            </div>
          </button>
        ))}

        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600">Ajouter une activité</span>
          </button>
        ) : (
          <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-semibold">Nouvelle activité</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'activité
                </label>
                <input
                  type="text"
                  value={newActivity.name}
                  onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Entrez le nom de l'activité"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emoji sélectionné : <span className="text-xl">{newActivity.emoji}</span>
                </label>
                <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-200 p-4">
                  {Object.entries(emojiCategories).map(([category, emojis]) => (
                    <div key={category} className="mb-4 last:mb-0">
                      <h4 className="text-sm font-medium text-gray-600 mb-2">{category}</h4>
                      <div className="grid grid-cols-8 gap-2">
                        {emojis.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => setNewActivity({ ...newActivity, emoji })}
                            className={`text-xl p-2 rounded hover:bg-gray-100 ${
                              newActivity.emoji === emoji ? 'bg-purple-100' : ''
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddActivity}
                disabled={!newActivity.name.trim()}
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Ajouter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityList;