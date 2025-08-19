
import React from 'react';

export const Welcome: React.FC = () => {
    return (
        <div className="text-center mb-6 p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Witaj w Atlasie Roślin!</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Zrób zdjęcie dowolnej rośliny, a ja pomogę Ci ją zidentyfikować. Otrzymasz szczegółowe informacje na temat jej wyglądu, właściwości jadalnych i leczniczych.
            </p>
             <p className="mt-4 font-semibold text-green-700">
                Aby rozpocząć, dodaj zdjęcie poniżej.
            </p>
        </div>
    );
};
