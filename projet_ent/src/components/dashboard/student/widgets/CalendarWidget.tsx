import React from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'course' | 'exam' | 'event';
}

interface CalendarWidgetProps {
  isLoading?: boolean;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ isLoading = false }) => {
  // Current date for the calendar
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('fr-FR', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  
  // Get days in current month
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1).getDay();
  
  // Mock events data
  const events: Event[] = [
    {
      id: 1,
      title: "Algorithmique Avancée",
      date: `${currentYear}-${currentDate.getMonth() + 1}-${currentDate.getDate() + 1}`,
      time: "14:00 - 16:00",
      type: 'course'
    },
    {
      id: 2,
      title: "Examen Java",
      date: `${currentYear}-${currentDate.getMonth() + 1}-${currentDate.getDate() + 3}`,
      time: "09:00 - 12:00",
      type: 'exam'
    },
    {
      id: 3,
      title: "Conférence IA",
      date: `${currentYear}-${currentDate.getMonth() + 1}-${currentDate.getDate() + 5}`,
      time: "15:00 - 17:00",
      type: 'event'
    }
  ];

  // Helper function to check if a day has events
  const hasEvents = (day: number) => {
    const dateStr = `${currentYear}-${currentDate.getMonth() + 1}-${day}`;
    return events.some(event => event.date === dateStr);
  };

  // Get event type for styling
  const getEventType = (day: number) => {
    const dateStr = `${currentYear}-${currentDate.getMonth() + 1}-${day}`;
    const event = events.find(event => event.date === dateStr);
    return event ? event.type : null;
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === currentDate.getDate();
      const eventType = getEventType(day);
      
      let eventClass = '';
      if (eventType === 'course') eventClass = 'bg-blue-100 text-blue-800';
      if (eventType === 'exam') eventClass = 'bg-red-100 text-red-800';
      if (eventType === 'event') eventClass = 'bg-green-100 text-green-800';

      days.push(
        <div 
          key={day} 
          className={`h-8 w-8 flex items-center justify-center rounded-full cursor-pointer text-sm
            ${isToday ? 'bg-secondary text-white font-bold' : ''}
            ${!isToday && eventType ? eventClass : ''}
            ${!isToday && !eventType ? 'hover:bg-gray-100' : ''}
          `}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {Array(7).fill(0).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array(35).fill(0).map((_, i) => (
            <div key={i} className="h-8 w-8 bg-gray-200 rounded-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-primary mb-4">Calendrier</h2>
      <h3 className="font-medium text-gray-700 mb-4 capitalize">{currentMonth} {currentYear}</h3>
      
      {/* Calendar header - days of week */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {generateCalendarDays()}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-between text-xs">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-blue-100 mr-1"></div>
          <span className="text-gray-600">Cours</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-red-100 mr-1"></div>
          <span className="text-gray-600">Examen</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-green-100 mr-1"></div>
          <span className="text-gray-600">Événement</span>
        </div>
      </div>
      
      {/* Upcoming events */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <h4 className="font-medium text-gray-800 mb-2">Prochains événements</h4>
        <div className="space-y-2">
          {events.map((event) => (
            <div key={event.id} className="flex items-center">
              <div className={`h-2 w-2 rounded-full mr-2
                ${event.type === 'course' ? 'bg-blue-500' : ''}
                ${event.type === 'exam' ? 'bg-red-500' : ''}
                ${event.type === 'event' ? 'bg-green-500' : ''}
              `}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{event.title}</p>
                <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString('fr-FR')} • {event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <a href="#" className="text-secondary hover:text-secondary-dark text-sm font-medium">
          Voir calendrier complet
        </a>
      </div>
    </div>
  );
};

export default CalendarWidget;
