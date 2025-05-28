import React, { useState } from 'react';
import ConfirmModal from '../../../common/ConfirmModal';

interface StudentProfilePageProps {
  onLogout?: () => void;
}

const StudentProfilePage: React.FC<StudentProfilePageProps> = ({ onLogout }) => {
  // État pour les informations du profil (certains champs sont en lecture seule)
  const [profileData, setProfileData] = useState({
    firstName: 'Ahmed',
    lastName: 'Benjelloun',
    email: 'a.benjelloun@student.um5.ac.ma',
    phone: '0661234567',
    studentId: 'STD2023456',
    program: 'Génie Informatique',
    group: 'GI-2',
    year: '2ème année',
    address: 'Rue Hassan II, Rabat',
    birthDate: '1999-05-15',
  });

  // État pour les paramètres
  const [settings, setSettings] = useState({
    notifications: true,
    theme: 'light',
    language: 'fr',
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
  
  // État pour le modal de confirmation
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Gestionnaire pour les changements dans le formulaire de profil
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Vérifier si le champ est modifiable
    const editableFields = ['phone', 'address'];
    if (editableFields.includes(name)) {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Gestionnaire pour les changements dans les paramètres
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
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
  
  // Gestionnaire pour la déconnexion
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };
  
  const confirmLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Mon Profil</h1>
        <p className="text-gray-600">Consultez et modifiez vos informations personnelles et vos paramètres.</p>
      </div>

      {/* Section Profil */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Informations personnelles</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-[#006faf] text-white rounded-lg hover:bg-[#006faf]/90 transition-colors"
            >
              Modifier les informations modifiables
            </button>
          )}
        </div>

        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Champs en lecture seule */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom <span className="text-xs text-gray-500">(lecture seule)</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={profileData.firstName}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom <span className="text-xs text-gray-500">(lecture seule)</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profileData.lastName}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-xs text-gray-500">(lecture seule)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro étudiant <span className="text-xs text-gray-500">(lecture seule)</span>
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={profileData.studentId}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
                    Filière <span className="text-xs text-gray-500">(lecture seule)</span>
                  </label>
                  <input
                    type="text"
                    id="program"
                    name="program"
                    value={profileData.program}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="group" className="block text-sm font-medium text-gray-700 mb-1">
                    Groupe <span className="text-xs text-gray-500">(lecture seule)</span>
                  </label>
                  <input
                    type="text"
                    id="group"
                    name="group"
                    value={profileData.group}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                    Année <span className="text-xs text-gray-500">(lecture seule)</span>
                  </label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={profileData.year}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Date de naissance <span className="text-xs text-gray-500">(lecture seule)</span>
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={profileData.birthDate}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>
                
                {/* Champs modifiables */}
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#006faf] focus:border-[#006faf]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleProfileChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#006faf] focus:border-[#006faf]"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#006faf] text-white rounded-lg hover:bg-[#006faf]/90"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Prénom</h3>
                <p className="mt-1">{profileData.firstName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Nom</h3>
                <p className="mt-1">{profileData.lastName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1">{profileData.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Téléphone</h3>
                <p className="mt-1">{profileData.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Numéro étudiant</h3>
                <p className="mt-1">{profileData.studentId}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Filière</h3>
                <p className="mt-1">{profileData.program}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Groupe</h3>
                <p className="mt-1">{profileData.group}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Année</h3>
                <p className="mt-1">{profileData.year}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date de naissance</h3>
                <p className="mt-1">{new Date(profileData.birthDate).toLocaleDateString()}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Adresse</h3>
                <p className="mt-1">{profileData.address}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section Sécurité */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Sécurité</h2>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Mot de passe</h3>
              <p className="text-sm text-gray-500">Modifiez votre mot de passe</p>
            </div>
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="px-4 py-2 bg-[#006faf] text-white rounded-lg hover:bg-[#006faf]/90"
            >
              {showPasswordForm ? 'Annuler' : 'Changer le mot de passe'}
            </button>
          </div>

          {showPasswordForm && (
            <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#006faf] focus:border-[#006faf]"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#006faf] focus:border-[#006faf]"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#006faf] focus:border-[#006faf]"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#006faf] text-white rounded-lg hover:bg-[#006faf]/90"
                >
                  Mettre à jour le mot de passe
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Section Paramètres */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Paramètres</h2>
        </div>
        <div className="p-6 space-y-6">
          {/* Notifications */}
          <div className="flex items-center justify-between py-4">
            <div>
              <h3 className="font-medium text-gray-900">Notifications</h3>
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
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#006faf]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006faf]"></div>
            </label>
          </div>

          {/* Thème */}
          <div className="flex items-center justify-between py-4 border-t border-gray-200">
            <div>
              <h3 className="font-medium text-gray-900">Thème de l'interface</h3>
              <p className="text-sm text-gray-500">Choisissez entre un thème clair ou sombre</p>
            </div>
            <div className="flex space-x-4">
              <label className={`px-4 py-2 rounded-lg cursor-pointer ${settings.theme === 'light' ? 'bg-[#006faf] text-white' : 'bg-gray-100 text-gray-700'}`}>
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
              <label className={`px-4 py-2 rounded-lg cursor-pointer ${settings.theme === 'dark' ? 'bg-[#006faf] text-white' : 'bg-gray-100 text-gray-700'}`}>
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

          {/* Langue */}
          <div className="flex items-center justify-between py-4 border-t border-gray-200">
            <div>
              <h3 className="font-medium text-gray-900">Langue</h3>
              <p className="text-sm text-gray-500">Choisissez la langue de l'interface</p>
            </div>
            <select
              name="language"
              value={settings.language}
              onChange={handleSettingsChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#006faf] focus:border-[#006faf]"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          {/* Déconnexion */}
          <div className="flex items-center justify-between py-4 border-t border-gray-200">
            <div>
              <h3 className="font-medium text-gray-900">Déconnexion</h3>
              <p className="text-sm text-gray-500">Se déconnecter de l'application</p>
            </div>
            <button
              onClick={handleLogoutClick}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmation de déconnexion */}
      <ConfirmModal
        isOpen={showLogoutConfirm}
        title="Confirmation de déconnexion"
        message="Êtes-vous sûr de vouloir vous déconnecter de votre session ?"
        confirmText="Déconnexion"
        cancelText="Annuler"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  );
};

export default StudentProfilePage;
