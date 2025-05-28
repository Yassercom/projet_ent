import React from 'react';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  target: 'all' | 'students' | 'teachers';
  priority?: 'normal' | 'high';
}

interface RecentAnnouncementsWidgetProps {
  announcements: Announcement[];
  isLoading: boolean;
}

const RecentAnnouncementsWidget: React.FC<RecentAnnouncementsWidgetProps> = ({ announcements, isLoading }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Annonces récentes</h2>
        <a 
          href="/admin/announcements" 
          className="text-sm font-medium text-est-green hover:text-est-green/80"
        >
          Voir toutes
        </a>
      </div>
      
      {isLoading ? (
        <div className="p-4 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              <div className="mt-2 h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : announcements.length === 0 ? (
        <div className="p-10 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune annonce</h3>
          <p className="mt-1 text-sm text-gray-500">Créez une annonce pour informer les utilisateurs.</p>
          <div className="mt-6">
            <a 
              href="/admin/announcements/create" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-est-green hover:bg-est-green/90"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Créer une annonce
            </a>
          </div>
        </div>
      ) : (
        <div className="divide-y max-h-[400px] overflow-y-auto">
          {announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className={`p-4 hover:bg-gray-50 transition-colors duration-150 ${
                announcement.priority === 'high' ? 'border-l-4 border-est-green' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-est-green">
                    {announcement.title}
                  </h3>
                  <div className="flex space-x-2">
                    {announcement.priority === 'high' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        Important
                      </span>
                    )}
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      announcement.target === 'all' ? 'bg-blue-100 text-blue-800' :
                      announcement.target === 'students' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {announcement.target === 'all' ? 'Tous' :
                       announcement.target === 'students' ? 'Étudiants' : 'Enseignants'}
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{announcement.content}</p>
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <span>{announcement.date}</span>
                  <span className="mx-1">•</span>
                  <span>Par {announcement.author}</span>
                </div>
                <div className="mt-2 flex">
                  <a 
                    href={`/admin/announcements/edit/${announcement.id}`}
                    className="text-sm text-est-green hover:text-est-green/80 mr-4"
                  >
                    Modifier
                  </a>
                  <button 
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentAnnouncementsWidget;
