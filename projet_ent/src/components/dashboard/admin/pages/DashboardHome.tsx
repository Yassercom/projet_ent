import React, { useEffect, useState } from 'react';
import StatsCards from '../widgets/StatsCards';
import ProgramDistributionChart from '../widgets/ProgramDistributionChart';
import RecentAnnouncementsWidget from '../widgets/RecentAnnouncementsWidget';
import type { Announcement } from '../widgets/RecentAnnouncementsWidget';

// Données factices pour les statistiques
const mockStatsData = {
  departmentsCount: 5,
  programsCount: 12,
  groupsCount: 28,
  teachersCount: 65,
  studentsCount: 1250,
  isLoading: false
};

// Données factices pour la répartition par filière
const mockProgramDistribution = [
  { name: 'IAWM', count: 320, color: '#00b43d' },
  { name: 'BDIA', count: 295, color: '#006faf' },
  { name: 'ISIC', count: 260, color: '#007B8A' },
  { name: 'GC', count: 180, color: '#4f46e5' },
  { name: 'GE', count: 195, color: '#7c3aed' },
];

// Données factices pour les annonces récentes
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
];

const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState({ ...mockStatsData, isLoading: true });
  const [programDistribution, setProgramDistribution] = useState<typeof mockProgramDistribution>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simuler le chargement des données
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ ...mockStatsData, isLoading: false });
      setProgramDistribution(mockProgramDistribution);
      setAnnouncements(mockAnnouncements);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Titre de la page */}
      <div className="border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Tableau de bord</h1>
        <p className="text-gray-600">Bienvenue sur le panneau d'administration de l'ENT EST Salé.</p>
      </div>
      
      {/* Statistiques globales */}
      <StatsCards data={stats} />
      
      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique de répartition (prend 2 colonnes) */}
        <div className="lg:col-span-2">
          <ProgramDistributionChart 
            data={programDistribution} 
            isLoading={isLoading} 
          />
        </div>
        
        {/* Annonces récentes */}
        <div>
          <RecentAnnouncementsWidget 
            announcements={announcements}
            isLoading={isLoading}
          />
        </div>
      </div>
      
      {/* Section d'activité récente */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Activité récente</h2>
        
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-start">
                <div className="bg-gray-200 h-10 w-10 rounded-full mr-3"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-green-100 text-est-green rounded-full p-2 mr-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Nouvel enseignant ajouté</p>
                <p className="text-gray-600">Dr. Mehdi Lahlou a été ajouté au département Informatique</p>
                <p className="text-sm text-gray-500 mt-1">Il y a 2 heures</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Affectation mise à jour</p>
                <p className="text-gray-600">Prof. Amine Benali a été affecté au groupe IAWM3</p>
                <p className="text-sm text-gray-500 mt-1">Il y a 5 heures</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-100 text-purple-600 rounded-full p-2 mr-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Nouveau groupe créé</p>
                <p className="text-gray-600">Groupe ISIC4 a été créé dans la filière ISIC</p>
                <p className="text-sm text-gray-500 mt-1">Il y a 8 heures</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-amber-100 text-amber-600 rounded-full p-2 mr-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Nouvelle annonce publiée</p>
                <p className="text-gray-600">Annonce "Période d'examens" publiée pour les étudiants</p>
                <p className="text-sm text-gray-500 mt-1">Il y a 12 heures</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-red-100 text-red-600 rounded-full p-2 mr-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Erreur système détectée</p>
                <p className="text-gray-600">Un problème a été détecté avec le service de stockage</p>
                <p className="text-sm text-gray-500 mt-1">Il y a 1 jour</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
