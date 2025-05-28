import React, { useState, useEffect } from 'react';
import FormModal from '../../../common/FormModal';
import ConfirmModal from '../../../common/ConfirmModal';
import TeacherForm from '../forms/TeacherForm';

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  specialization: string;
  position: string;
  status: 'active' | 'on_leave' | 'inactive';
  joinDate: string;
  coursesCount: number;
}

const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  // États pour les modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<Teacher | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Données factices pour les enseignants
  const mockTeachers: Teacher[] = [
    {
      id: '1',
      firstName: 'Mohamed',
      lastName: 'Ouahbi',
      email: 'm.ouahbi@um5.ac.ma',
      phone: '0661234567',
      department: 'Informatique',
      specialization: 'Intelligence Artificielle',
      position: 'Professeur',
      status: 'active',
      joinDate: '2015-09-01',
      coursesCount: 3
    },
    {
      id: '2',
      firstName: 'Ahmed',
      lastName: 'Bennani',
      email: 'a.bennani@um5.ac.ma',
      phone: '0662345678',
      department: 'Génie Civil',
      specialization: 'Structures',
      position: 'Professeur',
      status: 'active',
      joinDate: '2016-02-15',
      coursesCount: 4
    },
    {
      id: '3',
      firstName: 'Fatima Zahra',
      lastName: 'Belkasmi',
      email: 'fz.belkasmi@um5.ac.ma',
      phone: '0663456789',
      department: 'Génie Électrique',
      specialization: 'Électronique',
      position: 'Maître de conférences',
      status: 'active',
      joinDate: '2017-09-01',
      coursesCount: 3
    },
    {
      id: '4',
      firstName: 'Karim',
      lastName: 'Chaoui',
      email: 'k.chaoui@um5.ac.ma',
      phone: '0664567890',
      department: 'Gestion et Commerce',
      specialization: 'Marketing',
      position: 'Professeur assistant',
      status: 'active',
      joinDate: '2018-09-01',
      coursesCount: 2
    },
    {
      id: '5',
      firstName: 'Laila',
      lastName: 'El Amrani',
      email: 'l.elamrani@um5.ac.ma',
      phone: '0665678901',
      department: 'Langues et Communication',
      specialization: 'Anglais Technique',
      position: 'Maître de conférences',
      status: 'active',
      joinDate: '2016-09-01',
      coursesCount: 5
    },
    {
      id: '6',
      firstName: 'Naoufal',
      lastName: 'Rais',
      email: 'n.rais@um5.ac.ma',
      phone: '0666789012',
      department: 'Informatique',
      specialization: 'Développement Web',
      position: 'Professeur assistant',
      status: 'active',
      joinDate: '2019-09-01',
      coursesCount: 3
    },
    {
      id: '7',
      firstName: 'Samira',
      lastName: 'Douzi',
      email: 's.douzi@um5.ac.ma',
      phone: '0667890123',
      department: 'Informatique',
      specialization: 'Bases de données',
      position: 'Maître de conférences',
      status: 'on_leave',
      joinDate: '2017-09-01',
      coursesCount: 0
    },
    {
      id: '8',
      firstName: 'Omar',
      lastName: 'Bensouda',
      email: 'o.bensouda@um5.ac.ma',
      phone: '0668901234',
      department: 'Informatique',
      specialization: 'Data Science',
      position: 'Professeur',
      status: 'active',
      joinDate: '2015-09-01',
      coursesCount: 2
    },
    {
      id: '9',
      firstName: 'Khalid',
      lastName: 'Nafil',
      email: 'k.nafil@um5.ac.ma',
      phone: '0669012345',
      department: 'Informatique',
      specialization: 'Cybersécurité',
      position: 'Professeur assistant',
      status: 'inactive',
      joinDate: '2018-09-01',
      coursesCount: 0
    },
    {
      id: '10',
      firstName: 'Nadia',
      lastName: 'Tazi',
      email: 'n.tazi@um5.ac.ma',
      phone: '0670123456',
      department: 'Génie Civil',
      specialization: 'Matériaux',
      position: 'Professeur assistant',
      status: 'active',
      joinDate: '2019-09-01',
      coursesCount: 2
    }
  ];

  // Simuler le chargement des données
  useEffect(() => {
    const timer = setTimeout(() => {
      setTeachers(mockTeachers);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Fonction pour ouvrir le modal d'ajout
  const handleOpenAddModal = () => {
    setCurrentTeacher(null);
    setIsAddModalOpen(true);
  };
  
  // Fonction pour ouvrir le modal de modification
  const handleOpenEditModal = (teacher: Teacher) => {
    setCurrentTeacher(teacher);
    setIsEditModalOpen(true);
  };
  
  // Fonction pour ouvrir le modal de suppression
  const handleOpenDeleteModal = (teacher: Teacher) => {
    setCurrentTeacher(teacher);
    setIsDeleteModalOpen(true);
  };
  
  // Fonction pour gérer l'ajout d'un enseignant
  const handleAddTeacher = (data: any) => {
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      // Générer un ID unique
      const newTeacher = {
        ...data,
        id: `${Date.now()}`,
        joinDate: new Date().toISOString().split('T')[0],
        position: 'Professeur assistant',
        coursesCount: 0,
        status: 'active' as const
      };
      
      setTeachers([...teachers, newTeacher]);
      setIsSubmitting(false);
      setIsAddModalOpen(false);
    }, 1000);
  };
  
  // Fonction pour gérer la modification d'un enseignant
  const handleUpdateTeacher = (data: any) => {
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      const updatedTeachers = teachers.map(teacher => 
        teacher.id === data.id ? { ...teacher, ...data } : teacher
      );
      
      setTeachers(updatedTeachers);
      setIsSubmitting(false);
      setIsEditModalOpen(false);
    }, 1000);
  };
  
  // Fonction pour gérer la suppression d'un enseignant
  const handleDeleteTeacher = () => {
    if (!currentTeacher) return;
    
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      const filteredTeachers = teachers.filter(teacher => teacher.id !== currentTeacher.id);
      setTeachers(filteredTeachers);
      setIsSubmitting(false);
      setIsDeleteModalOpen(false);
    }, 1000);
  };

  // Filtrer les enseignants en fonction des critères de recherche
  const filteredTeachers = teachers.filter(teacher => {
    const searchMatch = searchTerm
      ? teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const departmentMatch = filterDepartment ? teacher.department === filterDepartment : true;
    const statusMatch = filterStatus ? teacher.status === filterStatus : true;
    
    return searchMatch && departmentMatch && statusMatch;
  });

  // Fonction pour obtenir la couleur en fonction du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Fonction pour obtenir le libellé du statut
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'on_leave':
        return 'En congé';
      case 'inactive':
        return 'Inactif';
      default:
        return status;
    }
  };

  // Données factices pour les départements
  const mockDepartmentOptions = [
    { value: '', label: 'Tous les départements' },
    { value: 'Informatique', label: 'Informatique' },
    { value: 'Génie Civil', label: 'Génie Civil' },
    { value: 'Génie Électrique', label: 'Génie Électrique' },
    { value: 'Gestion et Commerce', label: 'Gestion et Commerce' },
    { value: 'Langues et Communication', label: 'Langues et Communication' },
  ];

  // Données factices pour les statuts
  const mockStatusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'active', label: 'Actif' },
    { value: 'on_leave', label: 'En congé' },
    { value: 'inactive', label: 'Inactif' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des enseignants</h1>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#006faf] hover:bg-[#006faf]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006faf]"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Ajouter un enseignant
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
                placeholder="Rechercher par nom, prénom, email, téléphone ou spécialisation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="department-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Département
            </label>
            <select
              id="department-filter"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-[#006faf] focus:border-[#006faf] sm:text-sm rounded-md"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              {mockDepartmentOptions.map(option => (
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

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <svg className="animate-spin h-8 w-8 text-[#006faf]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="ml-2 text-gray-700">Chargement des données...</span>
        </div>
      ) : filteredTeachers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-500">
            {searchTerm || filterDepartment || filterStatus ? 
              "Aucun enseignant ne correspond aux critères de recherche." : 
              "Commencez par ajouter un enseignant."
            }
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="py-3 px-4 font-semibold">Nom</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Téléphone</th>
                <th className="py-3 px-4 font-semibold">Département</th>
                <th className="py-3 px-4 font-semibold">Spécialisation</th>
                <th className="py-3 px-4 font-semibold">Poste</th>
                <th className="py-3 px-4 font-semibold">Statut</th>
                <th className="py-3 px-4 font-semibold">Cours</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{teacher.firstName} {teacher.lastName}</td>
                  <td className="py-3 px-4">{teacher.email}</td>
                  <td className="py-3 px-4">{teacher.phone}</td>
                  <td className="py-3 px-4">{teacher.department}</td>
                  <td className="py-3 px-4">{teacher.specialization}</td>
                  <td className="py-3 px-4">{teacher.position}</td>
                  <td className="py-3 px-4">
                    <span className={`${getStatusColor(teacher.status)} py-1 px-2 rounded-full text-xs font-medium`}>
                      {getStatusLabel(teacher.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-full text-xs font-medium">
                      {teacher.coursesCount}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleOpenEditModal(teacher)}
                        className="text-[#006faf] hover:text-[#006faf]/80"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleOpenDeleteModal(teacher)}
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
      
      {/* Modal pour ajouter un enseignant */}
      <FormModal
        isOpen={isAddModalOpen}
        title="Ajouter un nouvel enseignant"
        onClose={() => setIsAddModalOpen(false)}
        size="lg"
      >
        <TeacherForm
          onSubmit={handleAddTeacher}
          onCancel={() => setIsAddModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </FormModal>

      {/* Modal pour modifier un enseignant */}
      <FormModal
        isOpen={isEditModalOpen}
        title="Modifier un enseignant"
        onClose={() => setIsEditModalOpen(false)}
        size="lg"
      >
        {currentTeacher && (
          <TeacherForm
            initialData={{
              id: currentTeacher.id,
              firstName: currentTeacher.firstName,
              lastName: currentTeacher.lastName,
              email: currentTeacher.email,
              phone: currentTeacher.phone,
              department: currentTeacher.department,
              speciality: currentTeacher.specialization,
              status: currentTeacher.status as any
            }}
            onSubmit={handleUpdateTeacher}
            onCancel={() => setIsEditModalOpen(false)}
            isSubmitting={isSubmitting}
          />
        )}
      </FormModal>

      {/* Modal pour confirmer la suppression */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer l'enseignant ${currentTeacher?.firstName} ${currentTeacher?.lastName} ?`}
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={handleDeleteTeacher}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default TeachersPage;
