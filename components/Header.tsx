
import React from 'react';
import { LeafIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-5 flex items-center justify-center">
        <LeafIcon className="h-10 w-10 text-green-600 mr-3" />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 tracking-tight">
            Atlas Roślin
          </h1>
          <p className="text-sm text-gray-500">Identyfikacja roślin z pomocą AI</p>
        </div>
      </div>
    </header>
  );
};
