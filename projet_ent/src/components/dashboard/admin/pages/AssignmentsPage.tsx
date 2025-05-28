import React, { useState, useEffect } from 'react';
import FormModal from '../../../common/FormModal';
import AssignmentForm from '../forms/AssignmentForm';

interface AssignmentPageProps {
  onLogout?: () => void;
  isAddMode?: boolean;
  isEditMode?: boolean;
}

interface Assignment {
  id: string;
  teacher: string;
  program: string;
  course: string;
  group: string;
  semester: string;
  academicYear: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'planned';
}

const AssignmentsPage: React.FC<AssignmentPageProps> = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  // États pour le modal d'affectation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Données factices pour les affectations
  const mockAssignments: Assignment[] = [
    {
      id: '1',
      teacher: 'Dr. Mohamed Ouahbi',
      program: 'IAWM',
      course: 'Intelligence Artificielle',
      group: 'IAWM3',
      semester: 'S3',
      academicYear: '2024-2025',
      startDate: '2024-09-15',
      status: 'planned'
    },
    {
      id: '2',
      teacher: 'Dr. Naoufal Rais',
      program: 'IAWM',
      course: 'Développement Web Avancé',
      group: 'IAWM1',
      semester: 'S1',
      academicYear: '2024-2025',
      startDate: '2024-09-15',
      status: 'planned'
    },
    {
      id: '3',
      teacher: 'Dr. Samira Douzi',
      program: 'BDIA',
      course: 'Bases de données NoSQL',
      group: 'BDIA2',
      semester: 'S3',
      academicYear: '2024-2025',
      startDate: '2024-09-15',
      status: 'planned'
    },
    {
      id: '4',
      teacher: 'Dr. Omar Bensouda',
      program: 'IABD',
      course: 'Machine Learning',
      group: 'IABD1',
      semester: 'S1',
      academicYear: '2024-2025',
      startDate: '2024-09-15',
      status: 'planned'
    },
    {
      id: '5',
      teacher: 'Dr. Ahmed Bennani',
      program: 'GC',
      course: 'Mécanique des structures',
      group: 'GC1',
      semester: 'S1',
      academicYear: '2024-2025',
      startDate: '2024-09-15',
      status: 'planned'
    },
    {
      id: '6',
      teacher: 'Dr. Fatima Zahra Belkasmi',
      program: 'GE',
      course: 'Circuits électroniques',
      group: 'GE1',
      semester: 'S1',
      academicYear: '2024-2025',
      startDate: '2024-09-15',
      status: 'planned'
    },
    {
      id: '7',
      teacher: 'Dr. Laila El Amrani',
      program: 'IAWM',
      course: 'Communication professionnelle',
      group: 'IAWM1',
      semester: 'S1',
      academicYear: '2024-2025',
      startDate: '2024-09-15',
      status: 'planned'
    },
  ];

  // Liste des programmes pour le filtre
  const programs = [...new Set(mockAssignments.map(a => a.program))];
  
  // Liste des statuts pour le filtre
  const statuses = [
    { value: 'active', label: 'En cours' },
    { value: 'completed', label: 'Terminé' },
    { value: 'planned', label: 'Planifié' }
  ];

  useEffect(() => {
    // Simuler un appel API
    const timer = setTimeout(() => {
      setAssignments(mockAssignments);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrer les affectations en fonction des critères
  const filteredAssignments = assignments.filter(
    (assignment) => {
      const matchesSearch = assignment.teacher.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesProgram = filterProgram === '' || assignment.program === filterProgram;
      const matchesStatus = filterStatus === '' || assignment.status === filterStatus;
      
      return matchesSearch && matchesProgram && matchesStatus;
    }
  );

  // Fonction pour obtenir la couleur en fonction du statut
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Fonction pour obtenir le libellé du statut
  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'active':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      case 'planned':
        return 'Planifié';
      default:
        return status;
    }
  };
  
  // Ouvrir le modal pour ajouter une nouvelle affectation
  const handleAddAssignment = () => {
    setCurrentAssignment(null);
    setIsModalOpen(true);
  };
  
  // Ouvrir le modal pour éditer une affectation existante
  const handleEditAssignment = (assignment: Assignment) => {
    // Convertir l'affectation au format attendu par le formulaire
    const formData = {
      id: assignment.id,
      teacherId: assignment.teacher.split(' ')[0].replace('Dr.', '').trim(), // Extraction simplifiée de l'ID
      groupId: assignment.group,
      academicYear: assignment.academicYear,
      semester: assignment.semester,
      status: assignment.status
    };
    
    setCurrentAssignment(formData);
    setIsModalOpen(true);
  };
  
  // Fermer le modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentAssignment(null);
  };
  
  // Gérer la soumission du formulaire d'affectation
  const handleSubmitAssignment = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (data.id) {
        // Mise à jour d'une affectation existante
        const updatedAssignments = assignments.map(assignment => 
          assignment.id === data.id 
            ? {
                ...assignment,
                teacher: mockTeacherName(data.teacherId),
                group: data.groupId,
                semester: data.semester,
                academicYear: data.academicYear,
                status: data.status
              } 
            : assignment
        );
        
        setAssignments(updatedAssignments);
      } else {
        // Création d'une nouvelle affectation
        const newAssignment: Assignment = {
          id: String(assignments.length + 1),
          teacher: mockTeacherName(data.teacherId),
          program: mockProgramFromGroup(data.groupId),
          course: 'À déterminer', // Par défaut
          group: data.groupId,
          semester: data.semester,
          academicYear: data.academicYear,
          startDate: new Date().toISOString().split('T')[0],
          status: data.status
        };
        
        setAssignments([...assignments, newAssignment]);
      }
      
      // Fermer le modal et réinitialiser les états
      setIsModalOpen(false);
      setCurrentAssignment(null);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Fonction pour obtenir le nom d'un enseignant à partir de son ID (simulé)
  const mockTeacherName = (teacherId: string) => {
    const teachers = {
      '1': 'Dr. Mohamed Ouahbi',
      '2': 'Dr. Naoufal Rais',
      '3': 'Dr. Samira Douzi',
      '4': 'Dr. Omar Bensouda',
      '5': 'Dr. Ahmed Bennani',
      '6': 'Dr. Fatima Zahra Belkasmi',
      '7': 'Dr. Laila El Amrani',
      '8': 'Dr. Karim Idrissi',
      '9': 'Dr. Hassan Mekouar',
      '10': 'Dr. Mourad Zyani'
    };
    return teachers[teacherId as keyof typeof teachers] || 'Enseignant inconnu';
  };
  
  // Fonction pour obtenir le programme à partir du groupe (simulé)
  const mockProgramFromGroup = (groupId: string) => {
    if (groupId.startsWith('IAWM')) return 'IAWM';
    if (groupId.startsWith('BDIA')) return 'BDIA';
    if (groupId.startsWith('GI')) return 'GI';
    if (groupId.startsWith('GC')) return 'GC';
    if (groupId.startsWith('GE')) return 'GE';
    return 'Programme inconnu';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Modal d'affectation */}
      <FormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={currentAssignment ? 'Modifier l\'affectation' : 'Nouvelle affectation'}
        size="lg"
      >
        <AssignmentForm
          initialData={currentAssignment}
          onSubmit={handleSubmitAssignment}
          onCancel={handleCloseModal}
          isSubmitting={isSubmitting}
        />
      </FormModal>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des affectations</h1>
        <button
          onClick={handleAddAssignment}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#006faf] hover:bg-[#006faf]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006faf]"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Ajouter une affectation
        </button>
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
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-est-green focus:border-est-green"
          >
            <option value="">Toutes les filières</option>
            {programs.map((prog) => (
              <option key={prog} value={prog}>{prog}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-est-green focus:border-est-green"
          >
            <option value="">Tous les statuts</option>
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>

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
      ) : filteredAssignments.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune affectation trouvée</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterProgram || filterStatus ? 
              "Aucun résultat pour votre recherche." : 
              "Commencez par créer une affectation."
            }
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="py-3 px-4 font-semibold">Enseignant</th>
                <th className="py-3 px-4 font-semibold">Filière</th>
                <th className="py-3 px-4 font-semibold">Cours</th>
                <th className="py-3 px-4 font-semibold">Groupe</th>
                <th className="py-3 px-4 font-semibold">Semestre</th>
                <th className="py-3 px-4 font-semibold">Année</th>
                <th className="py-3 px-4 font-semibold">Statut</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{assignment.teacher}</td>
                  <td className="py-3 px-4">{assignment.program}</td>
                  <td className="py-3 px-4">{assignment.course}</td>
                  <td className="py-3 px-4">{assignment.group}</td>
                  <td className="py-3 px-4">{assignment.semester}</td>
                  <td className="py-3 px-4">{assignment.academicYear}</td>
                  <td className="py-3 px-4">
                    <span className={`${getStatusColor(assignment.status)} py-1 px-2 rounded-full text-xs font-medium`}>
                      {getStatusLabel(assignment.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditAssignment(assignment)}
                        className="text-est-green hover:text-est-green/80"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <button className="text-est-blue hover:text-est-blue/80">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
    </div>
  );
};

export default AssignmentsPage;
