import React, { useState, useRef } from 'react';

// Interface pour les données du formulaire
export interface Student {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  cne: string;
  program: string;
  group: string;
  level?: 'DUT' | 'Licence' | 'Master';
  year?: number;
  status?: 'active' | 'graduated' | 'suspended' | 'on_leave';
  enrollmentDate?: string;
}

interface StudentFormProps {
  initialData?: Student;
  onSubmit: (data: Student) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

// Données factices pour les programmes
const mockPrograms = [
  { id: 'IAWM', name: 'Ingénierie des Applications Web et Mobiles' },
  { id: 'BDIA', name: 'Big Data et Intelligence Artificielle' },
  { id: 'GC', name: 'Génie Civil' },
  { id: 'IABD', name: 'Intelligence Artificielle et Big Data' },
];

// Données factices pour les groupes
const mockGroups = [
  { id: 'IAWM1', name: 'IAWM1', year: 1, program: 'IAWM' },
  { id: 'IAWM2', name: 'IAWM2', year: 1, program: 'IAWM' },
  { id: 'IAWM3', name: 'IAWM3', year: 2, program: 'IAWM' },
  { id: 'IAWM4', name: 'IAWM4', year: 2, program: 'IAWM' },
  { id: 'BDIA1', name: 'BDIA1', year: 1, program: 'BDIA' },
  { id: 'BDIA2', name: 'BDIA2', year: 2, program: 'BDIA' },
  { id: 'BDIA3', name: 'BDIA3', year: 2, program: 'BDIA' },
  { id: 'GC1', name: 'GC1', year: 1, program: 'GC' },
  { id: 'IABD1', name: 'IABD1', year: 1, program: 'IABD' },
];

const StudentForm: React.FC<StudentFormProps> = ({
  initialData = {
    firstName: '',
    lastName: '',
    email: '',
    cne: '',
    program: '',
    group: '',
    status: 'active'
  },
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState<Student>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Filtrer les groupes en fonction du programme sélectionné
  const filteredGroups = mockGroups.filter(
    group => !formData.program || group.program === formData.program
  );

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Si le programme change, réinitialiser le groupe
    if (name === 'program' && value !== formData.program) {
      setFormData({
        ...formData,
        [name]: value,
        group: ''
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
    
    // Valider le prénom
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
      isValid = false;
    }
    
    // Valider le nom
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
      isValid = false;
    }
    
    // Valider l'email
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
      isValid = false;
    }
    
    // Valider le CNE
    if (!formData.cne.trim()) {
      newErrors.cne = 'Le CNE est requis';
      isValid = false;
    }
    
    // Valider le programme
    if (!formData.program) {
      newErrors.program = 'La filière est requise';
      isValid = false;
    }
    
    // Valider le groupe
    if (!formData.group) {
      newErrors.group = 'Le groupe est requis';
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
            className={`w-full px-4 py-3 border ${errors.firstName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
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
            className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
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
            className={`w-full px-4 py-3 border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
            className={`w-full px-4 py-3 border ${errors.cne ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.cne && <p className="mt-1 text-sm text-red-600">{errors.cne}</p>}
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
            className={`w-full px-4 py-3 border ${errors.program ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all appearance-none bg-white`}
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`, paddingRight: `2.5rem` }}
          >
            <option value="">Sélectionnez une filière</option>
            {mockPrograms.map(program => (
              <option key={program.id} value={program.id}>{program.name}</option>
            ))}
          </select>
          {errors.program && <p className="mt-1 text-sm text-red-600">{errors.program}</p>}
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
            className={`w-full px-4 py-3 border ${errors.group ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all appearance-none bg-white disabled:bg-gray-100 disabled:text-gray-500`}
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`, paddingRight: `2.5rem` }}
          >
            <option value="">Sélectionnez un groupe</option>
            {filteredGroups.map(group => (
              <option key={group.id} value={group.id}>
                {group.name} (Année {group.year})
              </option>
            ))}
          </select>
          {errors.group && <p className="mt-1 text-sm text-red-600">{errors.group}</p>}
          {!formData.program && (
            <p className="text-xs text-amber-500 mt-2">Veuillez d'abord sélectionner une filière</p>
          )}
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

export default StudentForm;
