import { useState, useEffect } from 'react';
import StudentHeader from './header/StudentHeader';
import StudentSidebar from './sidebar/StudentSidebar';
import LatestCourseCard from './widgets/LatestCourseCard';
import AnnouncementsWidget from './widgets/AnnouncementsWidget';
import CalendarWidget from './widgets/CalendarWidget';
import StatsCards from './widgets/StatsCards';
import ChatBotCard from './widgets/ChatBotCard';
import StudentProfilePage from './pages/StudentProfilePage';
import StudentCoursesPage from './pages/StudentCoursesPage';

interface StudentDashboardPageProps {
  onLogout?: () => void;
  content?: 'dashboard' | 'profile' | 'courses';
}

const StudentDashboardPage = ({ onLogout, content = 'dashboard' }: StudentDashboardPageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeContent, setActiveContent] = useState<'dashboard' | 'profile' | 'courses'>(content);
  
  // Mettre à jour le contenu actif lorsque la prop content change
  useEffect(() => {
    if (content) {
      setActiveContent(content);
    }
  }, [content]);
  
  // Mock student data
  const student = {
    name: 'Ahmed Benjelloun',
    info: {
      filiere: 'Génie Informatique',
      groupe: 'GI-2',
      annee: '2ème année'
    }
  };

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Fonction pour changer le contenu affiché
  const handleContentChange = (newContent: 'dashboard' | 'profile' | 'courses') => {
    setActiveContent(newContent);
  };

  // Fonction pour rendre le contenu en fonction de la sélection
  const renderContent = () => {
    switch (activeContent) {
      case 'profile':
        return (
          <main className="p-6">
            <StudentProfilePage onLogout={onLogout} />
          </main>
        );
      case 'courses':
        return (
          <main className="p-6">
            <StudentCoursesPage />
          </main>
        );
      case 'dashboard':
      default:
        return (
          <main className="p-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Première colonne de widgets */}
            <div className="space-y-6">
              <LatestCourseCard isLoading={isLoading} />
              <StatsCards isLoading={isLoading} />
            </div>
            
            {/* Deuxième colonne de widgets */}
            <div className="space-y-6">
              <AnnouncementsWidget isLoading={isLoading} />
            </div>
            
            {/* Troisième colonne de widgets */}
            <div className="space-y-6 xl:col-span-1">
              <CalendarWidget isLoading={isLoading} />
              <ChatBotCard isLoading={isLoading} />
            </div>
          </main>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSidebar onNavigate={handleContentChange} activeContent={activeContent} />
      <div className="flex-1 flex flex-col">
        <StudentHeader 
          studentName={student.name} 
          studentInfo={student.info}
          onLogout={onLogout}
          onProfileClick={() => setActiveContent('profile')}
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default StudentDashboardPage;
