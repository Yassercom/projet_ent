import React, { useEffect, useState } from 'react';
import type { Course } from '../widgets/LatestCoursesWidget';
import ConfirmModal from '../../../common/ConfirmModal';

interface CoursesPageProps {
  initialCourses?: Course[];
}

// Données factices pour les groupes assignés à l'enseignant
const assignedGroups = [
  { id: 'g1', name: 'IAWM1', department: 'Informatique' },
  { id: 'g2', name: 'IAWM2', department: 'Informatique' },
  { id: 'g3', name: 'IAWM3', department: 'Informatique' },
  { id: 'g4', name: 'IAWM4', department: 'Informatique' },
  { id: 'g5', name: 'BDIA1', department: 'Informatique' },
  { id: 'g6', name: 'BDIA2', department: 'Informatique' },
  { id: 'g7', name: 'BDIA3', department: 'Informatique' },
];

// Données factices pour les cours
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
  {
    id: '4',
    title: 'Algorithmique et structures de données',
    description: 'Implémentation et analyse des algorithmes et structures de données',
    date: '05 mai 2025',
    group: 'IAWM1',
  },
  {
    id: '5',
    title: 'Développement Mobile',
    description: 'Création d\'applications mobiles avec React Native',
    date: '01 mai 2025',
    group: 'BDIA2',
  },
  {
    id: '6',
    title: 'Sécurité des systèmes d\'information',
    description: 'Principes de cybersécurité et méthodes de protection',
    date: '28 avril 2025',
    group: 'IAWM3',
  },
];

const CoursesPage: React.FC<CoursesPageProps> = ({ initialCourses }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  // Charger les cours
  useEffect(() => {
    const loadCourses = () => {
      // Simulation d'un chargement asynchrone
      setTimeout(() => {
        setCourses(initialCourses || mockCourses);
        setFilteredCourses(initialCourses || mockCourses);
        setIsLoading(false);
      }, 1000);
    };

    loadCourses();
  }, [initialCourses]);

  // Filtrer les cours
  useEffect(() => {
    let filtered = [...courses];

    // Filtrer par groupe
    if (selectedGroup) {
      filtered = filtered.filter(course => course.group === selectedGroup);
    }

    // Filtrer par terme de recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        course => 
          course.title.toLowerCase().includes(term) || 
          course.description.toLowerCase().includes(term)
      );
    }

    setFilteredCourses(filtered);
  }, [courses, selectedGroup, searchTerm]);

  // Supprimer un cours
  const handleDeleteCourse = (courseId: string) => {
    setCourseToDelete(courseId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteCourse = () => {
    if (courseToDelete) {
      // Simuler une suppression
      const updatedCourses = courses.filter(course => course.id !== courseToDelete);
      setCourses(updatedCourses);
      setShowDeleteConfirm(false);
      setCourseToDelete(null);

      // Afficher une notification (exemple simple)
      alert('Cours supprimé avec succès');
    }
  };

  const cancelDeleteCourse = () => {
    setShowDeleteConfirm(false);
    setCourseToDelete(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de la page */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Mes cours</h1>
          <p className="text-gray-600 mt-1">Gérez les cours que vous enseignez</p>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-xl shadow-sm mb-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="group-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filtrer par groupe
              </label>
              <select
                id="group-filter"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006faf] focus:ring-[#006faf]"
              >
                <option value="">Tous les groupes</option>
                {assignedGroups.map((group) => (
                  <option key={group.id} value={group.name}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Rechercher un cours
              </label>
              <input
                type="text"
                id="search"
                placeholder="Entrez un titre ou une description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006faf] focus:ring-[#006faf]"
              />
            </div>
            <div className="flex items-end">
              <a
                href="/teacher/courses/add"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#006faf] hover:bg-[#006faf]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006faf] ml-auto"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Ajouter un cours
              </a>
            </div>
          </div>
        </div>

        {/* Liste des cours */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm p-10 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#006faf]"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun cours trouvé</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedGroup 
                ? "Essayez de modifier vos filtres." 
                : "Commencez à créer des cours pour vos groupes."}
            </p>
            {!searchTerm && !selectedGroup && (
              <div className="mt-6">
                <a
                  href="/teacher/courses/add"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#006faf] hover:bg-[#006faf]/90"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Créer un cours
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cours
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Groupe
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-[#006faf]/10 flex items-center justify-center text-[#006faf]">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{course.title}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">{course.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {course.group}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <a 
                            href={`/teacher/courses/${course.id}`} 
                            className="text-[#006faf] hover:text-[#006faf]/80 p-1"
                            title="Voir le détail"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </a>
                          <a 
                            href={`/teacher/courses/edit/${course.id}`} 
                            className="text-[#00b43d] hover:text-[#00b43d]/80 p-1"
                            title="Modifier"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </a>
                          <button 
                            onClick={() => handleDeleteCourse(course.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Supprimer"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal de confirmation de suppression */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Supprimer ce cours"
        message="Êtes-vous sûr de vouloir supprimer ce cours ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={confirmDeleteCourse}
        onCancel={cancelDeleteCourse}
      />
    </div>
  );
};

export default CoursesPage;
