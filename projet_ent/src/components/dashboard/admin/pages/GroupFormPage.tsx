import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface GroupFormProps {
  onLogout?: () => void;
  isEditMode?: boolean;
  mode?: 'add' | 'edit';
}

interface Group {
  id?: string;
  name: string;
  program: string;
  year: number;
  estimatedSize: number;
  classTutor?: string;
}

// Données factices des filières pour le dropdown
const mockPrograms = [
  { id: '1', name: 'IAWM - Ingénierie des Applications Web et Mobiles' },
  { id: '2', name: 'BDIA - Big Data et Intelligence Artificielle' },
  { id: '3', name: 'ISIC - Ingénierie des Systèmes Informatiques et Communicants' },
  { id: '4', name: 'GC - Génie Civil' },
  { id: '5', name: 'GE - Génie Électrique' },
];

// Données factices des enseignants pour le dropdown de tuteur
const mockTeachers = [
  { id: '1', name: 'Dr. Mohamed Ouahbi' },
  { id: '2', name: 'Dr. Naoufal Rais' },
  { id: '3', name: 'Dr. Samira Douzi' },
  { id: '4', name: 'Dr. Omar Bensouda' },
  { id: '5', name: 'Dr. Ahmed Bennani' },
  { id: '6', name: 'Dr. Fatima Zahra Belkasmi' },
];

const GroupFormPage: React.FC<GroupFormProps> = ({ mode = 'add' }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = mode === 'edit' || !!id;
  
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [formData, setFormData] = useState<Group>({
    name: '',
    program: '',
    year: 1,
    estimatedSize: 40,
    classTutor: '',
  });
  
  // Simuler le chargement des données d'un groupe existant
  useEffect(() => {
    if (isEditMode && id) {
      // Simuler un appel API pour récupérer les détails du groupe
      const fetchGroupDetails = async () => {
        try {
          setIsLoading(true);
          // Simuler un délai réseau
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Données factices pour la démonstration
          const mockGroup: Group = {
            id,
            name: 'IAWM 1',
            program: '1', // ID de la filière IAWM
            year: 1,
            estimatedSize: 42,
            classTutor: '2', // ID de Dr. Naoufal Rais
          };
          
          setFormData(mockGroup);
        } catch (error) {
          console.error('Erreur lors de la récupération des détails du groupe:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchGroupDetails();
    }
  }, [id, isEditMode]);
  
  // Gestionnaire pour les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };
  
  // Gestionnaire pour la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      // Simuler un appel API pour enregistrer les données
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Log des données pour démonstration
      console.log('Données du groupe à enregistrer:', formData);
      
      // Rediriger vers la liste des groupes
      navigate('/admin/groups');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du groupe:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          {isEditMode ? 'Modifier un groupe' : 'Ajouter un groupe'}
        </h1>
        <p className="text-gray-600">
          {isEditMode
            ? 'Modifiez les informations du groupe existant.'
            : 'Créez un nouveau groupe d\'étudiants.'}
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-est-green"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du groupe <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Ex: IAWM 1, BDIA 2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                />
                <p className="text-xs text-gray-500 mt-1">Nom court du groupe</p>
              </div>
              
              <div>
                <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
                  Filière <span className="text-red-500">*</span>
                </label>
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                >
                  <option value="">Sélectionnez une filière</option>
                  {mockPrograms.map(program => (
                    <option key={program.id} value={program.id}>{program.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                  Année d'étude <span className="text-red-500">*</span>
                </label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                >
                  <option value="1">Première année</option>
                  <option value="2">Deuxième année</option>
                  <option value="3">Troisième année</option>
                  <option value="4">Quatrième année</option>
                  <option value="5">Cinquième année</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="estimatedSize" className="block text-sm font-medium text-gray-700 mb-1">
                  Effectif estimé <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="estimatedSize"
                  name="estimatedSize"
                  value={formData.estimatedSize}
                  onChange={handleChange}
                  required
                  min="1"
                  max="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                />
                <p className="text-xs text-gray-500 mt-1">Nombre approximatif d'étudiants dans ce groupe</p>
              </div>
              
              <div>
                <label htmlFor="classTutor" className="block text-sm font-medium text-gray-700 mb-1">
                  Tuteur de classe
                </label>
                <select
                  id="classTutor"
                  name="classTutor"
                  value={formData.classTutor}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                >
                  <option value="">Sélectionnez un tuteur (optionnel)</option>
                  {mockTeachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Enseignant responsable du suivi du groupe</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => navigate('/admin/groups')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-est-green text-white rounded-lg hover:bg-est-green/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Traitement...
                  </span>
                ) : (
                  isEditMode ? 'Modifier le groupe' : 'Ajouter le groupe'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default GroupFormPage;
