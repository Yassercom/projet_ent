import { useState } from 'react';

interface TeacherSidebarProps {
  activeContent?: 'dashboard' | 'courses' | 'add-course' | 'profile';
  onNavigate?: (content: 'dashboard' | 'courses' | 'add-course' | 'profile') => void;
}

const TeacherSidebar = ({ activeContent = 'dashboard', onNavigate }: TeacherSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  // Mappage entre les chemins et les identifiants de contenu
  const pathToContent: Record<string, 'dashboard' | 'courses' | 'add-course' | 'profile'> = {
    '/teacher/dashboard': 'dashboard',
    '/teacher/courses': 'courses',
    '/teacher/courses/add': 'add-course',
    '/teacher/profile': 'profile'
  };

  // Vérifier si un élément est actif
  const isContentActive = (contentId: 'dashboard' | 'courses' | 'add-course' | 'profile') => {
    return activeContent === contentId;
  };

  const menuItems = [
    {
      name: 'Accueil',
      path: '/teacher/dashboard',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: 'Mes cours',
      path: '/teacher/courses',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      name: 'Ajouter un cours',
      path: '/teacher/courses/add',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      name: 'Mon profil',
      path: '/teacher/profile',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  return (
    <aside 
      className={`bg-est-blue text-white h-screen transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } fixed left-0 top-0 z-30 flex flex-col shadow-lg`}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div className="font-bold text-xl">EST Salé</div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-blue-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"}
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`flex items-center py-3 px-4 rounded-lg transition-colors ${
                isContentActive(pathToContent[item.path])
                  ? 'bg-est-green/20 text-white'
                  : 'text-white/80 hover:bg-blue-800 hover:text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) {
                  onNavigate(pathToContent[item.path]);
                }
              }}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </a>
          ))}
        </nav>
      </div>

      <div className="p-4">
        <div className={`${collapsed ? 'hidden' : 'block'} text-sm text-white/60`}>
          <div>UM5 - EST Salé</div>
          <div>© {new Date().getFullYear()}</div>
        </div>
      </div>
    </aside>
  );
};

export default TeacherSidebar;
