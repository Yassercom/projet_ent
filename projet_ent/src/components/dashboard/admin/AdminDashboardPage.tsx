import { useState } from 'react';
import AdminHeader from './header/AdminHeader';
import AdminSidebar from './sidebar/AdminSidebar';
import DashboardHome from './pages/DashboardHome';
import DepartmentsPage from './pages/DepartmentsPage';
import ProgramsPage from './pages/ProgramsPage';
import GroupsPage from './pages/GroupsPage';
import TeachersPage from './pages/TeachersPage';
import StudentsPage from './pages/StudentsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import StatisticsPage from './pages/StatisticsPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import CoursesPage from './pages/CoursesPage';

interface AdminDashboardPageProps {
  onLogout?: () => void;
  content?: 'departments' | 'programs' | 'groups' | 'teachers' | 'students' | 'assignments' | 'announcements' | 'statistics' | 'profile' | 'settings' | 'courses';
}

// Données simulées pour l'administrateur
const admin = {
  name: 'Dr. Abdelhak El Ouakili',
  role: 'Administrateur ENT'
};

const AdminDashboardPage = ({ onLogout, content }: AdminDashboardPageProps) => {
  const [isLoading] = useState(false);

  // Rendu du contenu en fonction du paramètre content
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-est-green"></div>
        </div>
      );
    }

    switch (content) {
      case 'departments':
        return <DepartmentsPage />;
      case 'programs':
        return <ProgramsPage />;
      case 'groups':
        return <GroupsPage />;
      case 'teachers':
        return <TeachersPage />;
      case 'students':
        return <StudentsPage />;
      case 'assignments':
        return <AssignmentsPage />;
      case 'announcements':
        return <AnnouncementsPage />;
      case 'statistics':
        return <StatisticsPage />;
      case 'profile':
      case 'settings':
        return <ProfileSettingsPage onLogout={onLogout} />;
      case 'courses':
        return <CoursesPage />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col transition-all duration-300 ml-64">
        <AdminHeader 
          adminName={admin.name} 
          adminRole={admin.role} 
          onLogout={onLogout} 
        />
        <main className="flex-1 py-8 px-6 md:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
