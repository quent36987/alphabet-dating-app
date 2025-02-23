import React from 'react';
import { Trash2 } from 'lucide-react';

const Profile: React.FC = () => {
  const handleReset = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 pb-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Profil</h1>
      
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Paramètres</h2>
        
        <button
          onClick={handleReset}
          className="w-full bg-red-50 rounded-xl p-4 flex items-center justify-between hover:bg-red-100 transition-colors"
        >
          <div>
            <span className="block text-red-600 font-medium">Réinitialiser l'application</span>
            <span className="text-sm text-red-500">Supprimer toutes les activités et photos</span>
          </div>
          <Trash2 className="w-6 h-6 text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default Profile;