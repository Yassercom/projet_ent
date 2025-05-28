import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface DepartmentFormProps {
  onLogout?: () => void;
  isEditMode?: boolean;
  mode?: 'add' | 'edit';
}

interface Department {
  id?: string;
  name: string;
  description: string;
  head?: string;
  faculty?: string;
}

const DepartmentFormPage: React.FC<DepartmentFormProps> = ({ mode = 'add' }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = mode === 'edit' || !!id;
  
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [formData, setFormData] = useState<Department>({
    name: '',
    description: '',
    head: '',
    faculty: '',
  });
  
  // Simuler le chargement des données d'un département existant
  useEffect(() => {
    if (isEditMode && id) {
      // Simuler un appel API pour récupérer les détails du département
      const fetchDepartmentDetails = async () => {
        try {
          setIsLoading(true);
          // Simuler un délai réseau
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Données factices pour la démonstration
          const mockDepartment: Department = {
            id,
            name: 'Informatique',
            description: 'Département regroupant les formations en informatique, incluant le développement web, la data science et les infrastructures réseaux.',
            head: 'Dr. Mohamed Ouahbi',
            faculty: 'Sciences et Technologies',
          };
          
          setFormData(mockDepartment);
        } catch (error) {
          console.error('Erreur lors de la récupération des détails du département:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchDepartmentDetails();
    }
  }, [id, isEditMode]);
  
  // Gestionnaire pour les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      console.log('Données du département à enregistrer:', formData);
      
      // Rediriger vers la liste des départements
      navigate('/admin/departments');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du département:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          {isEditMode ? 'Modifier un département' : 'Ajouter un département'}
        </h1>
        <p className="text-gray-600">
          {isEditMode
            ? 'Modifiez les informations du département existant.'
            : 'Créez un nouveau département dans l\'établissement.'}
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-est-green"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du département <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Informatique, Génie Civil"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                />
              </div>
              
              <div>
                <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">
                  Faculté
                </label>
                <input
                  type="text"
                  id="faculty"
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  placeholder="Ex: Sciences et Technologies"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                />
                <p className="text-xs text-gray-500 mt-1">Faculté ou école à laquelle le département est rattaché</p>
              </div>
              
              <div>
                <label htmlFor="head" className="block text-sm font-medium text-gray-700 mb-1">
                  Chef de département
                </label>
                <input
                  type="text"
                  id="head"
                  name="head"
                  value={formData.head}
                  onChange={handleChange}
                  placeholder="Ex: Dr. Ahmed Bennani"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                />
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
                  placeholder="Description des activités et objectifs du département..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => navigate('/admin/departments')}
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
                  isEditMode ? 'Enregistrer les modifications' : 'Créer le département'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DepartmentFormPage;
