import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface ProgramFormProps {
  onLogout?: () => void;
  isEditMode?: boolean;
  mode?: 'add' | 'edit';
}

interface Program {
  id?: string;
  code: string;
  name: string;
  department: string;
  level: 'DUT' | 'Licence' | 'Master';
  coordinator: string;
  description: string;
}

// Données factices des départements pour le dropdown
const mockDepartments = [
  { id: '1', name: 'Informatique' },
  { id: '2', name: 'Génie Civil' },
  { id: '3', name: 'Génie Électrique' },
  { id: '4', name: 'Gestion et Commerce' },
  { id: '5', name: 'Langues et Communication' },
];

// Données factices des enseignants pour le dropdown de coordonnateur
const mockTeachers = [
  { id: '1', name: 'Dr. Mohamed Ouahbi' },
  { id: '2', name: 'Dr. Naoufal Rais' },
  { id: '3', name: 'Dr. Samira Douzi' },
  { id: '4', name: 'Dr. Omar Bensouda' },
  { id: '5', name: 'Dr. Ahmed Bennani' },
  { id: '6', name: 'Dr. Fatima Zahra Belkasmi' },
];

const ProgramFormPage: React.FC<ProgramFormProps> = ({ mode = 'add' }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = mode === 'edit' || !!id;
  
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [formData, setFormData] = useState<Program>({
    code: '',
    name: '',
    department: '',
    level: 'DUT',
    coordinator: '',
    description: '',
  });
  
  // Simuler le chargement des données d'une filière existante
  useEffect(() => {
    if (isEditMode && id) {
      // Simuler un appel API pour récupérer les détails de la filière
      const fetchProgramDetails = async () => {
        try {
          setIsLoading(true);
          // Simuler un délai réseau
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Données factices pour la démonstration
          const mockProgram: Program = {
            id,
            code: 'IAWM',
            name: 'Ingénierie des Applications Web et Mobiles',
            department: '1', // ID du département Informatique
            level: 'DUT',
            coordinator: '2', // ID de Dr. Naoufal Rais
            description: 'Formation axée sur le développement des applications web et mobiles modernes, incluant les frameworks frontend et backend, ainsi que les méthodologies DevOps.',
          };
          
          setFormData(mockProgram);
        } catch (error) {
          console.error('Erreur lors de la récupération des détails de la filière:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchProgramDetails();
    }
  }, [id, isEditMode]);
  
  // Gestionnaire pour les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      console.log('Données de la filière à enregistrer:', formData);
      
      // Rediriger vers la liste des filières
      navigate('/admin/programs');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la filière:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          {isEditMode ? 'Modifier une filière' : 'Ajouter une filière'}
        </h1>
        <p className="text-gray-600">
          {isEditMode
            ? 'Modifiez les informations de la filière existante.'
            : 'Créez une nouvelle filière dans l\'établissement.'}
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
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  Code de la filière <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  placeholder="Ex: IAWM, BDIA"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                />
                <p className="text-xs text-gray-500 mt-1">Code court utilisé pour identifier la filière</p>
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Ingénierie des Applications Web et Mobiles"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                />
              </div>
              
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Département <span className="text-red-500">*</span>
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                >
                  <option value="">Sélectionnez un département</option>
                  {mockDepartments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                  Niveau <span className="text-red-500">*</span>
                </label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                >
                  <option value="DUT">DUT</option>
                  <option value="Licence">Licence</option>
                  <option value="Master">Master</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="coordinator" className="block text-sm font-medium text-gray-700 mb-1">
                  Coordonnateur <span className="text-red-500">*</span>
                </label>
                <select
                  id="coordinator"
                  name="coordinator"
                  value={formData.coordinator}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                >
                  <option value="">Sélectionnez un coordonnateur</option>
                  {mockTeachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Enseignant responsable de la coordination de la filière</p>
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Description des objectifs, débouchés et contenus de la filière..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
              />
            </div>
            
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => navigate('/admin/programs')}
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
                  isEditMode ? 'Modifier la filière' : 'Créer la filière'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProgramFormPage;
