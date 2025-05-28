import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Announcement } from '../widgets/RecentAnnouncementsWidget';

interface AnnouncementPageProps {
  onLogout?: () => void;
  isAddMode?: boolean;
  isEditMode?: boolean;
}

const AnnouncementsPage: React.FC<AnnouncementPageProps> = ({ onLogout, isAddMode, isEditMode }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTarget, setFilterTarget] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  // Données factices pour les annonces
  const mockAnnouncements: Announcement[] = [
    {
      id: '1',
      title: 'Maintenance du système',
      content: 'Le système sera en maintenance le dimanche 25 mai 2025 de 2h à 6h du matin. Certaines fonctionnalités pourraient être temporairement indisponibles.',
      date: '20 mai 2025',
      author: 'Admin Système',
      target: 'all',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Mise à jour des emplois du temps',
      content: 'Les emplois du temps pour le semestre 2 sont maintenant disponibles. Les enseignants peuvent consulter leurs créneaux de cours.',
      date: '18 mai 2025',
      author: 'Service Scolarité',
      target: 'teachers',
    },
    {
      id: '3',
      title: 'Période d\'examens',
      content: 'La période d\'examens finaux commencera le 15 juin 2025. Les salles et horaires seront communiqués prochainement.',
      date: '15 mai 2025',
      author: 'Service Examens',
      target: 'students',
    },
    {
      id: '4',
      title: 'Fermeture exceptionnelle',
      content: 'L\'établissement sera fermé le lundi 5 mai 2025 en raison de la journée nationale de l\'enseignement supérieur.',
      date: '2 mai 2025',
      author: 'Direction',
      target: 'all',
      priority: 'high',
    },
    {
      id: '5',
      title: 'Atelier sur l\'intelligence artificielle',
      content: 'Un atelier sur l\'IA et le Machine Learning sera organisé le 10 mai 2025 à l\'amphithéâtre principal. Inscription obligatoire.',
      date: '28 avril 2025',
      author: 'Département Informatique',
      target: 'students',
    },
    {
      id: '6',
      title: 'Réunion des coordinateurs',
      content: 'Une réunion des coordinateurs de filières aura lieu le jeudi 8 mai 2025 à 14h en salle de réunion R2.',
      date: '25 avril 2025',
      author: 'Direction des études',
      target: 'teachers',
    },
    {
      id: '7',
      title: 'Conférence sur la cybersécurité',
      content: 'Le Prof. Ahmed Bennani animera une conférence sur les nouveaux défis de la cybersécurité le mercredi 7 mai 2025 à 15h.',
      date: '20 avril 2025',
      author: 'Club Informatique',
      target: 'all',
    }
  ];

  // Liste des cibles pour le filtre
  const targets = [
    { value: 'all', label: 'Tous' },
    { value: 'students', label: 'Étudiants' },
    { value: 'teachers', label: 'Enseignants' }
  ];

  // Liste des priorités pour le filtre
  const priorities = [
    { value: 'normal', label: 'Normale' },
    { value: 'high', label: 'Importante' }
  ];

  useEffect(() => {
    // Simuler un appel API
    const timer = setTimeout(() => {
      setAnnouncements(mockAnnouncements);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrer les annonces en fonction des critères
  const filteredAnnouncements = announcements.filter(
    (announcement) => {
      const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           announcement.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTarget = filterTarget === '' || announcement.target === filterTarget;
      
      const matchesPriority = filterPriority === '' || 
                             (filterPriority === 'high' && announcement.priority === 'high') ||
                             (filterPriority === 'normal' && (!announcement.priority || announcement.priority === 'normal'));
      
      return matchesSearch && matchesTarget && matchesPriority;
    }
  );

  // Fonction pour obtenir la couleur en fonction de la cible
  const getTargetColor = (target: string) => {
    switch(target) {
      case 'all':
        return 'bg-blue-100 text-blue-800';
      case 'students':
        return 'bg-green-100 text-green-800';
      case 'teachers':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Fonction pour obtenir le libellé de la cible
  const getTargetLabel = (target: string) => {
    switch(target) {
      case 'all':
        return 'Tous';
      case 'students':
        return 'Étudiants';
      case 'teachers':
        return 'Enseignants';
      default:
        return target;
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Gestion des annonces</h1>
        <p className="text-gray-600">Créez et gérez les annonces pour l'ensemble de l'établissement.</p>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={filterTarget}
            onChange={(e) => setFilterTarget(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-est-green focus:border-est-green"
          >
            <option value="">Toutes les cibles</option>
            {targets.map((target) => (
              <option key={target.value} value={target.value}>{target.label}</option>
            ))}
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-est-green focus:border-est-green"
          >
            <option value="">Toutes les priorités</option>
            {priorities.map((priority) => (
              <option key={priority.value} value={priority.value}>{priority.label}</option>
            ))}
          </select>
        </div>

        <button
          className="bg-est-green hover:bg-est-green/90 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Créer une annonce
        </button>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : filteredAnnouncements.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune annonce trouvée</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterTarget || filterPriority ? 
              "Aucun résultat pour votre recherche." : 
              "Commencez par créer une annonce."
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <div 
              key={announcement.id} 
              className={`bg-white rounded-lg shadow-sm overflow-hidden ${
                announcement.priority === 'high' ? 'border-l-4 border-est-green' : ''
              }`}
            >
              <div className="p-5">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                  <div className="flex space-x-2">
                    {announcement.priority === 'high' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Important
                      </span>
                    )}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getTargetColor(announcement.target)
                    }`}>
                      {getTargetLabel(announcement.target)}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-3">{announcement.content}</p>
                
                <div className="flex flex-wrap justify-between items-center mt-4 pt-3 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    <span>Publié le {announcement.date}</span>
                    <span className="mx-2">•</span>
                    <span>Par {announcement.author}</span>
                  </div>
                  
                  <div className="flex space-x-3 mt-2 sm:mt-0">
                    <Link to={`/admin/announcements/edit/${announcement.id}`} className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-est-green bg-est-green/10 hover:bg-est-green/20">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Modifier
                    </Link>
                    
                    <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-600 bg-red-50 hover:bg-red-100">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;
