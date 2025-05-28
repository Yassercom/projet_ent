import React, { useState, useEffect } from 'react';
import FormModal from '../../../common/FormModal';
import ConfirmModal from '../../../common/ConfirmModal';
import DepartmentForm from '../forms/DepartmentForm';

interface Department {
  id: string;
  name: string;
  head: string;
  faculty: string;
  createdAt: string;
  programsCount: number;
  teachersCount: number;
}

const DepartmentsPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // États pour les modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Données factices pour les départements
  const mockDepartments: Department[] = [
    {
      id: '1',
      name: 'Informatique',
      head: 'Dr. Mohamed Ouahbi',
      faculty: 'Sciences et Technologies',
      createdAt: '2020-09-01',
      programsCount: 3,
      teachersCount: 18
    },
    {
      id: '2',
      name: 'Génie Civil',
      head: 'Dr. Ahmed Bennani',
      faculty: 'Sciences et Technologies',
      createdAt: '2020-09-01',
      programsCount: 2,
      teachersCount: 12
    },
    {
      id: '3',
      name: 'Génie Électrique',
      head: 'Dr. Fatima Zahra Belkasmi',
      faculty: 'Sciences et Technologies',
      createdAt: '2020-09-01',
      programsCount: 2,
      teachersCount: 14
    },
    {
      id: '4',
      name: 'Gestion et Commerce',
      head: 'Dr. Karim Chaoui',
      faculty: 'Sciences Économiques',
      createdAt: '2020-09-01',
      programsCount: 3,
      teachersCount: 10
    },
    {
      id: '5',
      name: 'Langues et Communication',
      head: 'Dr. Laila El Amrani',
      faculty: 'Lettres et Sciences Humaines',
      createdAt: '2020-09-01',
      programsCount: 2,
      teachersCount: 11
    },
  ];

  useEffect(() => {
    // Simuler un appel API
    const timer = setTimeout(() => {
      setDepartments(mockDepartments);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  
  // Fonction pour ouvrir le modal d'ajout
  const handleOpenAddModal = () => {
    setCurrentDepartment(null);
    setIsAddModalOpen(true);
  };
  
  // Fonction pour ouvrir le modal de modification
  const handleOpenEditModal = (department: Department) => {
    setCurrentDepartment(department);
    setIsEditModalOpen(true);
  };
  
  // Fonction pour ouvrir le modal de suppression
  const handleOpenDeleteModal = (department: Department) => {
    setCurrentDepartment(department);
    setIsDeleteModalOpen(true);
  };
  
  // Fonction pour gérer l'ajout d'un département
  const handleAddDepartment = (data: any) => {
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      // Générer un ID unique
      const newDepartment = {
        ...data,
        id: `${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
        programsCount: 0,
        teachersCount: 0,
        faculty: 'Sciences et Technologies',
        head: data.headOfDepartment
      };
      
      setDepartments([...departments, newDepartment]);
      setIsSubmitting(false);
      setIsAddModalOpen(false);
    }, 1000);
  };
  
  // Fonction pour gérer la modification d'un département
  const handleUpdateDepartment = (data: any) => {
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      const updatedDepartments = departments.map(department => 
        department.id === data.id ? { 
          ...department, 
          name: data.name,
          head: data.headOfDepartment,
          faculty: 'Sciences et Technologies'
        } : department
      );
      
      setDepartments(updatedDepartments);
      setIsSubmitting(false);
      setIsEditModalOpen(false);
    }, 1000);
  };
  
  // Fonction pour gérer la suppression d'un département
  const handleDeleteDepartment = () => {
    if (!currentDepartment) return;
    
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      const filteredDepartments = departments.filter(department => department.id !== currentDepartment.id);
      setDepartments(filteredDepartments);
      setIsSubmitting(false);
      setIsDeleteModalOpen(false);
    }, 1000);
  };

  // Filtrer les départements en fonction du terme de recherche
  const filteredDepartments = departments.filter(
    (dept) => dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              dept.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
              dept.faculty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des départements</h1>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#006faf] hover:bg-[#006faf]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006faf]"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Ajouter un département
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Rechercher un département..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#006faf] focus:border-[#006faf] sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
      ) : filteredDepartments.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun département trouvé</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? "Aucun résultat pour votre recherche." : "Commencez par ajouter un département."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="py-3 px-4 font-semibold">Nom</th>
                <th className="py-3 px-4 font-semibold">Chef de département</th>
                <th className="py-3 px-4 font-semibold">Faculté</th>
                <th className="py-3 px-4 font-semibold">Filières</th>
                <th className="py-3 px-4 font-semibold">Enseignants</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredDepartments.map((dept) => (
                <tr key={dept.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{dept.name}</td>
                  <td className="py-3 px-4">{dept.head}</td>
                  <td className="py-3 px-4">{dept.faculty}</td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-full text-xs font-medium">
                      {dept.programsCount}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-amber-100 text-amber-800 py-1 px-2 rounded-full text-xs font-medium">
                      {dept.teachersCount}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleOpenEditModal(dept)}
                        className="text-[#006faf] hover:text-[#006faf]/80"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleOpenDeleteModal(dept)}
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
      
      {/* Modal pour ajouter un département */}
      <FormModal
        isOpen={isAddModalOpen}
        title="Ajouter un nouveau département"
        onClose={() => setIsAddModalOpen(false)}
        size="lg"
      >
        <DepartmentForm
          onSubmit={handleAddDepartment}
          onCancel={() => setIsAddModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </FormModal>

      {/* Modal pour modifier un département */}
      <FormModal
        isOpen={isEditModalOpen}
        title="Modifier un département"
        onClose={() => setIsEditModalOpen(false)}
        size="lg"
      >
        {currentDepartment && (
          <DepartmentForm
            initialData={{
              id: currentDepartment.id,
              name: currentDepartment.name,
              code: currentDepartment.id,
              description: 'Description du département',
              headOfDepartment: '1', // ID du responsable
              email: 'dept@um5.ac.ma',
              phone: '0537123456',
              location: 'Bâtiment A, 2ème étage'
            }}
            onSubmit={handleUpdateDepartment}
            onCancel={() => setIsEditModalOpen(false)}
            isSubmitting={isSubmitting}
          />
        )}
      </FormModal>

      {/* Modal pour confirmer la suppression */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer le département ${currentDepartment?.name} ?`}
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={handleDeleteDepartment}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default DepartmentsPage;
