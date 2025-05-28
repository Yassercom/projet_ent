import React, { useState, useEffect } from 'react';
import FormModal from '../../../common/FormModal';
import ConfirmModal from '../../../common/ConfirmModal';
import ProgramForm from '../forms/ProgramForm';

interface Program {
  id: string;
  name: string;
  code: string;
  department: string;
  coordinator: string;
  level: 'DUT' | 'Licence' | 'Master';
  studentsCount: number;
  groupsCount: number;
  createdAt: string;
}

const ProgramsPage: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  
  // États pour les modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Données factices pour les filières
  const mockPrograms: Program[] = [
    {
      id: '1',
      name: 'Ingénierie des Applications Web et Mobiles',
      code: 'IAWM',
      department: 'Informatique',
      coordinator: 'Dr. Mustapha Belkasmi',
      level: 'DUT',
      studentsCount: 320,
      groupsCount: 8,
      createdAt: '2020-09-01'
    },
    {
      id: '2',
      name: 'Big Data et Intelligence Artificielle',
      code: 'BDIA',
      department: 'Informatique',
      coordinator: 'Dr. Imane Raki',
      level: 'DUT',
      studentsCount: 295,
      groupsCount: 7,
      createdAt: '2021-09-01'
    },
    {
      id: '3',
      name: 'Ingénierie des Systèmes Informatiques et Communicants',
      code: 'ISIC',
      department: 'Informatique',
      coordinator: 'Dr. Youssef Hmamouche',
      level: 'DUT',
      studentsCount: 260,
      groupsCount: 6,
      createdAt: '2020-09-01'
    },
    {
      id: '4',
      name: 'Génie Civil',
      code: 'GC',
      department: 'Génie Civil',
      coordinator: 'Dr. Rachid Taouni',
      level: 'DUT',
      studentsCount: 180,
      groupsCount: 4,
      createdAt: '2020-09-01'
    },
    {
      id: '5',
      name: 'Génie Électrique',
      code: 'GE',
      department: 'Génie Électrique',
      coordinator: 'Dr. Saida Makram',
      level: 'DUT',
      studentsCount: 195,
      groupsCount: 5,
      createdAt: '2020-09-01'
    },
    {
      id: '6',
      name: 'Techniques Commerciales et Marketing',
      code: 'TCM',
      department: 'Gestion et Commerce',
      coordinator: 'Dr. Karim Talbi',
      level: 'DUT',
      studentsCount: 210,
      groupsCount: 5,
      createdAt: '2020-09-01'
    },
    {
      id: '7',
      name: 'Data Science pour Entreprise',
      code: 'DSE',
      department: 'Informatique',
      coordinator: 'Dr. Omar Bensouda',
      level: 'Licence',
      studentsCount: 85,
      groupsCount: 2,
      createdAt: '2022-09-01'
    },
    {
      id: '8',
      name: 'Intelligence Artificielle et Big Data',
      code: 'IABD',
      department: 'Informatique',
      coordinator: 'Dr. Soukaina Elhamdi',
      level: 'Master',
      studentsCount: 45,
      groupsCount: 1,
      createdAt: '2022-09-01'
    },
  ];

  // Liste des départements pour le filtre
  const departments = [...new Set(mockPrograms.map(p => p.department))];
  
  // Liste des niveaux pour le filtre
  const levels = [...new Set(mockPrograms.map(p => p.level))];

  useEffect(() => {
    // Simuler un appel API
    const timer = setTimeout(() => {
      setPrograms(mockPrograms);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  
  // Fonction pour ouvrir le modal d'ajout
  const handleOpenAddModal = () => {
    setCurrentProgram(null);
    setIsAddModalOpen(true);
  };
  
  // Fonction pour ouvrir le modal de modification
  const handleOpenEditModal = (program: Program) => {
    setCurrentProgram(program);
    setIsEditModalOpen(true);
  };
  
  // Fonction pour ouvrir le modal de suppression
  const handleOpenDeleteModal = (program: Program) => {
    setCurrentProgram(program);
    setIsDeleteModalOpen(true);
  };
  
  // Fonction pour gérer l'ajout d'une filière
  const handleAddProgram = (data: any) => {
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      // Générer un ID unique
      const newProgram = {
        ...data,
        id: `${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
        studentsCount: 0,
        groupsCount: 0,
        coordinator: 'Dr. Nouveau Coordinateur',
        department: data.department || 'Informatique',
        level: data.level || 'DUT'
      };
      
      setPrograms([...programs, newProgram]);
      setIsSubmitting(false);
      setIsAddModalOpen(false);
    }, 1000);
  };
  
  // Fonction pour gérer la modification d'une filière
  const handleUpdateProgram = (data: any) => {
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      const updatedPrograms = programs.map(program => 
        program.id === currentProgram?.id ? { 
          ...program, 
          name: data.title,
          code: data.code,
          department: data.department || program.department,
          level: data.level || program.level,
          coordinator: data.coordinator || program.coordinator
        } : program
      );
      
      setPrograms(updatedPrograms);
      setIsSubmitting(false);
      setIsEditModalOpen(false);
    }, 1000);
  };
  
  // Fonction pour gérer la suppression d'une filière
  const handleDeleteProgram = () => {
    if (!currentProgram) return;
    
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      const filteredPrograms = programs.filter(program => program.id !== currentProgram.id);
      setPrograms(filteredPrograms);
      setIsSubmitting(false);
      setIsDeleteModalOpen(false);
    }, 1000);
  };

  // Filtrer les filières en fonction des critères
  const filteredPrograms = programs.filter(
    (program) => {
      const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           program.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           program.coordinator.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = filterDepartment === '' || program.department === filterDepartment;
      
      const matchesLevel = filterLevel === '' || program.level === filterLevel;
      
      return matchesSearch && matchesDepartment && matchesLevel;
    }
  );

  // Fonction pour obtenir la couleur en fonction du niveau
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'DUT':
        return 'bg-green-100 text-green-800';
      case 'Licence':
        return 'bg-blue-100 text-blue-800';
      case 'Master':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des filières</h1>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#006faf] hover:bg-[#006faf]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006faf]"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Ajouter une filière
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
            placeholder="Rechercher une filière..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#006faf] focus:border-[#006faf] sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#006faf] focus:border-[#006faf] sm:text-sm"
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          <option value="">Tous les départements</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        
        <select
          className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#006faf] focus:border-[#006faf] sm:text-sm"
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
        >
          <option value="">Tous les niveaux</option>
          {levels.map((level) => (
            <option key={level} value={level}>{level}</option>
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
      ) : filteredPrograms.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune filière trouvée</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterDepartment || filterLevel ? 
              "Aucun résultat pour votre recherche." : 
              "Commencez par ajouter une filière."
            }
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="py-3 px-4 font-semibold">Code</th>
                <th className="py-3 px-4 font-semibold">Nom</th>
                <th className="py-3 px-4 font-semibold">Département</th>
                <th className="py-3 px-4 font-semibold">Niveau</th>
                <th className="py-3 px-4 font-semibold">Coordinateur</th>
                <th className="py-3 px-4 font-semibold">Étudiants</th>
                <th className="py-3 px-4 font-semibold">Groupes</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredPrograms.map((program) => (
                <tr key={program.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{program.code}</td>
                  <td className="py-3 px-4">{program.name}</td>
                  <td className="py-3 px-4">{program.department}</td>
                  <td className="py-3 px-4">
                    <span className={`${getLevelColor(program.level)} py-1 px-2 rounded-full text-xs font-medium`}>
                      {program.level}
                    </span>
                  </td>
                  <td className="py-3 px-4">{program.coordinator}</td>
                  <td className="py-3 px-4">
                    <span className="bg-indigo-100 text-indigo-800 py-1 px-2 rounded-full text-xs font-medium">
                      {program.studentsCount}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-amber-100 text-amber-800 py-1 px-2 rounded-full text-xs font-medium">
                      {program.groupsCount}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleOpenEditModal(program)}
                        className="text-[#006faf] hover:text-[#006faf]/80"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleOpenDeleteModal(program)}
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
      
      {/* Modal pour ajouter une filière */}
      <FormModal
        isOpen={isAddModalOpen}
        title="Ajouter une nouvelle filière"
        onClose={() => setIsAddModalOpen(false)}
        size="lg"
      >
        <ProgramForm
          onSubmit={handleAddProgram}
          onCancel={() => setIsAddModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </FormModal>

      {/* Modal pour modifier une filière */}
      <FormModal
        isOpen={isEditModalOpen}
        title="Modifier une filière"
        onClose={() => setIsEditModalOpen(false)}
        size="lg"
      >
        {currentProgram && (
          <ProgramForm
            initialData={{
              id: currentProgram.id,
              title: currentProgram.name,
              code: currentProgram.code,
              description: 'Description de la filière',
              department: currentProgram.department,
              coordinator: currentProgram.coordinator,
              level: currentProgram.level
            }}
            onSubmit={handleUpdateProgram}
            onCancel={() => setIsEditModalOpen(false)}
            isSubmitting={isSubmitting}
          />
        )}
      </FormModal>

      {/* Modal pour confirmer la suppression */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer la filière ${currentProgram?.name} ?`}
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={handleDeleteProgram}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default ProgramsPage;
