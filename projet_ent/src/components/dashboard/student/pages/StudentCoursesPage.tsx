import React, { useState, useEffect } from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
  teacher: {
    id: string;
    name: string;
    department: string;
  };
  group: string;
  code?: string;
  pdfSupport?: string;
  externalLinks: string[];
  progress: number;
  createdAt: string; // Date de création du cours
  nextSession?: {
    date: string;
    time: string;
    room: string;
  };
}

interface StudentCoursesPageProps {
  // Vous pouvez ajouter des props si nécessaire
}

const StudentCoursesPage: React.FC<StudentCoursesPageProps> = () => {
  // Information de l'étudiant connecté (simulée)
  const currentStudent = {
    id: '123',
    name: 'Ahmed Benjelloun',
    email: 'a.benjelloun@student.um5.ac.ma',
    group: 'GI-2',
    department: 'Informatique'
  };
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  // Données fictives pour les cours (correspondant aux données saisies par les enseignants)
  const allMockCourses: Course[] = [
    {
      id: '1',
      title: 'Intelligence Artificielle et Machine Learning',
      description: 'Introduction aux concepts fondamentaux de l\'intelligence artificielle, y compris l\'apprentissage automatique, les réseaux de neurones et le traitement du langage naturel.',
      teacher: {
        id: 'teacher1',
        name: 'Dr. Mohammed El Alaoui',
        department: 'Informatique'
      },
      group: 'GI-2',
      code: 'INFO-IA-301',
      pdfSupport: '/supports/ia_introduction.pdf',
      externalLinks: [
        'https://www.coursera.org/learn/machine-learning',
        'https://www.tensorflow.org/tutorials'
      ],
      progress: 65,
      createdAt: '2025-03-15',
      nextSession: {
        date: '2025-05-26',
        time: '10:00 - 12:00',
        room: 'A-201'
      }
    },
    {
      id: '2',
      title: 'Réseaux et Sécurité Informatique',
      description: 'Principes des réseaux informatiques, protocoles de communication, cybersécurité et techniques de protection des données.',
      teacher: {
        id: 'teacher2',
        name: 'Prof. Samira Tazi',
        department: 'Informatique'
      },
      group: 'GI-2',
      code: 'INFO-RES-304',
      pdfSupport: '/supports/reseaux_securite.pdf',
      externalLinks: [
        'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html'
      ],
      progress: 55,
      createdAt: '2025-04-20',
      nextSession: {
        date: '2025-05-29',
        time: '15:30 - 17:30',
        room: 'B-201'
      }
    },
    {
      id: '3',
      title: 'Mathématiques pour l\'Ingénieur',
      description: 'Algèbre linéaire, calcul différentiel et intégral, équations différentielles et applications en ingénierie.',
      teacher: {
        id: 'teacher3',
        name: 'Dr. Karim Idrissi',
        department: 'Mathématiques'
      },
      group: 'GI-2',
      code: 'MATH-301',
      externalLinks: [],
      progress: 70,
      createdAt: '2025-01-10',
      nextSession: {
        date: '2025-05-26',
        time: '13:00 - 15:00',
        room: 'D-101'
      }
    },
    {
      id: '4',
      title: 'Bases de Données Avancées',
      description: 'Conception et optimisation des bases de données relationnelles et NoSQL, techniques avancées d\'indexation et de requêtes.',
      teacher: {
        id: 'teacher4',
        name: 'Dr. Fatima Zahra Benali',
        department: 'Informatique'
      },
      group: 'BDIA3',
      code: 'INFO-BD-302',
      pdfSupport: '/supports/bdd_avancees.pdf',
      externalLinks: [
        'https://www.mongodb.com/docs/',
        'https://www.postgresql.org/docs/'
      ],
      progress: 80,
      createdAt: '2024-09-05',
      nextSession: {
        date: '2025-05-27',
        time: '14:00 - 16:00',
        room: 'B-102'
      }
    },
    {
      id: '5',
      title: 'Développement Web Full-Stack',
      description: 'Développement d\'applications web modernes avec React, Node.js et des bases de données NoSQL.',
      teacher: {
        id: 'teacher5',
        name: 'Prof. Ahmed Bennani',
        department: 'Informatique'
      },
      group: 'IAWM2',
      code: 'INFO-WEB-303',
      pdfSupport: '/supports/web_fullstack.pdf',
      externalLinks: [
        'https://reactjs.org/docs/getting-started.html',
        'https://nodejs.org/en/docs/'
      ],
      progress: 45,
      createdAt: '2025-05-01',
      nextSession: {
        date: '2025-05-28',
        time: '08:30 - 11:30',
        room: 'C-305'
      }
    },
    {
      id: '6',
      title: 'Électronique Numérique',
      description: 'Conception de circuits numériques, systèmes logiques, microcontrôleurs et applications embarquées.',
      teacher: {
        id: 'teacher6',
        name: 'Dr. Hassan Ouazzani',
        department: 'Électronique'
      },
      group: 'GE-1',
      code: 'ELEC-301',
      externalLinks: [],
      progress: 60,
      createdAt: '2025-02-18',
      nextSession: {
        date: '2025-05-30',
        time: '09:00 - 12:00',
        room: 'E-102'
      }
    }
  ];

  // Charger les données des cours
  useEffect(() => {
    // Simuler un délai de chargement
    const timer = setTimeout(() => {
      // Filtrer les cours pour n'afficher que ceux du groupe de l'étudiant connecté
      const studentCourses = allMockCourses.filter(course => course.group === currentStudent.group);
      setCourses(studentCourses);
      setFilteredCourses(studentCourses);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Filtrer les cours en fonction de la recherche et trier par ancienneté
  useEffect(() => {
    let filtered = courses;
    
    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (course.code?.toLowerCase().includes(searchTerm.toLowerCase()) || false) || 
        course.teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Trier par ancienneté
    filtered = [...filtered].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredCourses(filtered);
  }, [searchTerm, sortOrder, courses]);

  // Formater la date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Mes Cours</h1>
        <p className="text-gray-600">Cours assignés au groupe {currentStudent.group}</p>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Recherche */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un cours..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006faf] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Tri par ancienneté */}
        <div className="w-full md:w-64">
          <select
            className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006faf] focus:border-transparent"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
          >
            <option value="newest">Plus récents d'abord</option>
            <option value="oldest">Plus anciens d'abord</option>
          </select>
        </div>
      </div>

      {/* Liste des cours */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
              <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-xs font-medium text-gray-700 rounded mr-2">
                        {course.code}
                      </span>
                      <span className="text-sm text-gray-500">{course.teacher.department}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Enseignant:</span> {course.teacher.name}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  {/* Barre de progression */}
                  <div className="mb-4 md:mb-0 md:w-1/3 pr-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progression</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#006faf] h-2 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Prochaine session */}
                  {course.nextSession && (
                    <div className="md:w-1/3 px-4 border-l border-gray-100">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Prochaine session</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{formatDate(course.nextSession.date)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{course.nextSession.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>Salle {course.nextSession.room}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="md:w-1/3 pl-4 md:text-right">
                    <a 
                      href={`/student/courses/${course.id}`} 
                      className="inline-block text-center bg-[#006faf] hover:bg-[#005d92] text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Accéder au cours
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun cours trouvé</h3>
          <p className="mt-1 text-sm text-gray-500">Essayez de modifier vos critères de recherche.</p>
        </div>
      )}
    </div>
  );
};

export default StudentCoursesPage;
