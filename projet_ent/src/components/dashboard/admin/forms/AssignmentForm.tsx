import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

interface AssignmentFormProps {
  initialData?: AssignmentFormData;
  onSubmit: (data: AssignmentFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

interface AssignmentFormData {
  id?: string;
  teacherId: string;
  groupId: string;
  academicYear: string;
  semester: string;
  status: 'active' | 'planned' | 'completed';
}

// Données fictives pour les enseignants
const mockTeachers = [
  { id: '1', name: 'Dr. Mohamed Ouahbi', department: 'Informatique' },
  { id: '2', name: 'Dr. Naoufal Rais', department: 'Informatique' },
  { id: '3', name: 'Dr. Samira Douzi', department: 'Informatique' },
  { id: '4', name: 'Dr. Omar Bensouda', department: 'Informatique' },
  { id: '5', name: 'Dr. Ahmed Bennani', department: 'Génie Civil' },
  { id: '6', name: 'Dr. Fatima Zahra Belkasmi', department: 'Génie Électrique' },
  { id: '7', name: 'Dr. Laila El Amrani', department: 'Communication' },
  { id: '8', name: 'Dr. Karim Idrissi', department: 'Mathématiques' },
  { id: '9', name: 'Dr. Hassan Mekouar', department: 'Physique' },
  { id: '10', name: 'Dr. Mourad Zyani', department: 'Chimie' },
];

// Données fictives pour les groupes
const mockGroups = [
  { id: 'IAWM1', name: 'IAWM1', program: 'Ingénierie des Applications Web et Mobiles', level: 'DUT', year: 1 },
  { id: 'IAWM2', name: 'IAWM2', program: 'Ingénierie des Applications Web et Mobiles', level: 'DUT', year: 2 },
  { id: 'BDIA1', name: 'BDIA1', program: 'Big Data et Intelligence Artificielle', level: 'DUT', year: 1 },
  { id: 'BDIA2', name: 'BDIA2', program: 'Big Data et Intelligence Artificielle', level: 'DUT', year: 2 },
  { id: 'GI-1', name: 'GI-1', program: 'Génie Informatique', level: 'Licence', year: 1 },
  { id: 'GI-2', name: 'GI-2', program: 'Génie Informatique', level: 'Licence', year: 2 },
  { id: 'GI-3', name: 'GI-3', program: 'Génie Informatique', level: 'Licence', year: 3 },
  { id: 'GC-1', name: 'GC-1', program: 'Génie Civil', level: 'Licence', year: 1 },
  { id: 'GC-2', name: 'GC-2', program: 'Génie Civil', level: 'Licence', year: 2 },
  { id: 'GE-1', name: 'GE-1', program: 'Génie Électrique', level: 'Licence', year: 1 },
];

// Années académiques
const academicYears = [
  '2023-2024',
  '2024-2025',
  '2025-2026',
];

// Semestres
const semesters = [
  'S1',
  'S2',
  'S3',
  'S4',
  'S5',
  'S6',
];

const AssignmentForm: React.FC<AssignmentFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isSubmitting = false 
}) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<AssignmentFormData>({
    defaultValues: initialData || {
      teacherId: '',
      groupId: '',
      academicYear: '2024-2025',
      semester: 'S1',
      status: 'planned'
    }
  });

  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [filteredTeachers, setFilteredTeachers] = useState(mockTeachers);
  const [filteredGroups, setFilteredGroups] = useState(mockGroups);

  // Réinitialiser le formulaire si les données initiales changent
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  // Filtrer les enseignants par département
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const department = e.target.value;
    setSelectedDepartment(department);
    
    if (department) {
      const filtered = mockTeachers.filter(teacher => teacher.department === department);
      setFilteredTeachers(filtered);
      setValue('teacherId', ''); // Réinitialiser l'enseignant sélectionné
    } else {
      setFilteredTeachers(mockTeachers);
    }
  };

  // Filtrer les groupes par programme
  const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const program = e.target.value;
    
    if (program) {
      const filtered = mockGroups.filter(group => group.program === program);
      setFilteredGroups(filtered);
      setValue('groupId', ''); // Réinitialiser le groupe sélectionné
    } else {
      setFilteredGroups(mockGroups);
    }
  };

  // Liste des départements uniques
  const departments = [...new Set(mockTeachers.map(teacher => teacher.department))];
  
  // Liste des programmes uniques
  const programs = [...new Set(mockGroups.map(group => group.program))];

  const onFormSubmit: SubmitHandler<AssignmentFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="space-y-6">
        {/* Section Enseignant */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Informations sur l'enseignant</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Département */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Département
              </label>
              <select
                id="department"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006faf] focus:ring-[#006faf] sm:text-sm"
                onChange={handleDepartmentChange}
                value={selectedDepartment}
              >
                <option value="">Tous les départements</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Enseignant */}
            <div>
              <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700 mb-1">
                Enseignant <span className="text-red-500">*</span>
              </label>
              <select
                id="teacherId"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006faf] focus:ring-[#006faf] sm:text-sm ${errors.teacherId ? 'border-red-500' : ''}`}
                {...register('teacherId', { required: 'L\'enseignant est requis' })}
              >
                <option value="">Sélectionner un enseignant</option>
                {filteredTeachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name} - {teacher.department}
                  </option>
                ))}
              </select>
              {errors.teacherId && (
                <p className="mt-1 text-sm text-red-500">{errors.teacherId.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section Groupe */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Informations sur le groupe</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Programme */}
            <div>
              <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
                Programme
              </label>
              <select
                id="program"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006faf] focus:ring-[#006faf] sm:text-sm"
                onChange={handleProgramChange}
              >
                <option value="">Tous les programmes</option>
                {programs.map((program) => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
            </div>

            {/* Groupe */}
            <div>
              <label htmlFor="groupId" className="block text-sm font-medium text-gray-700 mb-1">
                Groupe <span className="text-red-500">*</span>
              </label>
              <select
                id="groupId"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006faf] focus:ring-[#006faf] sm:text-sm ${errors.groupId ? 'border-red-500' : ''}`}
                {...register('groupId', { required: 'Le groupe est requis' })}
              >
                <option value="">Sélectionner un groupe</option>
                {filteredGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name} - {group.program} ({group.level}, Année {group.year})
                  </option>
                ))}
              </select>
              {errors.groupId && (
                <p className="mt-1 text-sm text-red-500">{errors.groupId.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section Période */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Informations sur la période</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Année académique */}
            <div>
              <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700 mb-1">
                Année académique <span className="text-red-500">*</span>
              </label>
              <select
                id="academicYear"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006faf] focus:ring-[#006faf] sm:text-sm ${errors.academicYear ? 'border-red-500' : ''}`}
                {...register('academicYear', { required: 'L\'année académique est requise' })}
              >
                {academicYears.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              {errors.academicYear && (
                <p className="mt-1 text-sm text-red-500">{errors.academicYear.message}</p>
              )}
            </div>

            {/* Semestre */}
            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
                Semestre <span className="text-red-500">*</span>
              </label>
              <select
                id="semester"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006faf] focus:ring-[#006faf] sm:text-sm ${errors.semester ? 'border-red-500' : ''}`}
                {...register('semester', { required: 'Le semestre est requis' })}
              >
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>{semester}</option>
                ))}
              </select>
              {errors.semester && (
                <p className="mt-1 text-sm text-red-500">{errors.semester.message}</p>
              )}
            </div>

            {/* Statut */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Statut <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006faf] focus:ring-[#006faf] sm:text-sm ${errors.status ? 'border-red-500' : ''}`}
                {...register('status', { required: 'Le statut est requis' })}
              >
                <option value="planned">Planifié</option>
                <option value="active">En cours</option>
                <option value="completed">Terminé</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006faf]"
          disabled={isSubmitting}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#006faf] hover:bg-[#006faf]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006faf]"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enregistrement...
            </>
          ) : (
            'Enregistrer'
          )}
        </button>
      </div>
    </form>
  );
};

export default AssignmentForm;
