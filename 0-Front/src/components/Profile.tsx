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
      <div className="max-w-2xl mx-auto pb-24">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8">
          Profil
        </h1>

        <div className="glass-effect rounded-3xl p-8 card-shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Paramètres</h2>

          <button
              onClick={handleReset}
              className="w-full bg-red-50 rounded-2xl p-6 flex items-center justify-between hover:bg-red-100 transition-all duration-300 card-hover group"
          >
            <div>
            <span className="block text-red-600 font-medium group-hover:scale-105 transition-transform duration-300">
              Réinitialiser l'application
            </span>
              <span className="text-sm text-red-500">
              Supprimer toutes les activités et photos
            </span>
            </div>
            <Trash2 className="w-6 h-6 text-red-600 group-hover:rotate-12 transition-transform duration-300" />
          </button>
        </div>
      </div>
  );
};

export default Profile;