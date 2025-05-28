import React, { useState, useEffect } from 'react';
import FormModal from '../../../common/FormModal';
import ConfirmModal from '../../../common/ConfirmModal';
import CourseForm from '../forms/CourseForm';

interface Course {
  id: string;
  title: string;
  code: string;
  program: string;
  teacher: string;
  semester: string;
  credits: number;
  hoursPerWeek: number;
  studentsCount: number;
  createdAt: string;
}

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('');
  const [filterSemester, setFilterSemester] = useState('');
  
  // États pour les modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Données factices pour les cours
  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Programmation Web Avancée',
      code: 'PWA101',
      program: 'Ingénierie des Applications Web et Mobiles',
      teacher: 'Dr. Mohamed Ouahbi',
      semester: 'S3',
      credits: 4,
      hoursPerWeek: 6,
      studentsCount: 120,
      createdAt: '2023-09-01'
    },
    {
      id: '2',
      title: 'Développement Mobile',
      code: 'DM102',
      program: 'Ingénierie des Applications Web et Mobiles',
      teacher: 'Dr. Imane Raki',
      semester: 'S3',
      credits: 4,
      hoursPerWeek: 6,
      studentsCount: 118,
      createdAt: '2023-09-01'
    },
    {
      id: '3',
      title: 'Intelligence Artificielle',
      code: 'IA201',
      program: 'Big Data et Intelligence Artificielle',
      teacher: 'Dr. Youssef Hmamouche',
      semester: 'S4',
      credits: 5,
      hoursPerWeek: 8,
      studentsCount: 95,
      createdAt: '2023-09-01'
    },
    {
      id: '4',
      title: 'Apprentissage Automatique',
      code: 'AA202',
      program: 'Big Data et Intelligence Artificielle',
      teacher: 'Dr. Soukaina Elhamdi',
      semester: 'S4',
      credits: 5,
      hoursPerWeek: 8,
      studentsCount: 92,
      createdAt: '2023-09-01'
    },
    {
      id: '5',
      title: 'Réseaux Informatiques',
      code: 'RI301',
      program: 'Ingénierie des Systèmes Informatiques et Communicants',
      teacher: 'Dr. Ahmed Bennani',
      semester: 'S2',
      credits: 3,
      hoursPerWeek: 5,
      studentsCount: 85,
      createdAt: '2023-09-01'
    },
    {
      id: '6',
      title: 'Systèmes d\'Exploitation',
      code: 'SE302',
      program: 'Ingénierie des Systèmes Informatiques et Communicants',
      teacher: 'Dr. Fatima Zahra Belkasmi',
      semester: 'S2',
      credits: 3,
      hoursPerWeek: 5,
      studentsCount: 82,
      createdAt: '2023-09-01'
    },
    {
      id: '7',
      title: 'Structures de Béton',
      code: 'SB401',
      program: 'Génie Civil',
      teacher: 'Dr. Rachid Taouni',
      semester: 'S3',
      credits: 4,
      hoursPerWeek: 6,
      studentsCount: 65,
      createdAt: '2023-09-01'
    },
    {
      id: '8',
      title: 'Électronique de Puissance',
      code: 'EP501',
      program: 'Génie Électrique',
      teacher: 'Dr. Saida Makram',
      semester: 'S3',
      credits: 4,
      hoursPerWeek: 6,
      studentsCount: 70,
      createdAt: '2023-09-01'
    },
  ];

  // Liste des programmes pour le filtre
  const programs = [...new Set(mockCourses.map(c => c.program))];
  
  // Liste des semestres pour le filtre
  const semesters = [...new Set(mockCourses.map(c => c.semester))];

  useEffect(() => {
    // Simuler un appel API
    const timer = setTimeout(() => {
      setCourses(mockCourses);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  
  // Fonction pour ouvrir le modal d'ajout
  const handleOpenAddModal = () => {
    setCurrentCourse(null);
    setIsAddModalOpen(true);
  };
  
  // Fonction pour ouvrir le modal de modification
  const handleOpenEditModal = (course: Course) => {
    setCurrentCourse(course);
    setIsEditModalOpen(true);
  };
  
  // Fonction pour ouvrir le modal de suppression
  const handleOpenDeleteModal = (course: Course) => {
    setCurrentCourse(course);
    setIsDeleteModalOpen(true);
  };
  
  // Fonction pour gérer l'ajout d'un cours
  const handleAddCourse = (data: any) => {
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      // Générer un ID unique
      const newCourse = {
        ...data,
        id: `${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
        studentsCount: 0,
        title: data.title,
        code: data.code,
        program: data.program || 'Ingénierie des Applications Web et Mobiles',
        teacher: data.teacher || 'Dr. Nouveau Enseignant',
        semester: data.semester || 'S1',
        credits: data.credits || 3,
        hoursPerWeek: data.hoursPerWeek || 4
      };
      
      setCourses([...courses, newCourse]);
      setIsSubmitting(false);
      setIsAddModalOpen(false);
    }, 1000);
  };
  
  // Fonction pour gérer la modification d'un cours
  const handleUpdateCourse = (data: any) => {
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      const updatedCourses = courses.map(course => 
        course.id === currentCourse?.id ? { 
          ...course, 
          title: data.title,
          code: data.code,
          program: data.program || course.program,
          teacher: data.teacher || course.teacher,
          semester: data.semester || course.semester,
          credits: data.credits || course.credits,
          hoursPerWeek: data.hoursPerWeek || course.hoursPerWeek
        } : course
      );
      
      setCourses(updatedCourses);
      setIsSubmitting(false);
      setIsEditModalOpen(false);
    }, 1000);
  };
  
  // Fonction pour gérer la suppression d'un cours
  const handleDeleteCourse = () => {
    if (!currentCourse) return;
    
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      const filteredCourses = courses.filter(course => course.id !== currentCourse.id);
      setCourses(filteredCourses);
      setIsSubmitting(false);
      setIsDeleteModalOpen(false);
    }, 1000);
  };

  // Filtrer les cours en fonction des critères
  const filteredCourses = courses.filter(
    (course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesProgram = filterProgram === '' || course.program === filterProgram;
      
      const matchesSemester = filterSemester === '' || course.semester === filterSemester;
      
      return matchesSearch && matchesProgram && matchesSemester;
    }
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des cours</h1>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#006faf] hover:bg-[#006faf]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006faf]"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Ajouter un cours
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Rechercher un cours..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#006faf] focus:border-[#006faf] sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#006faf] focus:border-[#006faf] sm:text-sm"
          value={filterProgram}
          onChange={(e) => setFilterProgram(e.target.value)}
        >
          <option value="">Toutes les filières</option>
          {programs.map((program) => (
            <option key={program} value={program}>{program}</option>
          ))}
        </select>
        
        <select
          className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#006faf] focus:border-[#006faf] sm:text-sm"
          value={filterSemester}
          onChange={(e) => setFilterSemester(e.target.value)}
        >
          <option value="">Tous les semestres</option>
          {semesters.map((semester) => (
            <option key={semester} value={semester}>{semester}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <svg className="animate-spin h-8 w-8 text-[#006faf]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="ml-2 text-gray-700">Chargement des données...</span>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun cours trouvé</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterProgram || filterSemester ? 
              "Aucun résultat pour votre recherche." : 
              "Commencez par ajouter un cours."
            }
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="py-3 px-4 font-semibold">Code</th>
                <th className="py-3 px-4 font-semibold">Titre</th>
                <th className="py-3 px-4 font-semibold">Filière</th>
                <th className="py-3 px-4 font-semibold">Enseignant</th>
                <th className="py-3 px-4 font-semibold">Semestre</th>
                <th className="py-3 px-4 font-semibold">Crédits</th>
                <th className="py-3 px-4 font-semibold">H/Semaine</th>
                <th className="py-3 px-4 font-semibold">Étudiants</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{course.code}</td>
                  <td className="py-3 px-4">{course.title}</td>
                  <td className="py-3 px-4 max-w-[200px] truncate" title={course.program}>{course.program}</td>
                  <td className="py-3 px-4">{course.teacher}</td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-full text-xs font-medium">
                      {course.semester}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">{course.credits}</td>
                  <td className="py-3 px-4 text-center">{course.hoursPerWeek}</td>
                  <td className="py-3 px-4">
                    <span className="bg-indigo-100 text-indigo-800 py-1 px-2 rounded-full text-xs font-medium">
                      {course.studentsCount}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleOpenEditModal(course)}
                        className="text-[#006faf] hover:text-[#006faf]/80"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleOpenDeleteModal(course)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Modal pour ajouter un cours */}
      <FormModal
        isOpen={isAddModalOpen}
        title="Ajouter un nouveau cours"
        onClose={() => setIsAddModalOpen(false)}
        size="lg"
      >
        <CourseForm
          onSubmit={handleAddCourse}
          onCancel={() => setIsAddModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </FormModal>

      {/* Modal pour modifier un cours */}
      <FormModal
        isOpen={isEditModalOpen}
        title="Modifier un cours"
        onClose={() => setIsEditModalOpen(false)}
        size="lg"
      >
        {currentCourse && (
          <CourseForm
            initialData={{
              id: currentCourse.id,
              title: currentCourse.title,
              code: currentCourse.code,
              description: 'Description du cours',
              program: currentCourse.program,
              teacher: currentCourse.teacher,
              semester: currentCourse.semester,
              credits: currentCourse.credits,
              hoursPerWeek: currentCourse.hoursPerWeek
            }}
            onSubmit={handleUpdateCourse}
            onCancel={() => setIsEditModalOpen(false)}
            isSubmitting={isSubmitting}
          />
        )}
      </FormModal>

      {/* Modal pour confirmer la suppression */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer le cours ${currentCourse?.title} ?`}
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={handleDeleteCourse}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default CoursesPage;
