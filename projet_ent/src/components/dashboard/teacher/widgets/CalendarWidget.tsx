import React, { useState } from 'react';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // Format "YYYY-MM-DD"
  time?: string;
  type: 'course' | 'exam' | 'meeting' | 'other';
}

interface CalendarWidgetProps {
  events: CalendarEvent[];
  isLoading: boolean;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ events, isLoading }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Génération des jours du mois actuel
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Adjust for Sunday (0) to be displayed as the last day of the week (European calendar)
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    const days = [];
    
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push({ day: null, date: null });
    }
    
    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i);
      days.push({
        day: i,
        date: dayDate,
        dateString: dayDate.toISOString().split('T')[0],
      });
    }
    
    return days;
  };

  // Obtenir les événements pour un jour spécifique
  const getEventsForDay = (dateString: string) => {
    return events.filter(event => event.date === dateString);
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  // Navigation dans le calendrier
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Déterminer si une date est aujourd'hui
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Calendrier</h2>
        <div className="flex items-center space-x-1">
          <button 
            onClick={previousMonth}
            className="p-1 hover:bg-gray-100 rounded text-gray-600"
            aria-label="Mois précédent"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <span className="text-sm font-medium px-2">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button 
            onClick={nextMonth}
            className="p-1 hover:bg-gray-100 rounded text-gray-600"
            aria-label="Mois suivant"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="p-6 animate-pulse">
          <div className="grid grid-cols-7 gap-1">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded"></div>
            ))}
            {[...Array(35)].map((_, i) => (
              <div key={i + 7} className="aspect-square h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-2">
          <div className="grid grid-cols-7 gap-1">
            {/* Jours de la semaine */}
            {dayNames.map((day, i) => (
              <div 
                key={i} 
                className="text-center text-xs font-medium text-gray-500 p-1"
              >
                {day}
              </div>
            ))}
            
            {/* Jours du mois */}
            {days.map((day, i) => (
              <div 
                key={i} 
                className={`aspect-square p-1 text-xs ${!day.day ? 'invisible' : ''}`}
              >
                {day.day && (
                  <div className={`relative h-full rounded-md border ${
                    isToday(day.date) 
                    ? 'bg-[#006faf]/10 border-[#006faf]' 
                    : 'hover:bg-gray-50 border-transparent'
                  }`}>
                    <div className="absolute top-1 left-1">
                      {day.day}
                    </div>
                    {day.dateString && getEventsForDay(day.dateString).length > 0 && (
                      <div className="absolute bottom-1 left-1 right-1 flex flex-wrap justify-center">
                        {getEventsForDay(day.dateString).slice(0, 2).map((event) => (
                          <div 
                            key={event.id} 
                            className={`w-2 h-2 mx-0.5 rounded-full ${
                              event.type === 'course' ? 'bg-[#006faf]' : 
                              event.type === 'exam' ? 'bg-red-500' : 
                              event.type === 'meeting' ? 'bg-[#00b43d]' : 
                              'bg-gray-400'
                            }`}
                            title={event.title}
                          ></div>
                        ))}
                        {getEventsForDay(day.dateString).length > 2 && (
                          <span className="text-[0.6rem] text-gray-500 ml-0.5">+{getEventsForDay(day.dateString).length - 2}</span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="p-4 border-t text-center">
        <a 
          href="/teacher/calendar" 
          className="text-sm font-medium text-[#006faf] hover:text-[#006faf]/80"
        >
          Voir tout le calendrier
        </a>
      </div>
    </div>
  );
};

export default CalendarWidget;
