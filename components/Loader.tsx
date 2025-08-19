
import React from 'react';
import { LeafIcon } from './Icons';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <LeafIcon className="w-16 h-16 text-green-500 animate-spin" />
      <p className="mt-4 text-lg font-semibold text-gray-600">
        Analizuję Twoją roślinę...
      </p>
       <p className="mt-1 text-sm text-gray-500">
        To może zająć chwilę.
      </p>
    </div>
  );
};
