
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Loader } from './components/Loader';
import { Welcome } from './components/Welcome';
import { identifyPlant } from './services/geminiService';
import type { PlantData } from './types';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [plantData, setPlantData] = useState<PlantData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setPlantData(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      // result contains "data:mime/type;base64,the_base_64_string"
      const base64String = (reader.result as string).split(',')[1];
      setImageBase64(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleIdentify = useCallback(async () => {
    if (!imageBase64 || !imageFile) {
      setError("Proszę najpierw wybrać zdjęcie.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setPlantData(null);

    try {
      const data = await identifyPlant(imageBase64, imageFile.type);
      setPlantData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Wystąpił nieoczekiwany błąd.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [imageBase64, imageFile]);
  
  const handleReset = () => {
    setImageFile(null);
    setImageBase64(null);
    setPlantData(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-800 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden p-6 md:p-10">
          
          {!imageFile && <Welcome />}

          <ImageUploader onImageSelect={handleImageSelect} imagePreview={imageBase64 ? `data:${imageFile?.type};base64,${imageBase64}` : null} />

          {imageFile && (
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleIdentify}
                disabled={isLoading}
                className="w-full sm:w-auto flex-shrink-0 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
              >
                {isLoading ? 'Analizowanie...' : 'Zidentyfikuj Roślinę'}
              </button>
               <button
                onClick={handleReset}
                disabled={isLoading}
                className="w-full sm:w-auto flex-shrink-0 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                Nowe Zdjęcie
              </button>
            </div>
          )}

          {isLoading && <Loader />}

          {error && (
            <div className="mt-8 text-center bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
              <p className="font-bold">Błąd</p>
              <p>{error}</p>
            </div>
          )}
          
          {plantData && !isLoading && (
            <div className="mt-10">
                <ResultsDisplay data={plantData} />
            </div>
          )}

        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Stworzone z użyciem Gemini AI. Atlas Roślin &copy; 2024</p>
      </footer>
    </div>
  );
};

export default App;
