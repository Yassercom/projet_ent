import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './components/auth/LoginPage'
import StudentDashboardPage from './components/dashboard/student/StudentDashboardPage'
import TeacherDashboardPage from './components/dashboard/teacher/TeacherDashboardPage'
import AdminDashboardPage from './components/dashboard/admin/AdminDashboardPage'

function App() {
  // Fonction pour gérer la connexion (simulation)
  const handleLogin = (role: string = 'student') => {
    // Stocker le token et le rôle dans le localStorage
    localStorage.setItem('authToken', 'test-token')
    localStorage.setItem('userRole', role)
    
    // Rediriger vers le tableau de bord approprié
    if (role === 'teacher') {
      window.location.href = '/teacher/dashboard'
    } else if (role === 'admin') {
      window.location.href = '/admin/dashboard'
    } else {
      window.location.href = '/student/dashboard'
    }
  }

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    window.location.href = '/login'
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Page de connexion - accessible à /login */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        
        {/* Routes pour le tableau de bord étudiant */}
        <Route path="/student/dashboard" element={<StudentDashboardPage onLogout={handleLogout} />} />
        <Route path="/student/profile" element={<StudentDashboardPage onLogout={handleLogout} content="profile" />} />
        <Route path="/student/courses" element={<StudentDashboardPage onLogout={handleLogout} content="courses" />} />
        <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
        
        {/* Routes pour le tableau de bord enseignant */}
        <Route path="/teacher/dashboard" element={<TeacherDashboardPage onLogout={handleLogout} />} />
        <Route path="/teacher/courses" element={<TeacherDashboardPage onLogout={handleLogout} content="courses" />} />
        <Route path="/teacher/courses/add" element={<TeacherDashboardPage onLogout={handleLogout} content="add-course" />} />
        <Route path="/teacher/courses/edit/:id" element={<TeacherDashboardPage onLogout={handleLogout} content="add-course" />} />
        <Route path="/teacher/profile" element={<TeacherDashboardPage onLogout={handleLogout} content="profile" />} />
        <Route path="/teacher" element={<Navigate to="/teacher/dashboard" replace />} />
        
        {/* Routes pour le tableau de bord administrateur */}
        <Route path="/admin/dashboard" element={<AdminDashboardPage onLogout={handleLogout} />} />
        <Route path="/admin/profile" element={<AdminDashboardPage onLogout={handleLogout} content="profile" />} />
        <Route path="/admin/settings" element={<AdminDashboardPage onLogout={handleLogout} content="settings" />} />
        
        {/* Department routes */}
        <Route path="/admin/departments" element={<AdminDashboardPage onLogout={handleLogout} content="departments" />} />
        
        {/* Program routes */}
        <Route path="/admin/programs" element={<AdminDashboardPage onLogout={handleLogout} content="programs" />} />
        
        {/* Group routes */}
        <Route path="/admin/groups" element={<AdminDashboardPage onLogout={handleLogout} content="groups" />} />
        
        {/* Teacher routes */}
        <Route path="/admin/teachers" element={<AdminDashboardPage onLogout={handleLogout} content="teachers" />} />
        
        {/* Student routes */}
        <Route path="/admin/students" element={<AdminDashboardPage onLogout={handleLogout} content="students" />} />
        
        {/* Course routes */}
        <Route path="/admin/courses" element={<AdminDashboardPage onLogout={handleLogout} content="courses" />} />
        
        {/* Assignment routes */}
        <Route path="/admin/assignments" element={<AdminDashboardPage onLogout={handleLogout} content="assignments" />} />
        
        {/* Announcement routes */}
        <Route path="/admin/announcements" element={<AdminDashboardPage onLogout={handleLogout} content="announcements" />} />
        
        <Route path="/admin/statistics" element={<AdminDashboardPage onLogout={handleLogout} content="statistics" />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        
        {/* Redirection par défaut vers la page de connexion */}
        <Route path="*" element={
          <div className="min-h-screen bg-blue-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h1 className="text-2xl font-bold text-primary mb-4">Navigation</h1>
              <p className="text-gray-700 mb-4">Choisissez une page à visiter :</p>
              <div className="flex flex-col space-y-2">
                <a 
                  href="/login" 
                  className="bg-secondary hover:bg-opacity-90 text-white px-4 py-2 rounded-lg text-center"
                >
                  Page de connexion
                </a>
                <a 
                  href="/student/dashboard" 
                  className="bg-primary hover:bg-opacity-90 text-white px-4 py-2 rounded-lg text-center"
                >
                  Tableau de bord étudiant
                </a>
                <a 
                  href="/teacher/dashboard" 
                  className="bg-[#006faf] hover:bg-opacity-90 text-white px-4 py-2 rounded-lg text-center"
                >
                  Tableau de bord enseignant
                </a>
                <a 
                  href="/admin/dashboard" 
                  className="bg-est-green hover:bg-opacity-90 text-white px-4 py-2 rounded-lg text-center"
                >
                  Tableau de bord administrateur
                </a>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
