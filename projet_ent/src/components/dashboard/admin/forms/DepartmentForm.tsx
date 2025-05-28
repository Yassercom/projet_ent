import React, { useState } from 'react';

// Interface pour les données du formulaire
export interface Department {
  id?: string;
  name: string;
  code: string;
  description: string;
  headOfDepartment: string;
  email: string;
  phone: string;
  location: string;
  creationDate?: string;
}

interface DepartmentFormProps {
  initialData?: Department;
  onSubmit: (data: Department) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

// Données factices pour les responsables de département
const mockHeadsOfDepartment = [
  { id: '1', name: 'Pr. Mohammed El Alami' },
  { id: '2', name: 'Pr. Fatima Benali' },
  { id: '3', name: 'Pr. Youssef El Mansouri' },
  { id: '4', name: 'Pr. Amina Tazi' },
  { id: '5', name: 'Pr. Karim Berrada' },
];

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  initialData = {
    name: '',
    code: '',
    description: '',
    headOfDepartment: '',
    email: '',
    phone: '',
    location: ''
  },
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState<Department>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
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
    
    // Valider la description
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
      isValid = false;
    }
    
    // Valider le responsable
    if (!formData.headOfDepartment) {
      newErrors.headOfDepartment = 'Le responsable est requis';
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
    
    // Valider l'emplacement
    if (!formData.location.trim()) {
      newErrors.location = 'L\'emplacement est requis';
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
            Nom du département <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ex: Département d'Informatique"
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
            placeholder="Ex: INFO"
            className={`w-full px-4 py-3 border ${errors.code ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
          <p className="text-xs text-gray-500 mt-2">Code unique pour identifier le département (2-10 caractères)</p>
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
            placeholder="Description du département..."
            className={`w-full px-4 py-3 border ${errors.description ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
        
        <div>
          <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700 mb-2">
            Responsable <span className="text-red-500">*</span>
          </label>
          <select
            id="headOfDepartment"
            name="headOfDepartment"
            value={formData.headOfDepartment}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border ${errors.headOfDepartment ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all appearance-none bg-white`}
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`, paddingRight: `2.5rem` }}
          >
            <option value="">Sélectionnez un responsable</option>
            {mockHeadsOfDepartment.map(head => (
              <option key={head.id} value={head.id}>{head.name}</option>
            ))}
          </select>
          {errors.headOfDepartment && <p className="mt-1 text-sm text-red-600">{errors.headOfDepartment}</p>}
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
            placeholder="Ex: dept-info@um5.ac.ma"
            className={`w-full px-4 py-3 border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
            placeholder="Ex: 0537123456"
            className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Emplacement <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Ex: Bâtiment A, 2ème étage"
            className={`w-full px-4 py-3 border ${errors.location ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
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

export default DepartmentForm;
