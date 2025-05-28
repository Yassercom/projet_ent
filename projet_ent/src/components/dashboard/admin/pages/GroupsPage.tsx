import React, { useState, useEffect } from 'react';
import FormModal from '../../../common/FormModal';
import ConfirmModal from '../../../common/ConfirmModal';
import GroupForm from '../forms/GroupForm';

interface Group {
  id: string;
  name: string;
  program: string;
  department: string;
  level: 'DUT' | 'Licence' | 'Master';
  year: number;
  studentsCount: number;
  coursesCount: number;
  classTutor?: string;
}

const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('');
  const [filterYear, setFilterYear] = useState<number | ''>('');
  
  // États pour les modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Données factices pour les groupes
  const mockGroups: Group[] = [
    {
      id: '1',
      name: 'IAWM1',
      program: 'IAWM',
      department: 'Informatique',
      level: 'DUT',
      year: 1,
      studentsCount: 42,
      coursesCount: 12,
      classTutor: 'Dr. Naoufal Rais'
    },
    {
      id: '2',
      name: 'IAWM2',
      program: 'IAWM',
      department: 'Informatique',
      level: 'DUT',
      year: 1,
      studentsCount: 40,
      coursesCount: 12,
      classTutor: 'Dr. Samira Douzi'
    },
    {
      id: '3',
      name: 'IAWM3',
      program: 'IAWM',
      department: 'Informatique',
      level: 'DUT',
      year: 2,
      studentsCount: 38,
      coursesCount: 10,
      classTutor: 'Dr. Khalid Nafil'
    },
    {
      id: '4',
      name: 'IAWM4',
      program: 'IAWM',
      department: 'Informatique',
      level: 'DUT',
      year: 2,
      studentsCount: 37,
      coursesCount: 10,
      classTutor: 'Dr. Asmae Benkirane'
    },
    {
      id: '5',
      name: 'BDIA1',
      program: 'BDIA',
      department: 'Informatique',
      level: 'DUT',
      year: 1,
      studentsCount: 45,
      coursesCount: 12,
      classTutor: 'Dr. Hassan Mekouar'
    },
    {
      id: '6',
      name: 'BDIA2',
      program: 'BDIA',
      department: 'Informatique',
      level: 'DUT',
      year: 1,
      studentsCount: 42,
      coursesCount: 12,
      classTutor: 'Dr. Mourad Zyani'
    },
    {
      id: '7',
      name: 'ISIC1',
      program: 'ISIC',
      department: 'Informatique',
      level: 'DUT',
      year: 1,
      studentsCount: 44,
      coursesCount: 12,
      classTutor: 'Dr. Fouad Lakrifa'
    },
    {
      id: '8',
      name: 'GC1',
      program: 'GC',
      department: 'Génie Civil',
      level: 'DUT',
      year: 1,
      studentsCount: 46,
      coursesCount: 11,
      classTutor: 'Dr. Nadia Tazi'
    },
    {
      id: '9',
      name: 'DSE1',
      program: 'DSE',
      department: 'Informatique',
      level: 'Licence',
      year: 3,
      studentsCount: 28,
      coursesCount: 8,
      classTutor: 'Dr. Zakaria Abidine'
    },
    {
      id: '10',
      name: 'IABD1',
      program: 'IABD',
      department: 'Informatique',
      level: 'Master',
      year: 1,
      studentsCount: 24,
      coursesCount: 8,
      classTutor: 'Dr. Omar Bensouda'
    },
  ];

  // Liste des programmes pour le filtre
  const programs = [...new Set(mockGroups.map(g => g.program))];
  
  // Liste des années pour le filtre
  const years = [...new Set(mockGroups.map(g => g.year))];

  useEffect(() => {
    // Simuler un appel API
    const timer = setTimeout(() => {
      setGroups(mockGroups);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  
  // Fonction pour ouvrir le modal d'ajout
  const handleOpenAddModal = () => {
    setCurrentGroup(null);
    setIsAddModalOpen(true);
  };
  
  // Fonction pour ouvrir le modal de modification
  const handleOpenEditModal = (group: Group) => {
    setCurrentGroup(group);
    setIsEditModalOpen(true);
  };
  
  // Fonction pour ouvrir le modal de suppression
  const handleOpenDeleteModal = (group: Group) => {
    setCurrentGroup(group);
    setIsDeleteModalOpen(true);
  };
  
  // Fonction pour gérer l'ajout d'un groupe
  const handleAddGroup = (data: any) => {
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      // Générer un ID unique
      const newGroup = {
        ...data,
        id: `${Date.now()}`,
        department: 'Informatique', // Valeur par défaut
        studentsCount: 0,
        coursesCount: 0,
        year: parseInt(data.year),
        classTutor: data.classTutor ? `Dr. ${data.classTutor}` : undefined
      };
      
      setGroups([...groups, newGroup]);
      setIsSubmitting(false);
      setIsAddModalOpen(false);
    }, 1000);
  };
  
  // Fonction pour gérer la modification d'un groupe
  const handleUpdateGroup = (data: any) => {
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      const updatedGroups = groups.map(group => 
        group.id === currentGroup?.id ? { 
          ...group, 
          name: data.name,
          program: data.program,
          level: data.level,
          year: parseInt(data.year),
          classTutor: data.classTutor ? `Dr. ${data.classTutor}` : undefined
        } : group
      );
      
      setGroups(updatedGroups);
      setIsSubmitting(false);
      setIsEditModalOpen(false);
    }, 1000);
  };
  
  // Fonction pour gérer la suppression d'un groupe
  const handleDeleteGroup = () => {
    if (!currentGroup) return;
    
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      const filteredGroups = groups.filter(group => group.id !== currentGroup.id);
      setGroups(filteredGroups);
      setIsSubmitting(false);
      setIsDeleteModalOpen(false);
    }, 1000);
  };

  // Filtrer les groupes en fonction des critères
  const filteredGroups = groups.filter(
    (group) => {
      const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (group.classTutor && group.classTutor.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesProgram = filterProgram === '' || group.program === filterProgram;
      
      const matchesYear = filterYear === '' || group.year === filterYear;
      
      return matchesSearch && matchesProgram && matchesYear;
    }
  );

  // Fonction pour obtenir la couleur en fonction du niveau
  const getLevelColor = (level: string) => {
    switch(level) {
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
        <h1 className="text-2xl font-bold text-gray-800">Gestion des groupes</h1>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#006faf] hover:bg-[#006faf]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006faf]"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Ajouter un groupe
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
            placeholder="Rechercher un groupe..."
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
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value === '' ? '' : parseInt(e.target.value))}
        >
          <option value="">Toutes les années</option>
          {years.map((year) => (
            <option key={year} value={year}>Année {year}</option>
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
      ) : filteredGroups.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun groupe trouvé</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterProgram || filterYear ? 
              "Aucun résultat pour votre recherche." : 
              "Commencez par ajouter un groupe."
            }
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="py-3 px-4 font-semibold">Nom</th>
                <th className="py-3 px-4 font-semibold">Filière</th>
                <th className="py-3 px-4 font-semibold">Niveau</th>
                <th className="py-3 px-4 font-semibold">Année</th>
                <th className="py-3 px-4 font-semibold">Tuteur</th>
                <th className="py-3 px-4 font-semibold">Étudiants</th>
                <th className="py-3 px-4 font-semibold">Cours</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredGroups.map((group) => (
                <tr key={group.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{group.name}</td>
                  <td className="py-3 px-4">{group.program}</td>
                  <td className="py-3 px-4">
                    <span className={`${getLevelColor(group.level)} py-1 px-2 rounded-full text-xs font-medium`}>
                      {group.level}
                    </span>
                  </td>
                  <td className="py-3 px-4">Année {group.year}</td>
                  <td className="py-3 px-4">{group.classTutor || '-'}</td>
                  <td className="py-3 px-4">
                    <span className="bg-indigo-100 text-indigo-800 py-1 px-2 rounded-full text-xs font-medium">
                      {group.studentsCount}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-amber-100 text-amber-800 py-1 px-2 rounded-full text-xs font-medium">
                      {group.coursesCount}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleOpenEditModal(group)}
                        className="text-[#006faf] hover:text-[#006faf]/80"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleOpenDeleteModal(group)}
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
      
      {/* Modal pour ajouter un groupe */}
      <FormModal
        isOpen={isAddModalOpen}
        title="Ajouter un nouveau groupe"
        onClose={() => setIsAddModalOpen(false)}
        size="lg"
      >
        <GroupForm
          onSubmit={handleAddGroup}
          onCancel={() => setIsAddModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </FormModal>

      {/* Modal pour modifier un groupe */}
      <FormModal
        isOpen={isEditModalOpen}
        title="Modifier un groupe"
        onClose={() => setIsEditModalOpen(false)}
        size="lg"
      >
        {currentGroup && (
          <GroupForm
            initialData={{
              id: currentGroup.id,
              name: currentGroup.name,
              program: currentGroup.program,
              level: currentGroup.level,
              year: currentGroup.year,
              classTutor: currentGroup.classTutor ? currentGroup.classTutor.replace('Dr. ', '') : '',
              capacity: 40 // Valeur par défaut
            }}
            onSubmit={handleUpdateGroup}
            onCancel={() => setIsEditModalOpen(false)}
            isSubmitting={isSubmitting}
          />
        )}
      </FormModal>

      {/* Modal pour confirmer la suppression */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer le groupe ${currentGroup?.name} ?`}
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={handleDeleteGroup}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default GroupsPage;
