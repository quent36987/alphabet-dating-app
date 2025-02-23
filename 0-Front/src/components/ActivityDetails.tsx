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
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Retour
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-center mb-8">
          <span className="text-8xl">{activity.emoji}</span>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          {activity.name}
        </h2>

        <div className="space-y-4">
          <button
            onClick={() => navigate(`/letter/${letter}`)}
            className="w-full bg-gray-100 rounded-xl p-6 flex items-center justify-between hover:bg-gray-200 transition-colors"
          >
            <span className="text-lg text-gray-800">Changer d'activité</span>
            <RefreshCw className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-gray-100 rounded-xl p-6 flex items-center justify-between hover:bg-gray-200 transition-colors"
          >
            <span className="text-lg text-gray-800">
              {activity.photoUrl ? 'Changer la photo souvenir' : 'Ajouter une photo souvenir'}
            </span>
            <Camera className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={handleDeleteActivity}
            className="w-full bg-red-50 rounded-xl p-6 flex items-center justify-between hover:bg-red-100 transition-colors"
          >
            <span className="text-lg text-red-600">Supprimer l'activité</span>
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