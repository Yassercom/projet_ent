import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

interface GroupFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

interface GroupFormData {
  id?: string;
  name: string;
  program: string;
  level: 'DUT' | 'Licence' | 'Master';
  year: number;
  classTutor: string;
  capacity: number;
}

const GroupForm: React.FC<GroupFormProps> = ({ initialData, onSubmit, onCancel, isSubmitting = false }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<GroupFormData>({
    defaultValues: initialData || {
      name: '',
      program: '',
      level: 'DUT',
      year: 1,
      classTutor: '',
      capacity: 40
    }
  });

  // Réinitialiser le formulaire si les données initiales changent
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  // Données factices pour les programmes
  const programs = [
    { id: 'IAWM', name: 'Ingénierie des Applications Web et Mobiles' },
    { id: 'BDIA', name: 'Big Data et Intelligence Artificielle' },
    { id: 'ISIC', name: 'Ingénierie des Systèmes Informatiques et Communicants' },
    { id: 'GC', name: 'Génie Civil' },
    { id: 'GE', name: 'Génie Électrique' },
    { id: 'TCM', name: 'Techniques Commerciales et Marketing' },
    { id: 'DSE', name: 'Data Science pour Entreprise' },
    { id: 'IABD', name: 'Intelligence Artificielle et Big Data' }
  ];

  // Données factices pour les enseignants (tuteurs)
  const teachers = [
    { id: '1', name: 'Dr. Naoufal Rais' },
    { id: '2', name: 'Dr. Samira Douzi' },
    { id: '3', name: 'Dr. Khalid Nafil' },
    { id: '4', name: 'Dr. Asmae Benkirane' },
    { id: '5', name: 'Dr. Hassan Mekouar' },
    { id: '6', name: 'Dr. Mourad Zyani' },
    { id: '7', name: 'Dr. Fouad Lakrifa' },
    { id: '8', name: 'Dr. Nadia Tazi' },
    { id: '9', name: 'Dr. Zakaria Abidine' },
    { id: '10', name: 'Dr. Omar Bensouda' }
  ];

  const onFormSubmit: SubmitHandler<GroupFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom du groupe */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nom du groupe <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006faf] focus:ring-[#006faf] sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Ex: IAWM1"
            {...register('name', { required: 'Le nom du groupe est requis' })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Programme */}
        <div>
          <label htmlFor="program" className="block text-sm font-medium text-gray-700">
            Filière <span className="text-red-500">*</span>
          </label>
          <select
            id="program"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006faf] focus:ring-[#006faf] sm:text-sm ${errors.program ? 'border-red-500' : ''}`}
            {...register('program', { required: 'La filière est requise' })}
          >
            <option value="">Sélectionner une filière</option>
            {programs.map((program) => (
              <option key={program.id} value={program.id}>
                {program.name}
              </option>
            ))}
          </select>
          {errors.program && (
            <p className="mt-1 text-sm text-red-500">{errors.program.message}</p>
          )}
        </div>

        {/* Niveau */}
        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700">
            Niveau <span className="text-red-500">*</span>
          </label>
          <select
            id="level"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006faf] focus:ring-[#006faf] sm:text-sm ${errors.level ? 'border-red-500' : ''}`}
            {...register('level', { required: 'Le niveau est requis' })}
          >
            <option value="DUT">DUT</option>
            <option value="Licence">Licence</option>
            <option value="Master">Master</option>
          </select>
          {errors.level && (
            <p className="mt-1 text-sm text-red-500">{errors.level.message}</p>
          )}
        </div>

        {/* Année */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Année <span className="text-red-500">*</span>
          </label>
          <select
            id="year"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006faf] focus:ring-[#006faf] sm:text-sm ${errors.year ? 'border-red-500' : ''}`}
            {...register('year', { required: 'L\'année est requise' })}
          >
            <option value="1">Année 1</option>
            <option value="2">Année 2</option>
            <option value="3">Année 3</option>
          </select>
          {errors.year && (
            <p className="mt-1 text-sm text-red-500">{errors.year.message}</p>
          )}
        </div>

        {/* Tuteur */}
        <div>
          <label htmlFor="classTutor" className="block text-sm font-medium text-gray-700">
            Tuteur du groupe
          </label>
          <select
            id="classTutor"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006faf] focus:ring-[#006faf] sm:text-sm"
            {...register('classTutor')}
          >
            <option value="">Sélectionner un tuteur</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        {/* Capacité */}
        <div>
          <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
            Capacité <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="capacity"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006faf] focus:ring-[#006faf] sm:text-sm ${errors.capacity ? 'border-red-500' : ''}`}
            placeholder="Ex: 40"
            min="1"
            {...register('capacity', { 
              required: 'La capacité est requise',
              min: { value: 1, message: 'La capacité doit être supérieure à 0' },
              valueAsNumber: true
            })}
          />
          {errors.capacity && (
            <p className="mt-1 text-sm text-red-500">{errors.capacity.message}</p>
          )}
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

export default GroupForm;
