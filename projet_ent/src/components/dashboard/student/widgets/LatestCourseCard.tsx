import React from 'react';

interface LatestCourseCardProps {
  isLoading?: boolean;
}

const LatestCourseCard: React.FC<LatestCourseCardProps> = ({ isLoading = false }) => {
  // Mock data
  const latestCourse = {
    title: "Algorithmique Avancée",
    professor: "Dr. Mohammed Benali",
    date: "20 mai 2025",
    time: "14:00 - 16:00",
    location: "Amphi A",
    imageUrl: "https://i0.wp.com/www.est.um5.ac.ma/wp-content/uploads/2019/06/logo_ests_2018.png",
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="flex space-x-4">
          <div className="h-16 w-16 bg-gray-200 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-primary mb-4">Dernier cours ajouté</h2>
      <div className="flex">
        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden mr-4">
          <img 
            src={latestCourse.imageUrl} 
            alt={latestCourse.title} 
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{latestCourse.title}</h3>
          <p className="text-gray-600">{latestCourse.professor}</p>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{latestCourse.date}, {latestCourse.time}</span>
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{latestCourse.location}</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <a 
          href="#" 
          className="text-secondary hover:text-secondary-dark font-medium transition-colors duration-200 flex items-center"
        >
          <span>Voir le détail</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default LatestCourseCard;
