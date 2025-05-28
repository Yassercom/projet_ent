import React from 'react';

interface StatsData {
  coursesCount: number;
  groupsCount: number;
  studentsCount: number;
  isLoading: boolean;
}

interface StatsCardsProps {
  data: StatsData;
}

const StatsCards: React.FC<StatsCardsProps> = ({ data }) => {
  const { coursesCount, groupsCount, studentsCount, isLoading } = data;

  const statsItems = [
    {
      title: 'Cours créés',
      value: coursesCount,
      icon: (
        <svg className="w-8 h-8 text-[#006faf]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'bg-blue-50 text-[#006faf]',
    },
    {
      title: 'Groupes assignés',
      value: groupsCount,
      icon: (
        <svg className="w-8 h-8 text-[#00b43d]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'bg-green-50 text-[#00b43d]',
    },
    {
      title: 'Étudiants enseignés',
      value: studentsCount,
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {statsItems.map((item, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className={`rounded-full p-3 ${item.color.split(' ')[0]}`}>
            {item.icon}
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">{item.title}</p>
            {isLoading ? (
              <div className="h-6 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
            ) : (
              <p className={`text-2xl font-bold ${item.color.split(' ')[1]}`}>{item.value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
