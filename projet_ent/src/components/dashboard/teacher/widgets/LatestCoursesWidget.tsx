import React from 'react';

export interface Course {
  id: string;
  title: string;
  description: string;
  date: string;
  group: string;
  thumbnail?: string;
}

interface LatestCoursesWidgetProps {
  courses: Course[];
  isLoading: boolean;
}

const LatestCoursesWidget: React.FC<LatestCoursesWidgetProps> = ({ courses, isLoading }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden col-span-1 lg:col-span-2">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Derniers cours créés</h2>
      </div>
      
      {isLoading ? (
        <div className="p-6 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse flex space-x-4">
              <div className="rounded-lg bg-gray-200 h-14 w-14"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="p-10 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun cours créé</h3>
          <p className="mt-1 text-sm text-gray-500">Commencez à créer vos cours pour vos groupes.</p>
          <div className="mt-6">
            <a 
              href="/teacher/courses/add" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#006faf] hover:bg-[#006faf]/90"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Créer un cours
            </a>
          </div>
        </div>
      ) : (
        <div className="divide-y">
          {courses.map((course) => (
            <div key={course.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {course.thumbnail ? (
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-lg bg-[#006faf]/10 flex items-center justify-center text-[#006faf]">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <a href={`/teacher/courses/${course.id}`} className="block focus:outline-none">
                    <p className="text-base font-medium text-gray-900 truncate">{course.title}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">{course.description}</p>
                    <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                      <span>{course.group}</span>
                      <span>•</span>
                      <span>{course.date}</span>
                    </div>
                  </a>
                </div>
                <div className="flex-shrink-0 self-center flex">
                  <a
                    href={`/teacher/courses/edit/${course.id}`}
                    className="text-gray-500 hover:text-[#006faf] p-1"
                    title="Modifier"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
          <div className="p-4 flex justify-center">
            <a 
              href="/teacher/courses" 
              className="text-sm font-medium text-[#006faf] hover:text-[#006faf]/80"
            >
              Voir tous les cours
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestCoursesWidget;
