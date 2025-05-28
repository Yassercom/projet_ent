import { useState } from 'react';
import ConfirmModal from '../../../common/ConfirmModal';

interface AdminHeaderProps {
  adminName: string;
  adminRole?: string;
  onLogout?: () => void;
}

const AdminHeader = ({ adminName, adminRole = "Super Administrateur", onLogout }: AdminHeaderProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setDropdownOpen(false);
  };
  
  const confirmLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
  };
  
  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <header className="bg-white shadow-md py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Logo EST Salé */}
          <div className="mr-4">
            <img 
              src="/logo-est.png" 
              alt="EST Salé Logo" 
              className="h-12 w-auto"
              onError={(e) => {
                // Fallback si l'image n'est pas trouvée
                e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40"><rect width="60" height="40" fill="%2300b43d"/><text x="50%" y="50%" font-family="Arial" font-size="14" fill="white" text-anchor="middle" dominant-baseline="middle">EST</text></svg>';
              }}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-est-green">Panneau d'administration – ENT EST de Salé</h1>
            {adminRole && (
              <p className="text-gray-600 text-sm">
                {adminRole}
              </p>
            )}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 text-gray-700 hover:text-est-green focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-est-green text-white flex items-center justify-center">
              {adminName.charAt(0)}
            </div>
            <span className="hidden md:inline-block">{adminName}</span>
            <svg 
              className={`w-4 h-4 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-10">
              <a href="/admin/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Mon profil
              </a>
              <a href="/admin/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Paramètres
              </a>
              <button
                onClick={handleLogoutClick}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal de confirmation de déconnexion */}
      <ConfirmModal
        isOpen={showLogoutConfirm}
        title="Confirmation de déconnexion"
        message="Êtes-vous sûr de vouloir vous déconnecter de votre session ?"
        confirmText="Déconnexion"
        cancelText="Annuler"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </header>
  );
};

export default AdminHeader;
