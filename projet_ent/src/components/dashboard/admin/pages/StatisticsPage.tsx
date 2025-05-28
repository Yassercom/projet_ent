import React, { useState, useEffect } from 'react';

interface StatData {
  label: string;
  value: number;
  previousValue: number;
  change: number;
  color: string;
}

interface EnrollmentData {
  year: string;
  students: number;
  teachers: number;
}

interface ProgramData {
  name: string;
  students: number;
  color: string;
}

interface DepartmentPerformanceData {
  department: string;
  successRate: number;
  averageGrade: number;
  employmentRate: number;
}

const StatisticsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState('year');
  const [statsData, setStatsData] = useState<StatData[]>([]);
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData[]>([]);
  const [programData, setProgramData] = useState<ProgramData[]>([]);
  const [departmentPerformance, setDepartmentPerformance] = useState<DepartmentPerformanceData[]>([]);

  // Données factices pour les statistiques générales
  const mockStatsData: StatData[] = [
    {
      label: 'Étudiants',
      value: 1250,
      previousValue: 1150,
      change: 8.7,
      color: 'indigo'
    },
    {
      label: 'Enseignants',
      value: 65,
      previousValue: 62,
      change: 4.8,
      color: 'amber'
    },
    {
      label: 'Taux de réussite',
      value: 87,
      previousValue: 83,
      change: 4.8,
      color: 'green'
    },
    {
      label: 'Taux d\'insertion',
      value: 92,
      previousValue: 88,
      change: 4.5,
      color: 'blue'
    }
  ];

  // Données factices pour l'évolution des inscriptions
  const mockEnrollmentData: EnrollmentData[] = [
    { year: '2020', students: 820, teachers: 51 },
    { year: '2021', students: 950, teachers: 56 },
    { year: '2022', students: 1080, teachers: 59 },
    { year: '2023', students: 1150, teachers: 62 },
    { year: '2024', students: 1250, teachers: 65 }
  ];

  // Données factices pour la répartition par filière
  const mockProgramData: ProgramData[] = [
    { name: 'IAWM', students: 320, color: '#00b43d' },
    { name: 'BDIA', students: 295, color: '#006faf' },
    { name: 'ISIC', students: 260, color: '#007B8A' },
    { name: 'GC', students: 180, color: '#4f46e5' },
    { name: 'GE', students: 195, color: '#7c3aed' }
  ];

  // Données factices pour les performances par département
  const mockDepartmentPerformance: DepartmentPerformanceData[] = [
    { department: 'Informatique', successRate: 89, averageGrade: 14.2, employmentRate: 95 },
    { department: 'Génie Civil', successRate: 86, averageGrade: 13.8, employmentRate: 90 },
    { department: 'Génie Électrique', successRate: 88, averageGrade: 14.0, employmentRate: 92 },
    { department: 'Gestion et Commerce', successRate: 91, averageGrade: 14.5, employmentRate: 88 },
    { department: 'Langues et Communication', successRate: 93, averageGrade: 15.1, employmentRate: 82 }
  ];

  useEffect(() => {
    // Simuler un appel API
    const timer = setTimeout(() => {
      setStatsData(mockStatsData);
      setEnrollmentData(mockEnrollmentData);
      setProgramData(mockProgramData);
      setDepartmentPerformance(mockDepartmentPerformance);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Fonction pour créer un graphique d'évolution simpliste
  const renderTrendChart = () => {
    const maxStudents = Math.max(...enrollmentData.map(d => d.students));
    const maxTeachers = Math.max(...enrollmentData.map(d => d.teachers));
    
    // Normalisation pour les enseignants (multiplier pour qu'ils soient visibles par rapport aux étudiants)
    const teacherScale = maxStudents / maxTeachers / 2;

    return (
      <svg className="w-full h-64" viewBox="0 0 100 50">
        {/* Grille horizontale */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`grid-h-${i}`}
            x1="0"
            y1={10 * i + 5}
            x2="100"
            y2={10 * i + 5}
            stroke="#e5e7eb"
            strokeWidth="0.2"
          />
        ))}
        
        {/* Grille verticale */}
        {enrollmentData.map((_, i) => (
          <line
            key={`grid-v-${i}`}
            x1={20 * i + 10}
            y1="0"
            x2={20 * i + 10}
            y2="50"
            stroke="#e5e7eb"
            strokeWidth="0.2"
          />
        ))}
        
        {/* Ligne pour les étudiants */}
        <polyline
          points={enrollmentData
            .map((d, i) => `${20 * i + 10},${45 - (d.students / maxStudents) * 40}`)
            .join(' ')}
          fill="none"
          stroke="#00b43d"
          strokeWidth="0.5"
        />
        
        {/* Points pour les étudiants */}
        {enrollmentData.map((d, i) => (
          <circle
            key={`student-${i}`}
            cx={20 * i + 10}
            cy={45 - (d.students / maxStudents) * 40}
            r="0.8"
            fill="#00b43d"
          />
        ))}
        
        {/* Ligne pour les enseignants */}
        <polyline
          points={enrollmentData
            .map((d, i) => `${20 * i + 10},${45 - (d.teachers * teacherScale / maxStudents) * 40}`)
            .join(' ')}
          fill="none"
          stroke="#006faf"
          strokeWidth="0.5"
        />
        
        {/* Points pour les enseignants */}
        {enrollmentData.map((d, i) => (
          <circle
            key={`teacher-${i}`}
            cx={20 * i + 10}
            cy={45 - (d.teachers * teacherScale / maxStudents) * 40}
            r="0.8"
            fill="#006faf"
          />
        ))}
        
        {/* Années */}
        {enrollmentData.map((d, i) => (
          <text
            key={`year-${i}`}
            x={20 * i + 10}
            y="49"
            fontSize="2"
            textAnchor="middle"
            fill="#6b7280"
          >
            {d.year}
          </text>
        ))}
      </svg>
    );
  };

  // Fonction pour créer un graphique en camembert simplifié
  const renderPieChart = () => {
    const total = programData.reduce((acc, curr) => acc + curr.students, 0);
    let startAngle = 0;

    return (
      <svg className="w-full" viewBox="0 0 100 100">
        {programData.map((program, i) => {
          const percentage = program.students / total;
          const angle = percentage * 360;
          const endAngle = startAngle + angle;
          
          // Convertir les angles en radians
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;
          
          // Calculer les points sur le cercle
          const x1 = 50 + 40 * Math.sin(startRad);
          const y1 = 50 - 40 * Math.cos(startRad);
          const x2 = 50 + 40 * Math.sin(endRad);
          const y2 = 50 - 40 * Math.cos(endRad);
          
          // Déterminer si l'arc doit être tracé comme un arc "large" (> 180 degrés)
          const largeArcFlag = angle > 180 ? 1 : 0;
          
          // Créer le path pour la tranche de camembert
          const pathData = [
            `M 50 50`,
            `L ${x1} ${y1}`,
            `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');
          
          // Préparer l'angle pour la prochaine tranche
          const result = <path key={i} d={pathData} fill={program.color} />;
          startAngle = endAngle;
          return result;
        })}
        
        {/* Trou central */}
        <circle cx="50" cy="50" r="20" fill="white" />
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Statistiques</h1>
        <p className="text-gray-600">Tableau de bord analytique de l'établissement.</p>
      </div>

      {/* Filtres */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              period === 'year' 
                ? 'bg-est-green text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setPeriod('year')}
          >
            Année
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              period === 'semester' 
                ? 'bg-est-green text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setPeriod('semester')}
          >
            Semestre
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              period === 'month' 
                ? 'bg-est-green text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setPeriod('month')}
          >
            Mois
          </button>
        </div>
      </div>

      {/* Statistiques générales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? [...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-5 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))
          : statsData.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-5">
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                <div className="flex items-end mt-2 space-x-2">
                  <p className={`text-3xl font-bold text-${stat.color}-600`}>
                    {stat.label.includes('Taux') ? `${stat.value}%` : stat.value}
                  </p>
                  <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    stat.change >= 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {stat.change >= 0 ? '+' : ''}{stat.change}%
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  vs. {period === 'year' ? 'année précédente' : period === 'semester' ? 'semestre précédent' : 'mois précédent'}
                </p>
              </div>
            ))}
      </div>

      {/* Évolution des inscriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Évolution des inscriptions</h2>
          
          {isLoading ? (
            <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
          ) : (
            <div>
              <div className="mb-4 flex space-x-6">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-est-green rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Étudiants</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-est-blue rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Enseignants</span>
                </div>
              </div>
              
              {renderTrendChart()}
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-4">
                {enrollmentData.map((data, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm font-medium text-gray-900">{data.year}</div>
                    <div className="text-xs text-gray-500">
                      <span className="text-est-green">{data.students}</span> / <span className="text-est-blue">{data.teachers}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Répartition par filière */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Répartition par filière</h2>
          
          {isLoading ? (
            <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
          ) : (
            <div>
              <div className="h-64 mb-4">
                {renderPieChart()}
              </div>
              
              <div className="space-y-2">
                {programData.map((program, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: program.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{program.name}</span>
                    </div>
                    <span className="text-sm font-medium">{program.students}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Performances par département */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Performances par département</h2>
        </div>
        
        {isLoading ? (
          <div className="p-6 animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-100 rounded"></div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Département
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Taux de réussite
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Moyenne générale
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Taux d'insertion
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departmentPerformance.map((dept, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{dept.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{dept.successRate}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div 
                          className="bg-green-500 h-1.5 rounded-full" 
                          style={{ width: `${dept.successRate}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{dept.averageGrade}/20</div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full" 
                          style={{ width: `${(dept.averageGrade/20)*100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{dept.employmentRate}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div 
                          className="bg-purple-500 h-1.5 rounded-full" 
                          style={{ width: `${dept.employmentRate}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          Générer rapport PDF
        </button>
        <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-est-green hover:bg-est-green/90">
          Exporter les données
        </button>
      </div>
    </div>
  );
};

export default StatisticsPage;
