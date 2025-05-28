import { useState } from 'react';

interface StudentSidebarProps {
  onNavigate?: (content: 'dashboard' | 'profile' | 'courses') => void;
  activeContent?: 'dashboard' | 'profile' | 'courses';
}

const StudentSidebar = ({ onNavigate, activeContent = 'dashboard' }: StudentSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState<string>(activeContent);

  const links = [
    { id: 'dashboard', label: 'Tableau de bord', icon: 'home' },
    { id: 'courses', label: 'Mes cours', icon: 'book' },
    { id: 'schedule', label: 'Emploi du temps', icon: 'calendar', disabled: true },
    { id: 'grades', label: 'Notes et résultats', icon: 'chart-bar', disabled: true },
    { id: 'absences', label: 'Absences', icon: 'exclamation-circle', disabled: true },
    { id: 'profile', label: 'Mon profil', icon: 'user' },
  ];

  // Fonction pour rendre les icônes (utilisation de classes tailwind pour des icônes simples)
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'book':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'calendar':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'chart-bar':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'exclamation-circle':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'user':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <aside 
      className={`bg-primary text-white ${
        collapsed ? 'w-20' : 'w-64'
      } min-h-screen transition-all duration-300 ease-in-out`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className={`${collapsed ? 'hidden' : 'block'}`}>
          <h2 className="text-xl font-bold">ENT EST Salé</h2>
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-1 rounded-lg hover:bg-primary-dark focus:outline-none"
        >
          <svg 
            className={`w-6 h-6 transition-transform ${collapsed ? 'transform rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <nav className="mt-6">
        <ul>
          {links.map((link) => (
            <li key={link.id} className="mb-2">
              <a
                href={link.disabled ? '#' : `/student/${link.id}`}
                className={`flex items-center p-4 ${
                  collapsed ? 'justify-center' : 'space-x-3'
                } ${
                  link.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary-light cursor-pointer'
                } transition-colors duration-200 ${
                  activeLink === link.id && !link.disabled ? 'bg-secondary' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  if (link.disabled) return;
                  
                  setActiveLink(link.id);
                  
                  // Si le lien est 'profile', 'courses' ou 'dashboard' et que onNavigate est défini
                  if (onNavigate && (link.id === 'profile' || link.id === 'dashboard' || link.id === 'courses')) {
                    onNavigate(link.id as 'dashboard' | 'profile' | 'courses');
                  }
                }}
              >
                <span>{renderIcon(link.icon)}</span>
                {!collapsed && <span>{link.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4">
        <button 
          onClick={() => {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }}
          className={`flex items-center ${
            collapsed ? 'justify-center' : 'space-x-3'
          } w-full text-white hover:text-red-300 transition-colors duration-200`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
};

export default StudentSidebar;
