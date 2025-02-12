'use client';

import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';

import { addNoteAction, editNoteAction } from '@/app/_actions/notes.action';
import FileUploader from '@/app/_components/FileUploader/FileUploader';
import Button from '@/app/_components/ui/Button/Button';
import {
  CsrfTokenField,
  FormField,
  FormLabel,
  FormMessages,
  HoneypotField,
  Input,
  SubmitBtn,
  Textarea,
} from '@/app/_components/ui/Form/index';
import { Note } from '@/entities/models/note';
import { noteEditSchema } from '@/schema/note';

interface NoteEditFormProps {
  note?: Note;
  username: string;
}

function NoteEditForm(props: NoteEditFormProps) {
  const { note, username } = props;

  const isEditingMode = !!note;

  const action = isEditingMode
    ? editNoteAction.bind(null, {
        noteId: note?.id,
        username: username,
      })
    : addNoteAction.bind(null, { username: username });

  const noteImages = note?.images || [];

  const [form, fields] = useForm({
    id: 'note-edit-form',
    constraint: getZodConstraint(noteEditSchema),
    onValidate(context) {
      return parseWithZod(context.formData, {
        schema: noteEditSchema,
      });
    },
    defaultValue: {
      title: note?.title || '',
      content: note?.content || '',
      images:
        noteImages.length > 0
          ? noteImages.map((image) => ({
              id: image.id,
              altText: image.altText,
            }))
          : [{}],
    },
    shouldValidate: 'onInput',
    shouldRevalidate: 'onInput',
  });

  const { key: titleKey, ...titleProps } = getInputProps(fields.title, {
    type: 'text',
  });
  const { key: contentKey, ...contentProps } = getTextareaProps(fields.content);

  const imagesList = fields.images.getFieldList();

  const handleFormSubmitAction = async (formData: FormData) => {
    const response = await action(formData);
    if (response?.error) {
      toast.error(response.error);
    }
  };

  return (
    <form
      action={handleFormSubmitAction}
      className="h-full flex flex-col"
      {...getFormProps(form)}
    >
      <div>
        <CsrfTokenField />
        <HoneypotField />
        <FormField>
          <FormLabel htmlFor={fields.title.id}>Title</FormLabel>
          <Input autoFocus {...titleProps} />
          <FormMessages
            errors={fields.title.errors}
            id={fields.title.errorId}
          />
        </FormField>
        <FormField>
          <FormLabel htmlFor={fields.content.id}>Content</FormLabel>
          <Textarea rows={10} {...contentProps} />
          <FormMessages
            errors={fields.content.errors}
            id={fields.content.errorId}
          />
        </FormField>
        {imagesList.map((imageField, index) => (
          <div key={imageField.key} className="mb-5 relative">
            <FileUploader config={imageField} />
            <Button
              type="button"
              onClick={() => form.remove({ name: fields.images.name, index })}
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 rounded-full w-7 h-7"
            >
              <span className="sr-only">Delete Image {index + 1}</span>
              <span aria-hidden>
                <X />
              </span>
            </Button>
            <hr className="my-4 border border-input" />
          </div>
        ))}
        <div className="text-center">
          <Button
            type="button"
            onClick={() =>
              form.insert({ name: fields.images.name, defaultValue: {} })
            }
            variant="secondary"
          >
            <Plus /> Add image
          </Button>
        </div>
      </div>
      <div className="mt-auto pt-4">
        <div className="flex justify-end gap-4">
          <Button type="reset" variant="destructive">
            Reset
          </Button>
          <SubmitBtn>Submit</SubmitBtn>
        </div>
      </div>
    </form>
  );
}

export default NoteEditForm;
