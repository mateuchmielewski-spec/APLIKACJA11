
import React from 'react';

interface InfoCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, content, icon }) => {
  return (
    <div className="bg-green-50/50 border border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <div className="flex-shrink-0 bg-green-500 text-white rounded-full p-3 mr-5">
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-bold text-green-900 mb-2">{title}</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    </div>
  );
};
