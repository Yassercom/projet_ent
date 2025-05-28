import { useState } from 'react';
import ConfirmModal from '../../../common/ConfirmModal';

interface StudentHeaderProps {
  studentName: string;
  studentInfo: {
    filiere: string;
    groupe: string;
    annee: string;
  };
  onLogout?: () => void;
  onProfileClick?: () => void;
}

const StudentHeader = ({ studentName, studentInfo, onLogout, onProfileClick }: StudentHeaderProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    // Ouvrir la boîte de dialogue de confirmation
    setShowLogoutConfirm(true);
    // Fermer le menu déroulant
    setDropdownOpen(false);
  };
  
  const confirmLogout = () => {
    // Appeler la fonction onLogout si elle existe
    if (onLogout) {
      onLogout();
    } else {
      // Comportement par défaut si onLogout n'est pas fourni
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
  };
  
  const cancelLogout = () => {
    // Fermer la boîte de dialogue de confirmation
    setShowLogoutConfirm(false);
  };

  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Accueil</h1>
          <p className="text-gray-600 text-sm">
            {studentInfo.filiere} | Groupe {studentInfo.groupe} | {studentInfo.annee}
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 text-gray-700 hover:text-secondary focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
              {studentName.charAt(0)}
            </div>
            <span className="hidden md:inline-block">{studentName}</span>
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
              <a 
                href="#" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(false);
                  if (onProfileClick) onProfileClick();
                }}
              >
                Mon profil
              </a>
              <a href="/student/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
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

export default StudentHeader;
