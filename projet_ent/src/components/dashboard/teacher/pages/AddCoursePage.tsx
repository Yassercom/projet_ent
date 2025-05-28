import React, { useState } from 'react';

// Types pour le formulaire
interface FormData {
  title: string;
  description: string;
  group: string;
  file: File | null;
  externalLinks: { url: string; description: string }[];
}

interface FormErrors {
  title?: string;
  description?: string;
  group?: string;
  file?: string;
  externalLinks?: string[];
}

// Données factices pour les groupes assignés à l'enseignant
const assignedGroups = [
  { id: 'g1', name: 'IAWM1', department: 'Informatique' },
  { id: 'g2', name: 'IAWM2', department: 'Informatique' },
  { id: 'g3', name: 'IAWM3', department: 'Informatique' },
  { id: 'g4', name: 'IAWM4', department: 'Informatique' },
  { id: 'g5', name: 'BDIA1', department: 'Informatique' },
  { id: 'g6', name: 'BDIA2', department: 'Informatique' },
  { id: 'g7', name: 'BDIA3', department: 'Informatique' },
];

const AddCoursePage: React.FC = () => {
  // État du formulaire
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    group: '',
    file: null,
    externalLinks: [{ url: '', description: '' }],
  });

  // États pour la gestion du formulaire
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // submitSuccess est utilisé pour contrôler l'affichage du message de succès
  const [, setSubmitSuccess] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Gestion des changements dans les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Nettoyer l'erreur pour ce champ
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      });
    }
  };

  // Gestion des changements dans le champ de fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      file,
    });
    
    // Nettoyer l'erreur pour ce champ
    if (formErrors.file) {
      setFormErrors({
        ...formErrors,
        file: undefined,
      });
    }
  };

  // Gestion des changements dans les liens externes
  const handleLinkChange = (index: number, field: 'url' | 'description', value: string) => {
    const updatedLinks = [...formData.externalLinks];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value,
    };
    
    setFormData({
      ...formData,
      externalLinks: updatedLinks,
    });
    
    // Nettoyer l'erreur pour les liens
    if (formErrors.externalLinks && formErrors.externalLinks[index]) {
      const updatedErrors = { ...formErrors };
      if (updatedErrors.externalLinks) {
        updatedErrors.externalLinks[index] = '';
      }
      setFormErrors(updatedErrors);
    }
  };

  // Ajouter un nouveau lien externe
  const addExternalLink = () => {
    setFormData({
      ...formData,
      externalLinks: [...formData.externalLinks, { url: '', description: '' }],
    });
  };

  // Supprimer un lien externe
  const removeExternalLink = (index: number) => {
    const updatedLinks = [...formData.externalLinks];
    updatedLinks.splice(index, 1);
    
    setFormData({
      ...formData,
      externalLinks: updatedLinks,
    });
    
    // Nettoyer les erreurs pour les liens
    if (formErrors.externalLinks) {
      const updatedErrors = { ...formErrors };
      if (updatedErrors.externalLinks) {
        updatedErrors.externalLinks.splice(index, 1);
      }
      setFormErrors(updatedErrors);
    }
  };

  // Validation du formulaire
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    // Valider le titre
    if (!formData.title.trim()) {
      errors.title = 'Le titre du cours est requis';
      isValid = false;
    } else if (formData.title.length < 5) {
      errors.title = 'Le titre doit contenir au moins 5 caractères';
      isValid = false;
    }

    // Valider la description
    if (!formData.description.trim()) {
      errors.description = 'La description du cours est requise';
      isValid = false;
    } else if (formData.description.length < 10) {
      errors.description = 'La description doit contenir au moins 10 caractères';
      isValid = false;
    }

    // Valider le groupe
    if (!formData.group) {
      errors.group = 'Veuillez sélectionner un groupe';
      isValid = false;
    }

    // Valider les liens externes
    const linkErrors: string[] = [];
    formData.externalLinks.forEach((link, index) => {
      if (link.url && !link.url.match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)) {
        linkErrors[index] = 'URL invalide';
        isValid = false;
      } else if (link.url && !link.description) {
        linkErrors[index] = 'La description du lien est requise';
        isValid = false;
      }
    });

    if (linkErrors.length > 0) {
      errors.externalLinks = linkErrors;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simuler une requête API
      setTimeout(() => {
        console.log('Données du formulaire soumises:', formData);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setShowSuccessMessage(true);
        
        // Réinitialiser le formulaire après un certain délai
        setTimeout(() => {
          setFormData({
            title: '',
            description: '',
            group: '',
            file: null,
            externalLinks: [{ url: '', description: '' }],
          });
          setShowSuccessMessage(false);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* En-tête de la page */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Ajouter un nouveau cours</h1>
          <p className="text-gray-600 mt-1">Créez un nouveau cours pour un groupe que vous enseignez</p>
        </div>

        {/* Message de succès */}
        {showSuccessMessage && (
          <div className="mb-8 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md flex items-start">
            <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium">Cours créé avec succès!</p>
              <p className="text-sm mt-1">Votre cours a été ajouté à la liste de vos cours.</p>
            </div>
          </div>
        )}

        {/* Formulaire */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Informations du cours</h2>
            <p className="mt-1 text-sm text-gray-500">Remplissez les informations ci-dessous pour créer votre cours.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Titre du cours */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Titre du cours<span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md shadow-sm ${
                    formErrors.title ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'
                  }`}
                  placeholder="Entrez le titre du cours"
                />
              </div>
              {formErrors.title && (
                <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
              )}
            </div>

            {/* Description du cours */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description du cours<span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md shadow-sm ${
                    formErrors.description ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'
                  }`}
                  placeholder="Décrivez le contenu et les objectifs du cours"
                />
              </div>
              {formErrors.description && (
                <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
              )}
            </div>

            {/* Sélection du groupe */}
            <div>
              <label htmlFor="group" className="block text-sm font-medium text-gray-700">
                Groupe<span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="group"
                  name="group"
                  value={formData.group}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md shadow-sm ${
                    formErrors.group ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'
                  }`}
                >
                  <option value="">Sélectionnez un groupe</option>
                  {assignedGroups.map((group) => (
                    <option key={group.id} value={group.name}>
                      {group.name} - {group.department}
                    </option>
                  ))}
                </select>
              </div>
              {formErrors.group && (
                <p className="mt-1 text-sm text-red-600">{formErrors.group}</p>
              )}
            </div>

            {/* Upload de fichier */}
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                Support de cours (PDF)
              </label>
              <div className="mt-1">
                <div className="flex items-center space-x-5">
                  <div className="flex-1">
                    <input
                      type="file"
                      id="file"
                      onChange={handleFileChange}
                      accept=".pdf"
                      className="sr-only"
                    />
                    <label
                      htmlFor="file"
                      className={`relative flex justify-center px-6 py-5 border-2 border-dashed rounded-md cursor-pointer ${
                        formData.file ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-[#006faf]'
                      }`}
                    >
                      {formData.file ? (
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-green-500"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 13l10 10L39 13M19 23v13"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <span className="font-medium text-green-600">
                              {formData.file.name}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {Math.round(formData.file.size / 1024)} KB
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <span className="relative cursor-pointer font-medium text-[#006faf] hover:text-[#006faf]/80">
                              <span>Téléverser un fichier</span>
                            </span>
                            <p className="pl-1">ou glisser-déposer</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF jusqu'à 10MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                  {formData.file && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, file: null })}
                      className="p-1 text-red-600 hover:text-red-800"
                      title="Supprimer le fichier"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              {formErrors.file && (
                <p className="mt-1 text-sm text-red-600">{formErrors.file}</p>
              )}
            </div>

            {/* Liens externes */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Liens externes
                </label>
                <button
                  type="button"
                  onClick={addExternalLink}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-[#006faf] bg-[#006faf]/10 hover:bg-[#006faf]/20"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Ajouter un lien
                </button>
              </div>
              <div className="space-y-3">
                {formData.externalLinks.map((link, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                        placeholder="URL (https://...)"
                        className={`block w-full rounded-md shadow-sm ${
                          formErrors.externalLinks && formErrors.externalLinks[index]
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'
                        }`}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <input
                        type="text"
                        value={link.description}
                        onChange={(e) => handleLinkChange(index, 'description', e.target.value)}
                        placeholder="Description du lien"
                        className={`block w-full rounded-md shadow-sm ${
                          formErrors.externalLinks && formErrors.externalLinks[index]
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'
                        }`}
                      />
                    </div>
                    <div className="flex items-center">
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeExternalLink(index)}
                          className="text-red-600 hover:text-red-800"
                          title="Supprimer ce lien"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                      {formErrors.externalLinks && formErrors.externalLinks[index] && (
                        <p className="ml-2 text-sm text-red-600">{formErrors.externalLinks[index]}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
              <a
                href="/teacher/courses"
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006faf]"
              >
                Annuler
              </a>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#006faf] hover:bg-[#006faf]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006faf] ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Création en cours...
                  </>
                ) : (
                  'Créer le cours'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCoursePage;
