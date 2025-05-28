import { useState, useEffect } from 'react';

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface LoginPageProps {
  onLogin?: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initial page loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formState.email.trim()) {
      errors.email = 'L\'email est requis';
    } else if (!formState.email.match(/^[\w._-]+@um5\.ac\.ma$/)) {
      errors.email = 'Veuillez saisir une adresse email valide se terminant par @um5.ac.ma';
    }
    
    if (!formState.password) {
      errors.password = 'Le mot de passe est requis';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Credentials submitted:', formState);
        setIsSubmitting(false);
        // Call onLogin function if provided
        if (onLogin) {
          onLogin();
        }
        // Here you would normally handle the authentication with your backend API
      }, 1500);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  // Full page preloader
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <img src="https://www.um5.ac.ma/um5/themes/custom/versh/images/default/preloader.gif" alt="Chargement..." />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left Column - Branding */}
      <div className="bg-primary md:w-1/2 flex flex-col justify-center p-8 text-white">
        <div className="max-w-md mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Espace Numérique de Travail (ENT) de l'École Supérieure de Technologie de Salé</h1>
            <h2 className="text-xl">Plateforme officielle de l'École Supérieure de Technologie de Salé – Université Mohammed V Rabat</h2>
          </div>
          
          <div className="my-12">
            <p className="text-lg opacity-90">
              Plateforme numérique de l'Université permettant aux étudiants, enseignants et administrateurs
              d'accéder aux services pédagogiques et administratifs de l'établissement.
            </p>
          </div>
          
          <div className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-white rounded-xl p-2 flex justify-center items-center">
                <img 
                  src="https://www.um5.ac.ma/um5/sites/default/files/default_images/Logo.gif" 
                  alt="Logo UM5" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="w-24 h-24 bg-white rounded-xl p-2 flex justify-center items-center">
                <img 
                  src="https://i0.wp.com/www.est.um5.ac.ma/wp-content/uploads/2019/06/logo_ests_2018.png" 
                  alt="Logo EST Salé" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Column - Login Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 bg-lightgray">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-primary">Connexion à votre espace</h2>
            <p className="text-gray-600 mt-2">Veuillez vous authentifier pour accéder à l'ENT</p>
          </div>
          
          {isSubmitting ? (
            <div className="flex justify-center items-center py-16">
              <img 
                src="https://www.um5.ac.ma/um5/themes/custom/versh/images/default/preloader.gif" 
                alt="Chargement..." 
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email institutionnel
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200`}
                  placeholder="prenom.nom@um5.ac.ma"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>
              
              {/* Password Input */}
              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <a href="#" className="text-sm text-secondary hover:underline">
                    Mot de passe oublié ?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formState.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.password ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200`}
                  placeholder="Votre mot de passe"
                />
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                )}
              </div>
              
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex justify-center items-center"
                >
                  Se connecter
                </button>
              </div>
            </form>
          )}
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Université Mohammed V de Rabat - EST Salé. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
