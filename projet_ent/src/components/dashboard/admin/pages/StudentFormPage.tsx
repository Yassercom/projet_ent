import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface StudentFormProps {
  mode?: 'add' | 'edit' | 'batch';
  onLogout?: () => void;
  isEditMode?: boolean;
}

interface Student {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  cne: string;
  group: string;
  program?: string;
}

// Données factices des filières pour le dropdown
const mockPrograms = [
  { id: '1', name: 'IAWM - Ingénierie des Applications Web et Mobiles' },
  { id: '2', name: 'BDIA - Big Data et Intelligence Artificielle' },
  { id: '3', name: 'ISIC - Ingénierie des Systèmes Informatiques et Communicants' },
  { id: '4', name: 'GC - Génie Civil' },
  { id: '5', name: 'GE - Génie Électrique' },
];

// Données factices des groupes pour le dropdown
const mockGroups = {
  '1': [ // IAWM
    { id: '1', name: 'IAWM 1', year: 1 },
    { id: '2', name: 'IAWM 2', year: 1 },
    { id: '3', name: 'IAWM 3', year: 2 },
    { id: '4', name: 'IAWM 4', year: 2 },
  ],
  '2': [ // BDIA
    { id: '5', name: 'BDIA 1', year: 1 },
    { id: '6', name: 'BDIA 2', year: 1 },
    { id: '7', name: 'BDIA 3', year: 2 },
  ],
  '3': [ // ISIC
    { id: '8', name: 'ISIC 1', year: 1 },
    { id: '9', name: 'ISIC 2', year: 1 },
  ],
  '4': [ // GC
    { id: '10', name: 'GC 1', year: 1 },
  ],
  '5': [ // GE
    { id: '11', name: 'GE 1', year: 1 },
  ],
};

const StudentFormPage: React.FC<StudentFormProps> = ({ mode = 'add', isEditMode: editModeProp }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = editModeProp || mode === 'edit' || !!id;
  // Keep this variable for future implementation of batch mode
  
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [formData, setFormData] = useState<Student>({
    firstName: '',
    lastName: '',
    email: '',
    cne: '',
    group: '',
    program: '',
  });
  
  // État pour gérer l'importation en masse
  const [, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<Student[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadError, setUploadError] = useState('');
  
  // État pour gérer les groupes filtrés par filière
  const [filteredGroups, setFilteredGroups] = useState<{ id: string; name: string; year: number }[]>([]);
  
  // Référence au input file pour le déclencher via un bouton
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Simuler le chargement des données d'un étudiant existant
  useEffect(() => {
    if (isEditMode && id) {
      // Simuler un appel API pour récupérer les détails de l'étudiant
      const fetchStudentDetails = async () => {
        try {
          setIsLoading(true);
          // Simuler un délai réseau
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Données factices pour la démonstration
          const mockStudent: Student = {
            id,
            firstName: 'Hamza',
            lastName: 'Bencharki',
            email: 'h.bencharki@student.um5.ac.ma',
            cne: 'G12345678',
            program: '1', // ID de la filière IAWM
            group: '1', // ID du groupe IAWM 1
          };
          
          setFormData(mockStudent);
          // Mettre à jour les groupes filtrés en fonction de la filière
          if (mockStudent.program) {
            setFilteredGroups(mockGroups[mockStudent.program as keyof typeof mockGroups] || []);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des détails de l\'étudiant:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchStudentDetails();
    }
  }, [id, isEditMode]);
  
  // Mettre à jour les groupes quand la filière change
  useEffect(() => {
    if (formData.program) {
      setFilteredGroups(mockGroups[formData.program as keyof typeof mockGroups] || []);
      // Réinitialiser le groupe si la filière change
      if (!isEditMode) {
        setFormData(prev => ({ ...prev, group: '' }));
      }
    } else {
      setFilteredGroups([]);
    }
  }, [formData.program, isEditMode]);
  
  // Gestionnaire pour les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Gestionnaire pour le changement de fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setUploadError('');
    
    if (selectedFile) {
      // Vérifier l'extension du fichier
      const extension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (extension !== 'csv' && extension !== 'xlsx') {
        setUploadError('Format de fichier non supporté. Veuillez utiliser un fichier CSV ou Excel (XLSX).');
        return;
      }
      
      setFile(selectedFile);
      
      // Simuler la lecture du fichier et la prévisualisation des données
      // Dans un cas réel, vous utiliseriez une bibliothèque comme papaparse pour CSV ou xlsx pour Excel
      setTimeout(() => {
        const mockImportedStudents: Student[] = [
          {
            firstName: 'Ahmed',
            lastName: 'Tazi',
            email: 'a.tazi@student.um5.ac.ma',
            cne: 'G23456789',
            group: '1', // IAWM 1
          },
          {
            firstName: 'Fatima',
            lastName: 'Zahra',
            email: 'f.zahra@student.um5.ac.ma',
            cne: 'G34567890',
            group: '1', // IAWM 1
          },
          {
            firstName: 'Karim',
            lastName: 'Bennani',
            email: 'k.bennani@student.um5.ac.ma',
            cne: 'G45678901',
            group: '2', // IAWM 2
          },
        ];
        
        setPreviewData(mockImportedStudents);
        setShowPreview(true);
      }, 1000);
    }
  };
  
  // Gestionnaire pour la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      // Simuler un appel API pour enregistrer les données
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (showPreview && previewData.length > 0) {
        // Log des données en masse pour démonstration
        console.log('Données des étudiants importés à enregistrer:', previewData);
      } else {
        // Log des données individuelles pour démonstration
        console.log('Données de l\'étudiant à enregistrer:', formData);
      }
      
      // Rediriger vers la liste des étudiants
      navigate('/admin/students');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'étudiant:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fonction pour ajouter un nouvel étudiant (réinitialiser le formulaire)
  const handleAddAnother = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      cne: '',
      group: '',
      program: formData.program, // Conserver la filière sélectionnée
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Titre de la page */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{isEditMode ? "Modifier un étudiant" : "Ajouter des étudiants"}</h1>
        <p className="text-gray-600">{isEditMode ? "Modifiez les informations de l'étudiant." : "Ajoutez un ou plusieurs étudiants dans l'établissement."}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Onglets pour choisir entre ajout individuel et importation */}
        {!isEditMode && (
          <div className="flex border-b">
            <button
              className={`py-4 px-8 font-medium transition-all ${!showPreview ? 'text-est-green border-b-2 border-est-green bg-gray-50' : 'text-gray-500 hover:text-est-green hover:bg-gray-50'}`}
              onClick={() => setShowPreview(false)}
            >
              Ajout individuel
            </button>
            <button
              className={`py-4 px-8 font-medium transition-all ${showPreview ? 'text-est-green border-b-2 border-est-green bg-gray-50' : 'text-gray-500 hover:text-est-green hover:bg-gray-50'}`}
              onClick={() => fileInputRef.current?.click()}
            >
              Importation en masse
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
            />
          </div>
        )}
        {isLoading ? (
          <div className="p-12 flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-3 border-b-3 border-est-green shadow-lg"></div>
            <p className="ml-4 text-gray-500 font-medium">Chargement...</p>
          </div>
        ) : showPreview && previewData.length > 0 ? (
          // Affichage de la prévisualisation des données importées
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Aperçu des données ({previewData.length} étudiants)
              </h2>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPreviewData([]);
                    setShowPreview(false);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-est-green text-white rounded-lg hover:bg-est-green/90"
                >
                  Importer les étudiants
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prénom
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CNE
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Groupe
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {previewData.map((student, index) => {
                    // Trouver le nom du groupe à partir de l'ID
                    const groupName = Object.values(mockGroups)
                      .flat()
                      .find(g => g.id === student.group)?.name || student.group;
                      
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.firstName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.cne}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {groupName}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {uploadError && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md">
                {uploadError}
              </div>
            )}
          </div>
        ) : (
          // Formulaire d'ajout/modification individuel
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Ahmed"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-est-green/30 focus:border-est-green transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Tazi"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-est-green/30 focus:border-est-green transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Ex: a.tazi@student.um5.ac.ma"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-est-green/30 focus:border-est-green transition-all"
                />
                <p className="text-xs text-gray-500 mt-2">Cet email sera utilisé pour l'authentification</p>
              </div>
              
              <div>
                <label htmlFor="cne" className="block text-sm font-medium text-gray-700 mb-2">
                  CNE <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="cne"
                  name="cne"
                  value={formData.cne}
                  onChange={handleChange}
                  required
                  placeholder="Ex: G12345678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-est-green/30 focus:border-est-green transition-all"
                />
                <p className="text-xs text-gray-500 mt-2">Code National de l'Étudiant</p>
              </div>
              
              <div>
                <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-2">
                  Filière <span className="text-red-500">*</span>
                </label>
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-est-green/30 focus:border-est-green transition-all appearance-none bg-white"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`, paddingRight: `2.5rem` }}
                >
                  <option value="">Sélectionnez une filière</option>
                  {mockPrograms.map(program => (
                    <option key={program.id} value={program.id}>{program.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="group" className="block text-sm font-medium text-gray-700 mb-2">
                  Groupe <span className="text-red-500">*</span>
                </label>
                <select
                  id="group"
                  name="group"
                  value={formData.group}
                  onChange={handleChange}
                  required
                  disabled={!formData.program}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-est-green/30 focus:border-est-green transition-all appearance-none bg-white disabled:bg-gray-100 disabled:text-gray-500"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`, paddingRight: `2.5rem` }}
                >
                  <option value="">Sélectionnez un groupe</option>
                  {filteredGroups.map(group => (
                    <option key={group.id} value={group.id}>
                      {group.name} (Année {group.year})
                    </option>
                  ))}
                </select>
                {!formData.program && (
                  <p className="text-xs text-amber-500 mt-2">Veuillez d'abord sélectionner une filière</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end items-center space-x-4 pt-8 mt-8 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate('/admin/students')}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm font-medium"
              >
                Annuler
              </button>
              
              {!isEditMode && (
                <button
                  type="button"
                  onClick={handleAddAnother}
                  className="px-6 py-3 border-2 border-est-green text-est-green rounded-lg hover:bg-est-green/5 transition-colors shadow-sm font-medium"
                >
                  Ajouter & Continuer
                </button>
              )}
              
              {!isEditMode && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 border-2 border-est-blue text-est-blue rounded-lg hover:bg-est-blue/5 transition-colors shadow-sm font-medium"
                >
                  Importer depuis fichier
                </button>
              )}
              
              <button
                type="submit"
                className="px-8 py-3 bg-est-green text-white rounded-lg hover:bg-est-green/90 transition-colors shadow-md font-medium"
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
                  isEditMode ? 'Enregistrer les modifications' : 'Ajouter l\'étudiant'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
      
      {/* Informations sur le format d'importation */}
      {!isEditMode && !showPreview && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Importation en masse</h3>
          <p className="text-sm text-blue-700">
            Pour importer plusieurs étudiants à la fois, préparez un fichier CSV ou Excel (XLSX) avec les colonnes suivantes :
          </p>
          <ul className="list-disc list-inside text-sm text-blue-700 mt-2">
            <li>Nom (lastName)</li>
            <li>Prénom (firstName)</li>
            <li>Email (email)</li>
            <li>CNE (cne)</li>
            <li>ID Groupe (group)</li>
          </ul>
          <p className="text-sm text-blue-700 mt-2">
            Vous pouvez télécharger un <a href="#" className="underline font-medium">modèle de fichier ici</a>.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentFormPage;
