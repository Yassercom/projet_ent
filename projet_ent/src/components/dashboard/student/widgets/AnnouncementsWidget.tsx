import React from 'react';

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  important: boolean;
}

interface AnnouncementsWidgetProps {
  isLoading?: boolean;
}

const AnnouncementsWidget: React.FC<AnnouncementsWidgetProps> = ({ isLoading = false }) => {
  // Mock data
  const announcements: Announcement[] = [
    {
      id: 1,
      title: "Examens de fin de semestre",
      content: "Les examens de fin de semestre se dérouleront du 15 au 30 juin 2025. Consultez le planning détaillé.",
      date: "18 mai 2025",
      author: "Service des examens",
      important: true,
    },
    {
      id: 2,
      title: "Atelier sur l'intelligence artificielle",
      content: "Un atelier sur l'IA aura lieu le 25 mai 2025 à 14h00 en salle B12.",
      date: "15 mai 2025",
      author: "Club Informatique",
      important: false,
    },
    {
      id: 3,
      title: "Fermeture de la bibliothèque",
      content: "La bibliothèque sera fermée le weekend du 22-23 mai pour inventaire.",
      date: "12 mai 2025",
      author: "Administration",
      important: false,
    },
    {
      id: 4,
      title: "Réunion d'orientation professionnelle",
      content: "Une réunion d'orientation professionnelle est organisée le 27 mai à 10h00.",
      date: "10 mai 2025",
      author: "Service des stages",
      important: true,
    }
  ];

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="mb-4 pb-4 border-b border-gray-100">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="flex justify-between mt-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-primary mb-4">Annonces récentes</h2>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div 
            key={announcement.id} 
            className={`pb-4 ${
              announcement.id !== announcements.length ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="flex items-start">
              <h3 className="font-semibold text-gray-800 flex-1">
                {announcement.title}
                {announcement.important && (
                  <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
                    Important
                  </span>
                )}
              </h3>
              <span className="text-xs text-gray-500">{announcement.date}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{announcement.content}</p>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">Par: {announcement.author}</span>
              <a href="#" className="text-xs text-secondary hover:underline">
                Lire plus
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <a href="#" className="text-secondary hover:text-secondary-dark text-sm font-medium">
          Voir toutes les annonces
        </a>
      </div>
    </div>
  );
};

export default AnnouncementsWidget;
