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
      <div className="max-w-2xl mx-auto">
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
                  className="w-full glass-effect rounded-2xl p-6 card-shadow card-hover transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">{activity.emoji}</span>
                  <span className="text-xl text-gray-800 font-medium">{activity.name}</span>
                </div>
              </button>
          ))}

          {!showAddForm ? (
              <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full glass-effect rounded-2xl p-6 border-2 border-dashed border-purple-200 hover:border-purple-300 transition-colors flex items-center justify-center space-x-2 card-hover"
              >
                <Plus className="w-5 h-5 text-purple-600" />
                <span className="text-purple-600 font-medium">Ajouter une activité</span>
              </button>
          ) : (
              <div className="glass-effect rounded-2xl p-6 card-shadow space-y-4">
                <div className="flex items-center space-x-4 mb-4">
                  <button
                      onClick={() => setShowAddForm(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-semibold text-gray-800">Nouvelle activité</h3>
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
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="Entrez le nom de l'activité"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emoji sélectionné : <span className="text-xl">{newActivity.emoji}</span>
                    </label>
                    <div className="max-h-48 overflow-y-auto rounded-xl border border-gray-200 p-4">
                      {Object.entries(emojiCategories).map(([category, emojis]) => (
                          <div key={category} className="mb-4 last:mb-0">
                            <h4 className="text-sm font-medium text-gray-600 mb-2">{category}</h4>
                            <div className="grid grid-cols-8 gap-2">
                              {emojis.map((emoji) => (
                                  <button
                                      key={emoji}
                                      onClick={() => setNewActivity({ ...newActivity, emoji })}
                                      className={`text-xl p-2 rounded-lg transition-all duration-300 hover:bg-purple-50 ${
                                          newActivity.emoji === emoji ? 'bg-purple-100 scale-110' : ''
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
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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