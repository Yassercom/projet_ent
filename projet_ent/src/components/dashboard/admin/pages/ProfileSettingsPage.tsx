import React, { useState } from 'react';

interface ProfileSettingsProps {
  onLogout?: () => void;
}

const ProfileSettingsPage: React.FC<ProfileSettingsProps> = ({ onLogout }) => {
  // État pour les informations du profil
  const [profileData, setProfileData] = useState({
    firstName: 'Abdelhak',
    lastName: 'El Ouakili',
    email: 'a.elouakili@um5.ac.ma',
    phone: '0661234567',
    role: 'Administrateur ENT',
  });

  // État pour les paramètres
  const [settings, setSettings] = useState({
    notifications: true,
    theme: 'light',
  });

  // État pour le mode édition
  const [isEditing, setIsEditing] = useState(false);
  
  // État pour le formulaire de changement de mot de passe
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // État pour afficher/masquer le formulaire de mot de passe
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Gestionnaire pour les changements dans le formulaire de profil
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gestionnaire pour les changements dans les paramètres
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Gestionnaire pour les changements dans le formulaire de mot de passe
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gestionnaire pour la soumission du formulaire de profil
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pourriez envoyer les données à une API
    console.log('Profile data to submit:', profileData);
    setIsEditing(false);
  };

  // Gestionnaire pour la soumission du formulaire de mot de passe
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Vérifier que les mots de passe correspondent
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    // Ici, vous pourriez envoyer les données à une API
    console.log('Password data to submit:', passwordForm);
    // Réinitialiser le formulaire
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setShowPasswordForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Profil & Paramètres</h1>
        <p className="text-gray-600">Gérez vos informations personnelles et les paramètres de votre compte.</p>
      </div>

      {/* Section Profil */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Informations personnelles</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-est-green text-white rounded-lg hover:bg-est-green/90 transition-colors"
            >
              Modifier le profil
            </button>
          )}
        </div>

        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-est-green text-white rounded-lg hover:bg-est-green/90"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Prénom</p>
                  <p className="font-medium">{profileData.firstName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nom</p>
                  <p className="font-medium">{profileData.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{profileData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="font-medium">{profileData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rôle</p>
                  <p className="font-medium">{profileData.role}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section Paramètres du compte */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Paramètres du compte</h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Mot de passe */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-900">Mot de passe</h3>
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="text-est-green hover:text-est-green/80"
              >
                {showPasswordForm ? 'Annuler' : 'Modifier'}
              </button>
            </div>

            {showPasswordForm && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-est-green focus:border-est-green"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-est-green text-white rounded-lg hover:bg-est-green/90"
                  >
                    Mettre à jour le mot de passe
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between py-4 border-t border-gray-200">
            <div>
              <h3 className="font-medium text-gray-900">Notifications générales</h3>
              <p className="text-sm text-gray-500">Recevoir des notifications par email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleSettingsChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-est-green/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-est-green"></div>
            </label>
          </div>

          {/* Thème */}
          <div className="flex items-center justify-between py-4 border-t border-gray-200">
            <div>
              <h3 className="font-medium text-gray-900">Thème de l'interface</h3>
              <p className="text-sm text-gray-500">Choisissez entre un thème clair ou sombre</p>
            </div>
            <div className="flex space-x-4">
              <label className={`px-4 py-2 rounded-lg cursor-pointer ${settings.theme === 'light' ? 'bg-est-green text-white' : 'bg-gray-100 text-gray-700'}`}>
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={settings.theme === 'light'}
                  onChange={handleSettingsChange}
                  className="sr-only"
                />
                Clair
              </label>
              <label className={`px-4 py-2 rounded-lg cursor-pointer ${settings.theme === 'dark' ? 'bg-est-green text-white' : 'bg-gray-100 text-gray-700'}`}>
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={settings.theme === 'dark'}
                  onChange={handleSettingsChange}
                  className="sr-only"
                />
                Sombre
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
