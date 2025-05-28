import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface TeacherFormProps {
  onLogout?: () => void;
  isEditMode?: boolean;
  mode?: 'add' | 'edit';
}

interface Teacher {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  department: string;
  position: string;
  assignedGroups: string[];
}

// Données factices des départements pour le dropdown
const mockDepartments = [
  { id: '1', name: 'Informatique' },
  { id: '2', name: 'Génie Civil' },
  { id: '3', name: 'Génie Électrique' },
  { id: '4', name: 'Gestion et Commerce' },
  { id: '5', name: 'Langues et Communication' },
];

// Données factices des groupes pour le multi-select
const mockGroups = [
  { id: '1', name: 'IAWM 1', program: 'IAWM', year: 1 },
  { id: '2', name: 'IAWM 2', program: 'IAWM', year: 1 },
  { id: '3', name: 'IAWM 3', program: 'IAWM', year: 2 },
  { id: '4', name: 'IAWM 4', program: 'IAWM', year: 2 },
  { id: '5', name: 'BDIA 1', program: 'BDIA', year: 1 },
  { id: '6', name: 'BDIA 2', program: 'BDIA', year: 1 },
  { id: '7', name: 'BDIA 3', program: 'BDIA', year: 2 },
  { id: '8', name: 'ISIC 1', program: 'ISIC', year: 1 },
  { id: '9', name: 'GC 1', program: 'GC', year: 1 },
  { id: '10', name: 'GE 1', program: 'GE', year: 1 },
];

// Positions académiques disponibles
const academicPositions = [
  'Professeur de l\'enseignement supérieur',
  'Professeur habilité',
  'Professeur assistant',
  'Maître de conférences',
  'Assistant',
  'Vacataire'
];

const TeacherFormPage: React.FC<TeacherFormProps> = ({ mode = 'add' }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = mode === 'edit' || !!id;
  
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [formData, setFormData] = useState<Teacher>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialization: '',
    department: '',
    position: '',
    assignedGroups: [],
  });
  
  // État pour gérer l'affichage des groupes filtrés par département
  const [filteredGroups, setFilteredGroups] = useState(mockGroups);
  
  // Simuler le chargement des données d'un enseignant existant
  useEffect(() => {
    if (isEditMode && id) {
      // Simuler un appel API pour récupérer les détails de l'enseignant
      const fetchTeacherDetails = async () => {
        try {
          setIsLoading(true);
          // Simuler un délai réseau
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Données factices pour la démonstration
          const mockTeacher: Teacher = {
            id,
            firstName: 'Naoufal',
            lastName: 'Rais',
            email: 'n.rais@um5.ac.ma',
            phone: '0666789012',
            specialization: 'Développement Web',
            department: '1', // ID du département Informatique
            position: 'Professeur assistant',
            assignedGroups: ['1', '2', '3'], // IDs des groupes assignés
          };
          
          setFormData(mockTeacher);
        } catch (error) {
          console.error('Erreur lors de la récupération des détails de l\'enseignant:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchTeacherDetails();
    }
  }, [id, isEditMode]);
  
  // Gestionnaire pour les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Gestionnaire pour les changements dans le multi-select des groupes
  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      assignedGroups: selectedOptions
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
      console.log('Données de l\'enseignant à enregistrer:', formData);
      
      // Rediriger vers la liste des enseignants
      navigate('/admin/teachers');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'enseignant:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          {isEditMode ? 'Modifier un enseignant' : 'Ajouter un enseignant'}
        </h1>
        <p className="text-gray-600">
          {isEditMode
            ? 'Modifiez les informations de l\'enseignant existant.'
            : 'Créez un nouveau compte enseignant dans l\'établissement.'}
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
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Mohamed"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Ouahbi"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email professionnel <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Ex: m.ouahbi@um5.ac.ma"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                />
                <p className="text-xs text-gray-500 mt-1">Cet email sera utilisé pour l'authentification</p>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de téléphone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Ex: 0661234567"
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
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                  Poste <span className="text-red-500">*</span>
                </label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                >
                  <option value="">Sélectionnez un poste</option>
                  {academicPositions.map((position, index) => (
                    <option key={index} value={position}>{position}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                  Spécialité <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Intelligence Artificielle, Développement Web, Structures..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="assignedGroups" className="block text-sm font-medium text-gray-700 mb-1">
                  Affectations (groupes)
                </label>
                <select
                  id="assignedGroups"
                  name="assignedGroups"
                  multiple
                  value={formData.assignedGroups}
                  onChange={handleGroupChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green h-40"
                >
                  {mockGroups.map(group => (
                    <option key={group.id} value={group.id}>
                      {group.name} ({group.program}, Année {group.year})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Maintenez Ctrl (ou Cmd) pour sélectionner plusieurs groupes
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => navigate('/admin/teachers')}
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
                  isEditMode ? 'Enregistrer les modifications' : 'Créer le compte enseignant'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TeacherFormPage;
