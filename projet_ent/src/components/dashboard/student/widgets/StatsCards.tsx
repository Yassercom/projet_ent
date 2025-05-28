import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  isPositive?: boolean;
  isLoading?: boolean;
}

interface StatsCardsProps {
  isLoading?: boolean;
}

const StatsCards: React.FC<StatsCardsProps> = ({ isLoading = false }) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'courses':
        return (
          <svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'absences':
        return (
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'grades':
        return (
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'completion':
        return (
          <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Mock stats data
  const stats = [
    {
      title: "Cours ce semestre",
      value: 8,
      icon: "courses",
      change: "+2 depuis l'année dernière",
      isPositive: true
    },
    {
      title: "Absences",
      value: 4,
      icon: "absences",
      change: "-2 depuis le dernier mois",
      isPositive: true
    },
    {
      title: "Moyenne actuelle",
      value: "14.5/20",
      icon: "grades",
      change: "+0.8 pts depuis le dernier contrôle",
      isPositive: true
    },
    {
      title: "Progression semestre",
      value: "65%",
      icon: "completion",
      change: "Échéance : 20 juin 2025",
      isPositive: null
    }
  ];

  const StatCard: React.FC<StatCardProps> = ({ 
    title, 
    value, 
    icon, 
    change, 
    isPositive, 
    isLoading = false 
  }) => {
    if (isLoading) {
      return (
        <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      );
    }

    return (
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          <div className="p-2 rounded-full bg-gray-50">{icon}</div>
        </div>
        {change && (
          <p className={`mt-2 text-xs ${
            isPositive === true ? 'text-green-600' : 
            isPositive === false ? 'text-red-600' : 
            'text-gray-500'
          }`}>
            {change}
          </p>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <StatCard
            key={i}
            title=""
            value=""
            icon={<></>}
            isLoading={true}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={renderIcon(stat.icon)}
          change={stat.change}
          isPositive={stat.isPositive}
        />
      ))}
    </div>
  );
};

export default StatsCards;
