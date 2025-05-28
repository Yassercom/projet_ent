import React, { useState } from 'react';

// Interface pour les données du formulaire
export interface Program {
  id?: string;
  name: string;
  code: string;
  department: string;
  description: string;
  coordinator: string;
  level: 'DUT' | 'Licence' | 'Master' | 'Doctorat';
  duration: number;
  creationDate?: string;
}

interface ProgramFormProps {
  initialData?: Program;
  onSubmit: (data: Program) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

// Données factices pour les départements
const mockDepartments = [
  { id: 'INFO', name: 'Informatique' },
  { id: 'MATH', name: 'Mathématiques' },
  { id: 'PHYS', name: 'Physique' },
  { id: 'CHIM', name: 'Chimie' },
  { id: 'BIO', name: 'Biologie' },
  { id: 'GC', name: 'Génie Civil' },
];

// Données factices pour les coordinateurs
const mockCoordinators = [
  { id: '1', name: 'Pr. Mohammed El Alami', department: 'INFO' },
  { id: '2', name: 'Pr. Fatima Benali', department: 'MATH' },
  { id: '3', name: 'Pr. Youssef El Mansouri', department: 'PHYS' },
  { id: '4', name: 'Pr. Amina Tazi', department: 'CHIM' },
  { id: '5', name: 'Pr. Karim Berrada', department: 'BIO' },
  { id: '6', name: 'Pr. Leila Chakir', department: 'GC' },
  { id: '7', name: 'Pr. Omar Idrissi', department: 'INFO' },
  { id: '8', name: 'Pr. Nadia Benmoussa', department: 'MATH' },
];

// Données factices pour les niveaux
const mockLevels = [
  { id: 'DUT', name: 'DUT', duration: 2 },
  { id: 'Licence', name: 'Licence', duration: 3 },
  { id: 'Master', name: 'Master', duration: 2 },
  { id: 'Doctorat', name: 'Doctorat', duration: 3 },
];

const ProgramForm: React.FC<ProgramFormProps> = ({
  initialData = {
    name: '',
    code: '',
    department: '',
    description: '',
    coordinator: '',
    level: 'DUT',
    duration: 2
  },
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState<Program>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Filtrer les coordinateurs en fonction du département sélectionné
  const filteredCoordinators = mockCoordinators.filter(
    coordinator => !formData.department || coordinator.department === formData.department
  );

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Si le département change, réinitialiser le coordinateur
    if (name === 'department' && value !== formData.department) {
      setFormData({
        ...formData,
        [name]: value,
        coordinator: ''
      });
    } else if (name === 'level') {
      // Mettre à jour la durée en fonction du niveau sélectionné
      const selectedLevel = mockLevels.find(level => level.id === value);
      setFormData({
        ...formData,
        [name]: value,
        duration: selectedLevel ? selectedLevel.duration : formData.duration
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Valider le formulaire
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    // Valider le nom
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
      isValid = false;
    }
    
    // Valider le code
    if (!formData.code.trim()) {
      newErrors.code = 'Le code est requis';
      isValid = false;
    } else if (!/^[A-Z0-9]{2,10}$/.test(formData.code)) {
      newErrors.code = 'Le code doit contenir entre 2 et 10 caractères alphanumériques en majuscule';
      isValid = false;
    }
    
    // Valider le département
    if (!formData.department) {
      newErrors.department = 'Le département est requis';
      isValid = false;
    }
    
    // Valider la description
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
      isValid = false;
    }
    
    // Valider le coordinateur
    if (!formData.coordinator) {
      newErrors.coordinator = 'Le coordinateur est requis';
      isValid = false;
    }
    
    // Valider le niveau
    if (!formData.level) {
      newErrors.level = 'Le niveau est requis';
      isValid = false;
    }
    
    // Valider la durée
    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = 'La durée doit être un nombre positif';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nom de la filière <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ex: Ingénierie des Applications Web et Mobiles"
            className={`w-full px-4 py-3 border ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
            Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            placeholder="Ex: IAWM"
            className={`w-full px-4 py-3 border ${errors.code ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
          <p className="text-xs text-gray-500 mt-2">Code unique pour identifier la filière (2-10 caractères)</p>
        </div>
        
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
            Département <span className="text-red-500">*</span>
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border ${errors.department ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all appearance-none bg-white`}
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`, paddingRight: `2.5rem` }}
          >
            <option value="">Sélectionnez un département</option>
            {mockDepartments.map(department => (
              <option key={department.id} value={department.id}>{department.name}</option>
            ))}
          </select>
          {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
        </div>
        
        <div>
          <label htmlFor="coordinator" className="block text-sm font-medium text-gray-700 mb-2">
            Coordinateur <span className="text-red-500">*</span>
          </label>
          <select
            id="coordinator"
            name="coordinator"
            value={formData.coordinator}
            onChange={handleChange}
            required
            disabled={!formData.department}
            className={`w-full px-4 py-3 border ${errors.coordinator ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all appearance-none bg-white disabled:bg-gray-100 disabled:text-gray-500`}
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`, paddingRight: `2.5rem` }}
          >
            <option value="">Sélectionnez un coordinateur</option>
            {filteredCoordinators.map(coordinator => (
              <option key={coordinator.id} value={coordinator.id}>{coordinator.name}</option>
            ))}
          </select>
          {errors.coordinator && <p className="mt-1 text-sm text-red-600">{errors.coordinator}</p>}
          {!formData.department && (
            <p className="text-xs text-amber-500 mt-2">Veuillez d'abord sélectionner un département</p>
          )}
        </div>
        
        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
            Niveau <span className="text-red-500">*</span>
          </label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border ${errors.level ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all appearance-none bg-white`}
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`, paddingRight: `2.5rem` }}
          >
            {mockLevels.map(level => (
              <option key={level.id} value={level.id}>{level.name}</option>
            ))}
          </select>
          {errors.level && <p className="mt-1 text-sm text-red-600">{errors.level}</p>}
        </div>
        
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
            Durée (années) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min="1"
            max="5"
            className={`w-full px-4 py-3 border ${errors.duration ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Description de la filière..."
            className={`w-full px-4 py-3 border ${errors.description ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 mt-8">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          disabled={isSubmitting}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#006faf] text-white rounded-lg hover:bg-[#006faf]/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#006faf] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement...
            </>
          ) : initialData?.id ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default ProgramForm;
