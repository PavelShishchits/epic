
"use client";

import { useEffect, useState } from "react";
import ErrorList from "@/components/ErrorList/ErrorList";
import { getInputProps, type FieldMetadata } from "@conform-to/react";
import { z } from "zod";
import { imageFieldSchema } from "@/schema/note";
import { Plus } from "lucide-react";

type ImageFieldset = z.infer<typeof imageFieldSchema>

interface FileUploaderProps {
  config: FieldMetadata<ImageFieldset>;
}

function FileUploader(props: FileUploaderProps) {
  const { config } = props;

  const fieldset = config.getFieldset();
  const imageExists = Boolean(fieldset.id.initialValue);

  // toDo get image data from db
  const [previewImage, setPreviewImage] = useState<{src: string; alt: string} | null>(null);

  const {key: idKey, ...idProps} = getInputProps(fieldset.id, { type: 'hidden'});
  const {key: fileKey, ...fileProps} = getInputProps(fieldset.file, { type: 'file'});
  const {key: altTextKey, ...altTextProps} = getInputProps(fieldset.altText, { type: 'text'});

  useEffect(() => {
    if (imageExists && fieldset.id.initialValue) {
      fetch(`/api/resources/note-images?id=${fieldset.id.initialValue}`)
        .then(response => {
          if (!response.ok) throw new Error('Image not found');
          return response.json();
        })
        .then(image => {
          setPreviewImage({
            src: image.filepath,
            alt: image.altText
          });
        })
        .catch(error => {
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
          alt: file.name
        })
      }
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  }

  const handleAltChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewImage({
      src: previewImage?.src || '',
      alt: event.target.value,
    });
  }

  return (<fieldset className="flex gap-7 items-center">
    <div>
      <label className="flex flex-col gap-2 mb-2">
        <span>File</span>
        <div className="size-60 border-2 border-blue-200 p-2 rounded flex items-center justify-center">
          {previewImage ? <img src={previewImage.src} alt={previewImage.alt} /> : <span className="text-blue-200 text-4xl"><Plus /></span>}
        </div>
        <input className="hidden" {...fileProps} onChange={handleFileChange} />
      </label>
      <ErrorList errors={fieldset.file.errors} id={fieldset.file.errorId} />
    </div>
    {imageExists ? <div>
      <input {...idProps} />
    </div> : null}
    <div>
      <label className="flex flex-col gap-2 mb-2">
        <span>Alt text</span>
        <input {...altTextProps} onChange={handleAltChange} className="border-2 border-blue-200 py-3 px-4 rounded" />
      </label>
      <ErrorList errors={fieldset.altText.errors} id={fieldset.altText.errorId} />
    </div>
  </fieldset>);
}
export default FileUploader;
