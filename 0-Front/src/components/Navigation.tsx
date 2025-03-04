import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, User } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isProfile = location.pathname === '/profile';

  return (
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-effect rounded-full px-6 py-4 card-shadow">
        <div className="flex items-center space-x-12">
          <button
              onClick={() => navigate('/')}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                  isHome ? 'text-purple-600 scale-110' : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">Accueil</span>
          </button>

          <button
              onClick={() => navigate('/profile')}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                  isProfile ? 'text-purple-600 scale-110' : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">Profil</span>
          </button>
        </div>
      </nav>
  );
};

export default Navigation;