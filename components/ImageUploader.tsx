
import React, { useCallback, useRef, useState } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  imagePreview: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, imagePreview }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageSelect(event.target.files[0]);
    }
  };

  const handleDivClick = () => {
    inputRef.current?.click();
  };

  const handleDragEvents = useCallback((e: React.DragEvent<HTMLDivElement>, dragging: boolean) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(dragging);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      handleDragEvents(e, false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          onImageSelect(e.dataTransfer.files[0]);
      }
  }, [handleDragEvents, onImageSelect]);


  if (imagePreview) {
    return (
      <div className="mt-4 w-full max-w-xl mx-auto">
        <p className="text-center font-semibold text-gray-700 mb-2">Wybrane zdjęcie:</p>
        <div className="rounded-lg overflow-hidden shadow-lg border-4 border-green-200">
            <img src={imagePreview} alt="Podgląd rośliny" className="w-full h-auto object-contain" />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleDivClick}
      onDragEnter={(e) => handleDragEvents(e, true)}
      onDragLeave={(e) => handleDragEvents(e, false)}
      onDragOver={(e) => handleDragEvents(e, true)}
      onDrop={handleDrop}
      className={`mt-4 w-full p-8 border-4 border-dashed rounded-xl cursor-pointer transition-all duration-300 text-center
        ${isDragging ? 'border-green-500 bg-green-100 scale-105' : 'border-gray-300 hover:border-green-400 hover:bg-green-50'}`}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      <div className="flex flex-col items-center justify-center text-gray-500">
        <UploadIcon className="w-16 h-16 mb-4 text-gray-400"/>
        <p className="font-bold text-lg">Przeciągnij i upuść zdjęcie tutaj</p>
        <p className="text-sm">lub</p>
        <p className="text-green-600 font-semibold">Kliknij, aby wybrać plik</p>
        <p className="text-xs mt-2 text-gray-400">Obsługiwane formaty: JPG, PNG, WEBP</p>
      </div>
    </div>
  );
};
