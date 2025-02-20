'use client';

import { type FieldMetadata, getInputProps } from '@conform-to/react';
import { z } from 'zod';

import { InputFileWithPreview } from '@/app/_components/ui/Form/index';
import {
  FormField,
  FormLabel,
  FormMessages,
  Input,
} from '@/app/_components/ui/Form/index';
import { getNoteImageSrc } from '@/app/_utils/misc';
import { imageFieldSchema } from '@/schema/note';

type ImageFieldset = z.infer<typeof imageFieldSchema>;

interface FileUploaderProps {
  config: FieldMetadata<ImageFieldset>;
}

function FileUploader(props: FileUploaderProps) {
  const { config } = props;

  const fieldset = config.getFieldset();
  const imageExists = Boolean(fieldset.id.initialValue);

  const { key: idKey, ...idProps } = getInputProps(fieldset.id, {
    type: 'hidden',
  });
  const { key: fileKey, ...fileProps } = getInputProps(fieldset.file, {
    type: 'file',
  });
  const { key: altTextKey, ...altTextProps } = getInputProps(fieldset.altText, {
    type: 'text',
  });

  return (
    <fieldset className="flex gap-7 items-center">
      <InputFileWithPreview
        previewImageSrc={
          imageExists ? getNoteImageSrc(fieldset.id.value || '') : null
        }
        inputProps={fileProps}
        labelSlot={<div>Image</div>}
        errorSlot={
          <FormMessages
            errors={fieldset.file.errors}
            id={fieldset.file.errorId}
          />
        }
      />

      {imageExists ? <Input {...idProps} /> : null}

      <FormField>
        <FormLabel htmlFor={fieldset.altText.id}>Alt text</FormLabel>
        <Input {...altTextProps} />
        <FormMessages
          errors={fieldset.altText.errors}
          id={fieldset.altText.errorId}
        />
      </FormField>
    </fieldset>
  );
}
export default FileUploader;
