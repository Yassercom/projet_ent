import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface CourseFormData {
  id?: string;
  title: string;
  description: string;
  group: string;
  pdfSupport?: File | null;
  externalLinks: string[];
}

interface Group {
  id: string;
  name: string;
  department: string;
}

interface AddEditCoursePageProps {
  isEditMode?: boolean;
}

const AddEditCoursePage: React.FC<AddEditCoursePageProps> = ({ isEditMode = false }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string>('');
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string>('');
  const [newLink, setNewLink] = useState<string>('');
  
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    group: '',
    pdfSupport: null,
    externalLinks: []
  });

  // Données fictives pour les groupes
  const mockGroups: Group[] = [
    { id: '1', name: 'GI-1', department: 'Informatique' },
    { id: '2', name: 'GI-2', department: 'Informatique' },
    { id: '3', name: 'GI-3', department: 'Informatique' },
    { id: '4', name: 'BDIA-1', department: 'Informatique' },
    { id: '5', name: 'BDIA-2', department: 'Informatique' },
    { id: '6', name: 'IAWM-1', department: 'Informatique' },
    { id: '7', name: 'GE-1', department: 'Électronique' },
    { id: '8', name: 'GE-2', department: 'Électronique' },
    { id: '9', name: 'GM-1', department: 'Mécanique' },
    { id: '10', name: 'GM-2', department: 'Mécanique' },
  ];

  // Cours fictif pour le mode édition
  const mockCourse: CourseFormData = {
    id: '123',
    title: 'Intelligence Artificielle et Machine Learning',
    description: 'Introduction aux concepts de l\'IA et applications pratiques avec Python. Ce cours couvre les bases de l\'apprentissage automatique, les réseaux de neurones et le traitement du langage naturel.',
    group: '4', // ID du groupe BDIA-1
    externalLinks: [
      'https://www.coursera.org/learn/machine-learning',
      'https://www.tensorflow.org/tutorials'
    ]
  };

  // Charger les données
  useEffect(() => {
    setIsLoading(true);
    
    // Simuler le chargement des groupes
    setTimeout(() => {
      setGroups(mockGroups);
      
      // Si en mode édition, charger les données du cours
      if (isEditMode && id) {
        // Simuler la récupération des données du cours
        setFormData(mockCourse);
        setPdfFileName('support_cours_ia.pdf');
      }
      
      setIsLoading(false);
    }, 1000);
  }, [isEditMode, id]);

  // Gérer les changements dans le formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gérer l'upload de fichier PDF
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Vérifier si c'est un PDF
      if (file.type !== 'application/pdf') {
        alert('Veuillez sélectionner un fichier PDF');
        return;
      }
      
      setPdfFile(file);
      setPdfFileName(file.name);
      
      // Créer une URL pour la prévisualisation
      const fileUrl = URL.createObjectURL(file);
      setPdfPreviewUrl(fileUrl);
      
      setFormData(prev => ({
        ...prev,
        pdfSupport: file
      }));
    }
  };

  // Supprimer le fichier PDF
  const handleRemovePdf = () => {
    setPdfFile(null);
    setPdfFileName('');
    setPdfPreviewUrl('');
    
    setFormData(prev => ({
      ...prev,
      pdfSupport: null
    }));
  };

  // Ajouter un lien externe
  const handleAddLink = () => {
    if (!newLink) return;
    
    // Vérifier si c'est une URL valide
    try {
      new URL(newLink);
    } catch (e) {
      alert('Veuillez entrer une URL valide');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      externalLinks: [...prev.externalLinks, newLink]
    }));
    
    setNewLink('');
  };

  // Supprimer un lien externe
  const handleRemoveLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      externalLinks: prev.externalLinks.filter((_, i) => i !== index)
    }));
  };

  // Soumettre le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      alert('Veuillez entrer un titre pour le cours');
      return;
    }
    
    if (!formData.description.trim()) {
      alert('Veuillez entrer une description pour le cours');
      return;
    }
    
    if (!formData.group) {
      alert('Veuillez sélectionner un groupe');
      return;
    }
    
    setIsSaving(true);
    
    // Simuler l'enregistrement
    setTimeout(() => {
      console.log('Données du formulaire à envoyer:', formData);
      setIsSaving(false);
      
      // Rediriger vers la liste des cours
      navigate('/teacher/courses');
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#006faf]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          {isEditMode ? 'Modifier le cours' : 'Ajouter un nouveau cours'}
        </h1>
        <p className="text-gray-600">
          {isEditMode 
            ? 'Modifiez les informations du cours ci-dessous.' 
            : 'Remplissez les informations ci-dessous pour créer votre cours.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations du cours */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Informations du cours</h2>
          </div>
          <div className="p-6 space-y-4">
            {/* Titre du cours */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Titre du cours*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#006faf] focus:border-[#006faf]"
                placeholder="Ex: Intelligence Artificielle et Machine Learning"
              />
            </div>
            
            {/* Description du cours */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description du cours*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#006faf] focus:border-[#006faf]"
                placeholder="Décrivez le contenu et les objectifs du cours..."
              />
            </div>
            
            {/* Groupe */}
            <div>
              <label htmlFor="group" className="block text-sm font-medium text-gray-700 mb-1">
                Groupe*
              </label>
              <select
                id="group"
                name="group"
                value={formData.group}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#006faf] focus:border-[#006faf]"
              >
                <option value="">Sélectionner un groupe</option>
                {groups.map(group => (
                  <option key={group.id} value={group.id}>
                    {group.name} - {group.department}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Support de cours */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Support de cours (PDF)</h2>
          </div>
          <div className="p-6">
            {pdfFileName ? (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-8 h-8 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium">{pdfFileName}</p>
                      <p className="text-sm text-gray-500">
                        {pdfFile ? `${Math.round(pdfFile.size / 1024)} KB` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {pdfPreviewUrl && (
                      <a 
                        href={pdfPreviewUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#006faf] hover:text-[#005d92] p-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </a>
                    )}
                    <button 
                      type="button" 
                      onClick={handleRemovePdf}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <label htmlFor="pdf-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez</p>
                    <p className="text-xs text-gray-500">PDF uniquement (MAX. 10MB)</p>
                  </div>
                  <input 
                    id="pdf-upload" 
                    type="file" 
                    accept=".pdf" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Liens externes */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Liens externes</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex space-x-2">
              <input
                type="url"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#006faf] focus:border-[#006faf]"
              />
              <button
                type="button"
                onClick={handleAddLink}
                className="px-4 py-2 bg-[#006faf] text-white rounded-lg hover:bg-[#005d92]"
              >
                Ajouter
              </button>
            </div>
            
            {formData.externalLinks.length > 0 ? (
              <ul className="space-y-2 mt-4">
                {formData.externalLinks.map((link, index) => (
                  <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <a 
                      href={link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#006faf] hover:underline truncate"
                    >
                      {link}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(index)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm italic">Aucun lien externe ajouté.</p>
            )}
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/teacher/courses')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 bg-[#006faf] text-white rounded-lg hover:bg-[#005d92] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enregistrement...
              </>
            ) : (
              isEditMode ? 'Mettre à jour' : 'Créer le cours'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditCoursePage;
