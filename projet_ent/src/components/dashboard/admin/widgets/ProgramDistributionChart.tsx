import React from 'react';

interface ProgramData {
  name: string;
  count: number;
  color: string;
}

interface ProgramDistributionChartProps {
  data: ProgramData[];
  isLoading: boolean;
}

const ProgramDistributionChart: React.FC<ProgramDistributionChartProps> = ({ data, isLoading }) => {
  // Calculer le total pour les pourcentages
  const total = data.reduce((acc, item) => acc + item.count, 0);
  
  // Créer une visualisation simple de diagramme en camembert
  const renderPieChart = () => {
    let startAngle = 0;
    
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="40" fill="#f3f4f6" />
        
        {data.map((item, index) => {
          const percentage = (item.count / total) * 100;
          const angle = (percentage / 100) * 360;
          const endAngle = startAngle + angle;
          
          // Calculer les coordonnées des points pour le path
          const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
          const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
          const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
          const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
          
          // Créer le path pour le segment
          const largeArcFlag = angle > 180 ? 1 : 0;
          const path = [
            `M 50 50`,
            `L ${x1} ${y1}`,
            `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');
          
          // Mettre à jour l'angle de départ pour le prochain segment
          startAngle = endAngle;
          
          return <path key={index} d={path} fill={item.color} />;
        })}
        
        <circle cx="50" cy="50" r="25" fill="white" />
      </svg>
    );
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Répartition par filière</h2>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-est-green"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64">
            {renderPieChart()}
          </div>
          
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Détails</h3>
            <div className="space-y-2">
              {data.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="flex-1 flex justify-between items-center">
                    <span className="text-sm text-gray-600">{item.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{item.count}</span>
                      <span className="text-xs text-gray-500">
                        ({((item.count / total) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Total</span>
                <span className="text-sm font-bold">{total} étudiants</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramDistributionChart;
