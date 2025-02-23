import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, User } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isProfile = location.pathname === '/profile';

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-2xl mx-auto flex justify-around">
        <button
          onClick={() => navigate('/')}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            isHome ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Accueil</span>
        </button>
        
        <button
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            isProfile ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profil</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;