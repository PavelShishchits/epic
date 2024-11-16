'use client';

import { useEffect, useState } from 'react';
import { getInputProps, type FieldMetadata } from '@conform-to/react';
import { z } from 'zod';
import { imageFieldSchema } from '@/schema/note';
import { Plus } from 'lucide-react';
import {
  FormField,
  FormLabel,
  FormMessages,
  Input,
} from '@/components/ui/Form/index';
import { cn } from '@/lib/utils';

type ImageFieldset = z.infer<typeof imageFieldSchema>;

interface FileUploaderProps {
  config: FieldMetadata<ImageFieldset>;
}

function FileUploader(props: FileUploaderProps) {
  const { config } = props;

  const fieldset = config.getFieldset();
  const imageExists = Boolean(fieldset.id.initialValue);

  // toDo get image data from db
  const [previewImage, setPreviewImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const { key: idKey, ...idProps } = getInputProps(fieldset.id, {
    type: 'hidden',
  });
  const { key: fileKey, ...fileProps } = getInputProps(fieldset.file, {
    type: 'file',
  });
  const { key: altTextKey, ...altTextProps } = getInputProps(fieldset.altText, {
    type: 'text',
  });

  useEffect(() => {
    if (imageExists && fieldset.id.initialValue) {
      fetch(`/api/resources/note-images?id=${fieldset.id.initialValue}`)
        .then((response) => {
          if (!response.ok) throw new Error('Image not found');
          return response.json();
        })
        .then((image) => {
          setPreviewImage({
            src: image.filepath,
            alt: image.altText,
          });
        })
        .catch((error) => {
          console.error('Error loading image:', error);
        });
    }
  }, [imageExists, fieldset.id.initialValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage({
          src: e.target?.result as string,
          alt: file.name,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleAltChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewImage({
      src: previewImage?.src || '',
      alt: event.target.value,
    });
  };

  return (
    <fieldset className="flex gap-7 items-center">
      <FormField>
        <FormLabel className={'space-y-2'} htmlFor={fieldset.file.id}>
          <span>File</span>
          <div
            tabIndex={0}
            className={cn(
              'size-60 rounded-md border border-input bg-background ring-offset-background flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            )}
            aria-label="choose image"
          >
            {previewImage ? (
              <img src={previewImage.src} alt={previewImage.alt} />
            ) : (
              <span className="text-foreground text-4xl">
                <Plus />
              </span>
            )}
          </div>
        </FormLabel>
        <Input className="hidden" {...fileProps} onChange={handleFileChange} />
        <FormMessages
          errors={fieldset.file.errors}
          id={fieldset.file.errorId}
        />
      </FormField>
      {imageExists ? <Input {...idProps} /> : null}
      <FormField>
        <FormLabel htmlFor={fieldset.altText.id}>Alt text</FormLabel>
        <Input {...altTextProps} onChange={handleAltChange} />
        <FormMessages
          errors={fieldset.altText.errors}
          id={fieldset.altText.errorId}
        />
      </FormField>
    </fieldset>
  );
}
export default FileUploader;
