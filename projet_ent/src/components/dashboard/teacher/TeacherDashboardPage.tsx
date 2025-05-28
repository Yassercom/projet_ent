import { useEffect, useState } from 'react';
import CoursesPage from './pages/CoursesPage';
import AddEditCoursePage from './pages/AddEditCoursePage';
import TeacherProfilePage from './pages/TeacherProfilePage';
import TeacherHeader from './header/TeacherHeader';
import TeacherSidebar from './sidebar/TeacherSidebar';
import StatsCards from './widgets/StatsCards';
import LatestCoursesWidget from './widgets/LatestCoursesWidget';
import CalendarWidget from './widgets/CalendarWidget';
import AnnouncementsWidget from './widgets/AnnouncementsWidget';
import type { Course } from './widgets/LatestCoursesWidget';
import type { CalendarEvent } from './widgets/CalendarWidget';
import type { Announcement } from './widgets/AnnouncementsWidget';

interface TeacherDashboardPageProps {
  onLogout?: () => void;
  content?: 'dashboard' | 'courses' | 'add-course' | 'profile';
}

// Données simulées pour l'enseignant
const teacher = {
  name: 'Dr. Mohammed Alami',
  info: {
    department: 'Département Informatique',
    role: 'Professeur'
  }
};

// Données factices pour les statistiques
const mockStatsData = {
  coursesCount: 12,
  groupsCount: 5,
  studentsCount: 120,
  isLoading: false
};

// Données factices pour les cours récents
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Intelligence Artificielle et Machine Learning',
    description: 'Introduction aux concepts de l\'IA et applications pratiques avec Python',
    date: '18 mai 2025',
    group: 'IAWM4',
  },
  {
    id: '2',
    title: 'Bases de données avancées',
    description: 'Conception et optimisation des bases de données NoSQL',
    date: '15 mai 2025',
    group: 'BDIA3',
  },
  {
    id: '3',
    title: 'Programmation Web',
    description: 'Développement full-stack avec React et Node.js',
    date: '10 mai 2025',
    group: 'IAWM2',
  },
];

// Données factices pour le calendrier
const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Cours IA - IAWM4',
    date: '2025-05-22',
    time: '09:00-12:00',
    type: 'course',
  },
  {
    id: '2',
    title: 'Examen BDD - BDIA3',
    date: '2025-05-25',
    time: '14:00-16:00',
    type: 'exam',
  },
  {
    id: '3',
    title: 'Réunion département',
    date: '2025-05-23',
    time: '10:00-11:30',
    type: 'meeting',
  },
];

// Données factices pour les annonces
const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Fermeture exceptionnelle',
    content: 'L\'établissement sera fermé le vendredi 30 mai 2025 pour maintenance des locaux.',
    date: '19 mai 2025',
    author: 'Administration',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Mise à jour des outils pédagogiques',
    content: 'De nouveaux outils sont disponibles pour les enseignants. Une formation sera organisée la semaine prochaine.',
    date: '17 mai 2025',
    author: 'Service Informatique',
  },
];

const TeacherDashboardPage = ({ onLogout, content = 'dashboard' }: TeacherDashboardPageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeContent, setActiveContent] = useState<'dashboard' | 'courses' | 'add-course' | 'profile'>(content);
  const [stats, setStats] = useState({ ...mockStatsData, isLoading: true });
  const [courses, setCourses] = useState<Course[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Simule un chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Charger les données simulées
      setStats({ ...mockStatsData, isLoading: false });
      setCourses(mockCourses);
      setEvents(mockEvents);
      setAnnouncements(mockAnnouncements);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mettre à jour le contenu actif lorsque la prop content change
  useEffect(() => {
    if (content) {
      setActiveContent(content);
    }
  }, [content]);
  
  // Fonction pour changer le contenu affiché
  const handleContentChange = (newContent: 'dashboard' | 'courses' | 'add-course' | 'profile') => {
    setActiveContent(newContent);
  };

  // Les écouteurs d'événements ont été retirés car ils ne sont pas nécessaires pour cette version

  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherSidebar 
        activeContent={activeContent} 
        onNavigate={handleContentChange} 
      />
      <div className="flex-1 flex flex-col transition-all duration-300 ml-64">
        <TeacherHeader 
          teacherName={teacher.name} 
          teacherInfo={teacher.info} 
          onLogout={onLogout} 
          onProfileClick={() => handleContentChange('profile')}
        />
        <main className="flex-1 p-6">
          {/* Affichage conditionnel en fonction du contenu demandé */}
          {isLoading ? (
            // Affiche le spinner de chargement si nécessaire
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-est-blue"></div>
            </div>
          ) : activeContent === 'profile' ? (
            // Affiche la page de profil
            <div className="p-6">
              <TeacherProfilePage onLogout={onLogout} />
            </div>
          ) : activeContent === 'courses' ? (
            // Affiche la page des cours
            <CoursesPage />
          ) : activeContent === 'add-course' ? (
            // Affiche la page d'ajout de cours
            <div className="p-6">
              <AddEditCoursePage />
            </div>
          ) : (
            // Affiche le dashboard par défaut
            <div className="space-y-6">
              {/* Titre de la page */}
              <div className="border-b pb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Tableau de bord</h1>
                <p className="text-gray-600">Bienvenue, {teacher.name}. Voici un résumé de votre activité.</p>
              </div>
              
              {/* Statistiques */}
              <StatsCards data={stats} />

              {/* Grille principale avec widgets */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Cours récents (prend 2 colonnes) */}
                <LatestCoursesWidget courses={courses} isLoading={isLoading} />
                
                {/* Colonne de droite */}
                <div className="space-y-6">
                  {/* Calendrier */}
                  <CalendarWidget events={events} isLoading={isLoading} />
                  
                  {/* Annonces */}
                  <AnnouncementsWidget announcements={announcements} isLoading={isLoading} />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
