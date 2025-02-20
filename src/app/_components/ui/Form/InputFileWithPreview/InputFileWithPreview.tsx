'use client';

import NextImage from 'next/image';
import { useState } from 'react';

import { Plus } from 'lucide-react';

import { FormField, FormLabel, Input } from '@/app/_components/ui/Form';
import { cn } from '@/app/_utils/cn';

type InputFileWithPreviewProps = {
  previewImageSrc: string | null;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  labelSlot?: React.ReactNode;
  errorSlot?: React.ReactNode;
};

const InputFileWithPreview = ({
  previewImageSrc,
  inputProps,
  labelSlot,
  errorSlot,
}: InputFileWithPreviewProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(
    previewImageSrc
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <FormField>
      <FormLabel htmlFor={inputProps.id} className="space-y-2">
        {labelSlot ? labelSlot : <div>File</div>}
        <div
          tabIndex={0}
          className={cn(
            'size-60 rounded-md border border-input bg-background ring-offset-background flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
          )}
          aria-label="choose image"
        >
          {previewImage ? (
            <NextImage
              src={previewImage}
              alt={'image file'}
              width={200}
              height={200}
            />
          ) : (
            <span className="text-foreground text-4xl">
              <Plus />
            </span>
          )}
        </div>
      </FormLabel>
      <Input className="hidden" {...inputProps} onChange={handleFileChange} />
      {errorSlot}
    </FormField>
  );
};

export { InputFileWithPreview };
