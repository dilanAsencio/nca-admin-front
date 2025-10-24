import { useState } from 'react';
import Image from 'next/image';

interface InputImageComponentProps {
  onImageChange?: (preview: string | null) => void;
  register?: any;
  name?: string;
  formats?: string[];
}

export const InputImageComponent = ({ onImageChange, register, name = "logo_url" , formats}: InputImageComponentProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        onImageChange?.(result); // Enviar preview al componente padre
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      onImageChange?.(null);
    }
    
  };

  return (
    <div className="w-full max-w-sm">
      <label
        htmlFor={name}
        className="flex flex-col items-center justify-center w-full cursor-pointer text-gray-500 hover:text-purple-600 transition"
      >
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt="Preview"
            width={200}
            height={200}
            className="object-contain rounded-md"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-[0.9375rem]">
            <Image src="/assets/img/up-logo.png" alt="Upload" width={75} height={75} />
            <span className='m-0 font-normal text-[0.875rem]'>Cargar {name}</span>
            <span className='m-0 font-normal text-[0.875rem]'>Formato: {formats?.join(', ')}</span>
          </div>
        )}
        <input
          id={name}
          type="file"
          accept="image/*"
          name={name}
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};