'use client';

import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useRef,useState } from 'react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface PhotoUploadProps {
  onPhotoSelect: (file: File) => void;
}

export function PhotoUpload({ onPhotoSelect }: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    onPhotoSelect(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div
        className={`relative rounded-lg border-2 border-dashed p-4 text-center ${
          dragActive ? 'border-black' : 'border-gray-300'
        } transition-colors duration-300 ease-in-out`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Input
          id="photo-upload"
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />
        {preview ? (
          <div className="relative aspect-video w-full">
            <Image
              src={preview}
              alt="Preview"
              width={300}
              height={100}
              className="h-full w-full rounded-md object-cover"
            />
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute right-2 top-2 bg-white bg-opacity-75 hover:bg-opacity-100"
              onClick={removePhoto}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remover foto</span>
            </Button>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center space-y-2 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-center text-gray-600">
              <Label htmlFor="photo-upload">
                Faça upload de uma foto ou arraste e solte
              </Label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF até 3MB</p>
          </div>
        )}
      </div>
    </div>
  );
}
