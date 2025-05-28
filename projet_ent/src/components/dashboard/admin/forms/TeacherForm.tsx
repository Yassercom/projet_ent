import React, { useState } from 'react';

// Interface pour les données du formulaire
export interface Teacher {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  speciality: string;
  status?: 'active' | 'on_leave' | 'retired';
  joinDate?: string;
  code?: string;
}

interface TeacherFormProps {
  initialData?: Teacher;
  onSubmit: (data: Teacher) => void;
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

// Données factices pour les spécialités
const mockSpecialities = [
  { id: 'DEV_WEB', name: 'Développement Web', department: 'INFO' },
  { id: 'DEV_MOB', name: 'Développement Mobile', department: 'INFO' },
  { id: 'IA', name: 'Intelligence Artificielle', department: 'INFO' },
  { id: 'BD', name: 'Bases de Données', department: 'INFO' },
  { id: 'RESEAUX', name: 'Réseaux', department: 'INFO' },
  { id: 'ANALYSE', name: 'Analyse', department: 'MATH' },
  { id: 'ALGEBRE', name: 'Algèbre', department: 'MATH' },
  { id: 'PROBA', name: 'Probabilités et Statistiques', department: 'MATH' },
  { id: 'MECA', name: 'Mécanique', department: 'PHYS' },
  { id: 'ELEC', name: 'Électromagnétisme', department: 'PHYS' },
  { id: 'THERMO', name: 'Thermodynamique', department: 'PHYS' },
  { id: 'ORGA', name: 'Chimie Organique', department: 'CHIM' },
  { id: 'INORGA', name: 'Chimie Inorganique', department: 'CHIM' },
  { id: 'BIOCHIM', name: 'Biochimie', department: 'CHIM' },
  { id: 'MICRO', name: 'Microbiologie', department: 'BIO' },
  { id: 'GENETIQUE', name: 'Génétique', department: 'BIO' },
  { id: 'STRUCTURE', name: 'Structures', department: 'GC' },
  { id: 'HYDRO', name: 'Hydraulique', department: 'GC' },
];

const TeacherForm: React.FC<TeacherFormProps> = ({
  initialData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    speciality: '',
    status: 'active'
  },
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState<Teacher>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Filtrer les spécialités en fonction du département sélectionné
  const filteredSpecialities = mockSpecialities.filter(
    speciality => !formData.department || speciality.department === formData.department
  );

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Si le département change, réinitialiser la spécialité
    if (name === 'department' && value !== formData.department) {
      setFormData({
        ...formData,
        [name]: value,
        speciality: ''
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
    
    // Valider le téléphone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
      isValid = false;
    } else if (!/^(\+\d{1,3}[- ]?)?\d{9,10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Le numéro de téléphone n\'est pas valide';
      isValid = false;
    }
    
    // Valider le département
    if (!formData.department) {
      newErrors.department = 'Le département est requis';
      isValid = false;
    }
    
    // Valider la spécialité
    if (!formData.speciality) {
      newErrors.speciality = 'La spécialité est requise';
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
            placeholder="Ex: Mohammed"
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
            placeholder="Ex: El Alaoui"
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
            placeholder="Ex: m.elalaoui@um5.ac.ma"
            className={`w-full px-4 py-3 border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          <p className="text-xs text-gray-500 mt-2">Cet email sera utilisé pour l'authentification</p>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Ex: 0612345678"
            className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
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
          <label htmlFor="speciality" className="block text-sm font-medium text-gray-700 mb-2">
            Spécialité <span className="text-red-500">*</span>
          </label>
          <select
            id="speciality"
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
            required
            disabled={!formData.department}
            className={`w-full px-4 py-3 border ${errors.speciality ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all appearance-none bg-white disabled:bg-gray-100 disabled:text-gray-500`}
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`, paddingRight: `2.5rem` }}
          >
            <option value="">Sélectionnez une spécialité</option>
            {filteredSpecialities.map(speciality => (
              <option key={speciality.id} value={speciality.id}>
                {speciality.name}
              </option>
            ))}
          </select>
          {errors.speciality && <p className="mt-1 text-sm text-red-600">{errors.speciality}</p>}
          {!formData.department && (
            <p className="text-xs text-amber-500 mt-2">Veuillez d'abord sélectionner un département</p>
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

export default TeacherForm;
