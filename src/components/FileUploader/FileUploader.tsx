
"use client";

import { useState } from "react";
import ErrorList from "@/components/ErrorList/ErrorList";

interface FileUploaderProps {
  fileProps: any;
  altTextProps: any;
  fileField: any;
  altTextField: any;
  image?: { src: string, alt: string };
}

function FileUploader(props: FileUploaderProps) {
  const { fileProps, fileField, altTextProps, altTextField, image } = props;

  const imageExists = image && image.src;

  const [previewImage, setPreviewImage] = useState<{src: string; alt: string} | null>(imageExists ? {src: image.src, alt: image.alt} : null);

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

  return (<div className="flex gap-7 items-center">
    <div>
      <label className="flex flex-col gap-2 mb-2">
        <span>File</span>
        <div className="size-60 border-2 border-blue-200 p-2 rounded flex items-center justify-center">
          {previewImage ? <img src={previewImage.src} alt={previewImage.alt} /> : <span className="text-blue-200 text-4xl">+</span>}
        </div>
        <input className="hidden" {...fileProps} onChange={handleFileChange} />
      </label>
      <ErrorList errors={fileField.errors} id={fileField.errorId} />
    </div>
    <div>
      <label className="flex flex-col gap-2 mb-2">
        <span>Alt text</span>
        <input {...altTextProps} value={previewImage?.alt || altTextProps.value || ''} onChange={handleAltChange} className="border-2 border-blue-200 py-3 px-4 rounded" />
      </label>
      <ErrorList errors={altTextField.errors} id={altTextField.errorId} />
    </div>
  </div>);
}

export default FileUploader;