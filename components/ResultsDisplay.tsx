
import React from 'react';
import type { PlantData } from '../types';
import { InfoCard } from './InfoCard';
import { BookOpenIcon, HeartIcon, SparklesIcon } from './Icons';

interface ResultsDisplayProps {
  data: PlantData;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ data }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-2">{data.name}</h2>
      <div className="w-24 h-1 bg-green-500 mx-auto mb-8 rounded"></div>

      <div className="space-y-6">
        <InfoCard 
            title="Cechy Morfologiczne" 
            content={data.morphologicalDescription}
            icon={<BookOpenIcon className="w-8 h-8"/>}
        />
        <InfoCard 
            title="Właściwości Jadalne" 
            content={data.edibleProperties}
            icon={<SparklesIcon className="w-8 h-8"/>}
        />
        <InfoCard 
            title="Właściwości Lecznicze" 
            content={data.medicinalProperties}
            icon={<HeartIcon className="w-8 h-8"/>}
        />
      </div>
    </div>
  );
};
