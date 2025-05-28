import React, { useState, useEffect } from 'react';
import FormModal from '../../../common/FormModal';
import ConfirmModal from '../../../common/ConfirmModal';
import StudentForm from '../forms/StudentForm';

// Interface pour les données d'étudiant
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cne: string;
  program: string;
  group: string;
  level: 'DUT' | 'Licence' | 'Master';
  year: number;
  status: 'active' | 'graduated' | 'suspended' | 'on_leave';
  enrollmentDate: string;
  code: string;
}

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('');
  const [filterGroup, setFilterGroup] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  // États pour les modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Données factices pour les étudiants
  const mockStudents: Student[] = [
    {
      id: '1',
      firstName: 'Mohammed',
      lastName: 'Alami',
      email: 'mohammed.alami@example.com',
      cne: 'G123456789',
      program: 'IAWM',
      group: 'IAWM1',
      level: 'DUT',
      year: 1,
      status: 'active',
      enrollmentDate: '2023-09-01',
      code: '23-IAWM-1234'
    },
    {
      id: '2',
      firstName: 'Fatima',
      lastName: 'Benali',
      email: 'fatima.benali@example.com',
      cne: 'G987654321',
      program: 'BDIA',
      group: 'BDIA1',
      level: 'DUT',
      year: 1,
      status: 'active',
      enrollmentDate: '2023-09-01',
      code: '23-BDIA-5678'
    },
    {
      id: '3',
      firstName: 'Youssef',
      lastName: 'El Mansouri',
      email: 'youssef.elmansouri@example.com',
      cne: 'G456789123',
      program: 'GC',
      group: 'GC1',
      level: 'DUT',
      year: 1,
      status: 'active',
      enrollmentDate: '2023-09-01',
      code: '23-GC-9012'
    },
    {
      id: '4',
      firstName: 'Amina',
      lastName: 'Tazi',
      email: 'amina.tazi@example.com',
      cne: 'G321654987',
      program: 'IABD',
      group: 'IABD1',
      level: 'DUT',
      year: 1,
      status: 'active',
      enrollmentDate: '2023-09-01',
      code: '23-IABD-3456'
    },
    {
      id: '5',
      firstName: 'Karim',
      lastName: 'Berrada',
      email: 'karim.berrada@example.com',
      cne: 'G789123456',
      program: 'IAWM',
      group: 'IAWM2',
      level: 'DUT',
      year: 1,
      status: 'suspended',
      enrollmentDate: '2023-09-01',
      code: '23-IAWM-7890'
    },
    {
      id: '6',
      firstName: 'Leila',
      lastName: 'Chakir',
      email: 'leila.chakir@example.com',
      cne: 'G654987321',
      program: 'BDIA',
      group: 'BDIA2',
      level: 'DUT',
      year: 2,
      status: 'active',
      enrollmentDate: '2022-09-01',
      code: '22-BDIA-2345'
    },
    {
      id: '7',
      firstName: 'Omar',
      lastName: 'Idrissi',
      email: 'omar.idrissi@example.com',
      cne: 'G234567891',
      program: 'IAWM',
      group: 'IAWM3',
      level: 'DUT',
      year: 2,
      status: 'active',
      enrollmentDate: '2022-09-01',
      code: '22-IAWM-6789'
    },
    {
      id: '8',
      firstName: 'Nadia',
      lastName: 'Benmoussa',
      email: 'nadia.benmoussa@example.com',
      cne: 'G876543219',
      program: 'BDIA',
      group: 'BDIA3',
      level: 'DUT',
      year: 2,
      status: 'on_leave',
      enrollmentDate: '2022-09-01',
      code: '22-BDIA-0123'
    },
    {
      id: '9',
      firstName: 'Hassan',
      lastName: 'Ouazzani',
      email: 'hassan.ouazzani@example.com',
      cne: 'G543219876',
      program: 'GC',
      group: 'GC1',
      level: 'DUT',
      year: 1,
      status: 'active',
      enrollmentDate: '2023-09-01',
      code: '23-GC-4567'
    },
    {
      id: '10',
      firstName: 'Salma',
      lastName: 'Ziani',
      email: 'salma.ziani@example.com',
      cne: 'G219876543',
      program: 'IABD',
      group: 'IABD1',
      level: 'DUT',
      year: 1,
      status: 'graduated',
      enrollmentDate: '2021-09-01',
      code: '21-IABD-8901'
    }
  ];

  // Simuler le chargement des données
  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(mockStudents);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Fonction pour ouvrir le modal d'ajout
  const handleOpenAddModal = () => {
    setCurrentStudent(null);
    setIsAddModalOpen(true);
  };
  
  // Fonction pour ouvrir le modal de modification
  const handleOpenEditModal = (student: Student) => {
    setCurrentStudent(student);
    setIsEditModalOpen(true);
  };
  
  // Fonction pour ouvrir le modal de suppression
  const handleOpenDeleteModal = (student: Student) => {
    setCurrentStudent(student);
    setIsDeleteModalOpen(true);
  };
  
  // Fonction pour gérer l'ajout d'un étudiant
  const handleAddStudent = (data: Student) => {
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      // Générer un ID unique
      const newStudent = {
        ...data,
        id: `${Date.now()}`,
        enrollmentDate: new Date().toISOString().split('T')[0],
        level: 'DUT' as const,
        year: 1,
        status: 'active' as const,
        code: `${new Date().getFullYear().toString().slice(-2)}-${data.program}-${Math.floor(1000 + Math.random() * 9000)}`
      };
      
      setStudents([...students, newStudent]);
      setIsSubmitting(false);
      setIsAddModalOpen(false);
    }, 1000);
  };
  
  // Fonction pour gérer la modification d'un étudiant
  const handleUpdateStudent = (data: Student) => {
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      const updatedStudents = students.map(student => 
        student.id === data.id ? { ...student, ...data } : student
      );
      
      setStudents(updatedStudents);
      setIsSubmitting(false);
      setIsEditModalOpen(false);
    }, 1000);
  };
  
  // Fonction pour gérer la suppression d'un étudiant
  const handleDeleteStudent = () => {
    if (!currentStudent) return;
    
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      const filteredStudents = students.filter(student => student.id !== currentStudent.id);
      setStudents(filteredStudents);
      setIsSubmitting(false);
      setIsDeleteModalOpen(false);
    }, 1000);
  };

  // Filtrer les étudiants en fonction des critères de recherche
  const filteredStudents = students.filter(student => {
    const searchMatch = searchTerm
      ? student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.cne.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.code.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const programMatch = filterProgram ? student.program === filterProgram : true;
    const groupMatch = filterGroup ? student.group === filterGroup : true;
    const statusMatch = filterStatus ? student.status === filterStatus : true;
    
    return searchMatch && programMatch && groupMatch && statusMatch;
  });

  // Obtenir la couleur en fonction du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'graduated':
        return 'bg-blue-100 text-blue-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Obtenir le libellé en fonction du statut
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'graduated':
        return 'Diplômé';
      case 'suspended':
        return 'Suspendu';
      case 'on_leave':
        return 'En congé';
      default:
        return status;
    }
  };

  // Données factices pour les filtres
  const mockProgramOptions = [
    { value: '', label: 'Toutes les filières' },
    { value: 'IAWM', label: 'Ingénierie des Applications Web et Mobiles' },
    { value: 'BDIA', label: 'Big Data et Intelligence Artificielle' },
    { value: 'GC', label: 'Génie Civil' },
    { value: 'IABD', label: 'Intelligence Artificielle et Big Data' },
  ];

  const mockGroupOptions = [
    { value: '', label: 'Tous les groupes' },
    { value: 'IAWM1', label: 'IAWM1' },
    { value: 'IAWM2', label: 'IAWM2' },
    { value: 'IAWM3', label: 'IAWM3' },
    { value: 'IAWM4', label: 'IAWM4' },
    { value: 'BDIA1', label: 'BDIA1' },
    { value: 'BDIA2', label: 'BDIA2' },
    { value: 'BDIA3', label: 'BDIA3' },
    { value: 'GC1', label: 'GC1' },
    { value: 'IABD1', label: 'IABD1' },
  ];

  const mockStatusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'active', label: 'Actif' },
    { value: 'graduated', label: 'Diplômé' },
    { value: 'suspended', label: 'Suspendu' },
    { value: 'on_leave', label: 'En congé' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des étudiants</h1>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#006faf] hover:bg-[#006faf]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006faf]"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Ajouter un étudiant
        </button>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Recherche
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#006faf] focus:border-[#006faf] sm:text-sm"
                placeholder="Rechercher par nom, prénom, email, CNE ou code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="program-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filière
            </label>
            <select
              id="program-filter"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-[#006faf] focus:border-[#006faf] sm:text-sm rounded-md"
              value={filterProgram}
              onChange={(e) => setFilterProgram(e.target.value)}
            >
              {mockProgramOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="group-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Groupe
            </label>
            <select
              id="group-filter"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-[#006faf] focus:border-[#006faf] sm:text-sm rounded-md"
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
            >
              {mockGroupOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              id="status-filter"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-[#006faf] focus:border-[#006faf] sm:text-sm rounded-md"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {mockStatusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom complet
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CNE
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Filière
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Groupe
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Niveau
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Année
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={10} className="px-4 py-4 text-center">
                  <div className="flex justify-center items-center">
                    <svg className="animate-spin h-5 w-5 text-[#006faf]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="ml-2">Chargement des données...</span>
                  </div>
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-4 text-center text-gray-500">
                  Aucun étudiant trouvé
                </td>
              </tr>
            ) : (
              filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.code}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {student.lastName} {student.firstName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {student.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {student.cne}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {student.program}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {student.group}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {student.level}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    Année {student.year}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`${getStatusColor(student.status)} py-1 px-2 rounded-full text-xs font-medium`}>
                      {getStatusLabel(student.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleOpenEditModal(student)}
                        className="text-[#006faf] hover:text-[#006faf]/80"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleOpenDeleteModal(student)}
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal pour ajouter un étudiant */}
      <FormModal
        isOpen={isAddModalOpen}
        title="Ajouter un nouvel étudiant"
        onClose={() => setIsAddModalOpen(false)}
        size="lg"
      >
        <StudentForm
          onSubmit={handleAddStudent}
          onCancel={() => setIsAddModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </FormModal>

      {/* Modal pour modifier un étudiant */}
      <FormModal
        isOpen={isEditModalOpen}
        title="Modifier un étudiant"
        onClose={() => setIsEditModalOpen(false)}
        size="lg"
      >
        {currentStudent && (
          <StudentForm
            initialData={currentStudent}
            onSubmit={handleUpdateStudent}
            onCancel={() => setIsEditModalOpen(false)}
            isSubmitting={isSubmitting}
          />
        )}
      </FormModal>

      {/* Modal pour confirmer la suppression */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer l'étudiant ${currentStudent?.firstName} ${currentStudent?.lastName} ?`}
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={handleDeleteStudent}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default StudentsPage;
