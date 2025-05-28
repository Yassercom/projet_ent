import React, { useState } from 'react';

// Interface pour les données du formulaire
export interface Course {
  id?: string;
  title: string;
  code: string;
  description: string;
  program: string;
  teacher: string;
  semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  credits: number;
  hoursPerWeek: number;
  status?: 'active' | 'archived' | 'pending';
  creationDate?: string;
}

interface CourseFormProps {
  initialData?: Course;
  onSubmit: (data: Course) => void;
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

// Données factices pour les enseignants
const mockTeachers = [
  { id: '1', name: 'Pr. Mohammed El Alami', speciality: 'DEV_WEB' },
  { id: '2', name: 'Pr. Fatima Benali', speciality: 'IA' },
  { id: '3', name: 'Pr. Youssef El Mansouri', speciality: 'MECA' },
  { id: '4', name: 'Pr. Amina Tazi', speciality: 'BD' },
  { id: '5', name: 'Pr. Karim Berrada', speciality: 'MICRO' },
  { id: '6', name: 'Pr. Leila Chakir', speciality: 'STRUCTURE' },
  { id: '7', name: 'Pr. Omar Idrissi', speciality: 'DEV_MOB' },
  { id: '8', name: 'Pr. Nadia Benmoussa', speciality: 'ANALYSE' },
];

// Données factices pour les semestres
const mockSemesters = [
  { id: 1, name: 'Semestre 1' },
  { id: 2, name: 'Semestre 2' },
  { id: 3, name: 'Semestre 3' },
  { id: 4, name: 'Semestre 4' },
  { id: 5, name: 'Semestre 5' },
  { id: 6, name: 'Semestre 6' },
  { id: 7, name: 'Semestre 7' },
  { id: 8, name: 'Semestre 8' },
];

const CourseForm: React.FC<CourseFormProps> = ({
  initialData = {
    title: '',
    code: '',
    description: '',
    program: '',
    teacher: '',
    semester: 1,
    credits: 3,
    hoursPerWeek: 3,
    status: 'active'
  },
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState<Course>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Conversion des valeurs numériques
    if (name === 'credits' || name === 'hoursPerWeek' || name === 'semester') {
      setFormData({
        ...formData,
        [name]: Number(value)
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
    
    // Valider le titre
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
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
    
    // Valider le programme
    if (!formData.program) {
      newErrors.program = 'Le programme est requis';
      isValid = false;
    }
    
    // Valider l'enseignant
    if (!formData.teacher) {
      newErrors.teacher = 'L\'enseignant est requis';
      isValid = false;
    }
    
    // Valider le semestre
    if (!formData.semester) {
      newErrors.semester = 'Le semestre est requis';
      isValid = false;
    }
    
    // Valider les crédits
    if (!formData.credits || formData.credits <= 0) {
      newErrors.credits = 'Le nombre de crédits doit être un nombre positif';
      isValid = false;
    }
    
    // Valider les heures par semaine
    if (!formData.hoursPerWeek || formData.hoursPerWeek <= 0) {
      newErrors.hoursPerWeek = 'Le nombre d\'heures par semaine doit être un nombre positif';
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
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Titre du cours <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Ex: Programmation Web Avancée"
            className={`w-full px-4 py-3 border ${errors.title ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
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
            placeholder="Ex: PWA101"
            className={`w-full px-4 py-3 border ${errors.code ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
          <p className="text-xs text-gray-500 mt-2">Code unique pour identifier le cours (2-10 caractères)</p>
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
            placeholder="Description du cours..."
            className={`w-full px-4 py-3 border ${errors.description ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
        
        <div>
          <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-2">
            Programme <span className="text-red-500">*</span>
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
            <option value="">Sélectionnez un programme</option>
            {mockPrograms.map(program => (
              <option key={program.id} value={program.id}>{program.name}</option>
            ))}
          </select>
          {errors.program && <p className="mt-1 text-sm text-red-600">{errors.program}</p>}
        </div>
        
        <div>
          <label htmlFor="teacher" className="block text-sm font-medium text-gray-700 mb-2">
            Enseignant <span className="text-red-500">*</span>
          </label>
          <select
            id="teacher"
            name="teacher"
            value={formData.teacher}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border ${errors.teacher ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all appearance-none bg-white`}
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`, paddingRight: `2.5rem` }}
          >
            <option value="">Sélectionnez un enseignant</option>
            {mockTeachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
            ))}
          </select>
          {errors.teacher && <p className="mt-1 text-sm text-red-600">{errors.teacher}</p>}
        </div>
        
        <div>
          <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
            Semestre <span className="text-red-500">*</span>
          </label>
          <select
            id="semester"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border ${errors.semester ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all appearance-none bg-white`}
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`, paddingRight: `2.5rem` }}
          >
            {mockSemesters.map(semester => (
              <option key={semester.id} value={semester.id}>{semester.name}</option>
            ))}
          </select>
          {errors.semester && <p className="mt-1 text-sm text-red-600">{errors.semester}</p>}
        </div>
        
        <div>
          <label htmlFor="credits" className="block text-sm font-medium text-gray-700 mb-2">
            Crédits <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="credits"
            name="credits"
            value={formData.credits}
            onChange={handleChange}
            required
            min="1"
            max="10"
            className={`w-full px-4 py-3 border ${errors.credits ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.credits && <p className="mt-1 text-sm text-red-600">{errors.credits}</p>}
        </div>
        
        <div>
          <label htmlFor="hoursPerWeek" className="block text-sm font-medium text-gray-700 mb-2">
            Heures par semaine <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="hoursPerWeek"
            name="hoursPerWeek"
            value={formData.hoursPerWeek}
            onChange={handleChange}
            required
            min="1"
            max="20"
            className={`w-full px-4 py-3 border ${errors.hoursPerWeek ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#006faf] focus:border-[#006faf]'} rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-30 transition-all`}
          />
          {errors.hoursPerWeek && <p className="mt-1 text-sm text-red-600">{errors.hoursPerWeek}</p>}
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

export default CourseForm;
