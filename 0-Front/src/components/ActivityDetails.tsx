import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, RefreshCw, Trash2 } from 'lucide-react';
import type { SelectedActivity } from '../types';

const ActivityDetails: React.FC = () => {
  const { letter } = useParams<{ letter: string }>();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<SelectedActivity | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('selectedActivities');
    if (saved && letter) {
      const activities = JSON.parse(saved);
      setActivity(activities[letter]);
    }
  }, [letter]);

  if (!letter || !activity) {
    return <div>Activité non trouvée</div>;
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const savedActivities = localStorage.getItem('selectedActivities');
        const currentActivities = savedActivities ? JSON.parse(savedActivities) : {};

        const updatedActivities = {
          ...currentActivities,
          [letter]: {
            ...activity,
            photoUrl: reader.result as string,
          },
        };

        localStorage.setItem('selectedActivities', JSON.stringify(updatedActivities));
        navigate('/');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteActivity = () => {
    const savedActivities = localStorage.getItem('selectedActivities');
    if (savedActivities) {
      const currentActivities = JSON.parse(savedActivities);
      delete currentActivities[letter];
      localStorage.setItem('selectedActivities', JSON.stringify(currentActivities));
    }
    navigate('/');
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

        <div className="glass-effect rounded-3xl p-8 card-shadow">
          <div className="flex items-center justify-center mb-8">
            <span className="text-8xl animate-bounce">{activity.emoji}</span>
          </div>

          <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8">
            {activity.name}
          </h2>

          <div className="space-y-4">
            <button
                onClick={() => navigate(`/letter/${letter}`)}
                className="w-full glass-effect rounded-2xl p-6 flex items-center justify-between card-hover transition-all duration-300"
            >
              <span className="text-lg font-medium text-gray-800">Changer d'activité</span>
              <RefreshCw className="w-6 h-6 text-purple-600" />
            </button>

            <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full glass-effect rounded-2xl p-6 flex items-center justify-between card-hover transition-all duration-300"
            >
            <span className="text-lg font-medium text-gray-800">
              {activity.photoUrl ? 'Changer la photo souvenir' : 'Ajouter une photo souvenir'}
            </span>
              <Camera className="w-6 h-6 text-purple-600" />
            </button>

            <button
                onClick={handleDeleteActivity}
                className="w-full bg-red-50 rounded-2xl p-6 flex items-center justify-between hover:bg-red-100 transition-all duration-300 card-hover"
            >
              <span className="text-lg font-medium text-red-600">Supprimer l'activité</span>
              <Trash2 className="w-6 h-6 text-red-600" />
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
            />
          </div>
        </div>
      </div>
  );
};

export default ActivityDetails;