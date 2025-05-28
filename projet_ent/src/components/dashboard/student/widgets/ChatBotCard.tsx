import React from 'react';

interface ChatBotCardProps {
  isLoading?: boolean;
}

const ChatBotCard: React.FC<ChatBotCardProps> = ({ isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-24 bg-gray-200 rounded mb-4"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-primary mb-4">Assistant Virtuel</h2>
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
          </div>
          <div>
            <p className="text-gray-600 text-sm">
              Bonjour ! Je suis l'assistant virtuel de l'EST Salé. Je pourrai bientôt répondre à vos questions sur les cours, les emplois du temps, et plus encore.
            </p>
            <p className="text-gray-500 text-xs mt-1">À venir prochainement</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Posez une question..."
            className="w-full px-4 py-3 bg-gray-100 rounded-l-xl focus:outline-none"
            disabled
          />
          <div className="absolute inset-0 bg-gray-100 opacity-50 rounded-l-xl"></div>
        </div>
        <button
          className="bg-secondary text-white px-4 py-3 rounded-r-xl opacity-50 cursor-not-allowed"
          disabled
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
      <div className="text-center mt-4">
        <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
          Fonctionnalité en développement
        </span>
      </div>
    </div>
  );
};

export default ChatBotCard;
