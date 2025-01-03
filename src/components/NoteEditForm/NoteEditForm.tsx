'use client';
import { editNoteAction } from '@/application/useCases/noteUseCase';
import { useActionState } from 'react';
import {
  useForm,
  getFormProps,
  getInputProps,
  getTextareaProps,
} from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { Note } from '@/domain/note';
import Button from '@/components/ui/Button/Button';
import FileUploader from '@/components/FileUploader/FileUploader';
import { noteEditSchema } from '@/schema/note';
import { X, Plus } from 'lucide-react';
import {
  FormField,
  FormLabel,
  FormMessages,
  HoneypotField,
  Input,
  Textarea,
  CsrfTokenField,
  SubmitBtn,
} from '@/components/ui/Form/index';

interface NoteEditFormProps {
  note: Note;
  noteId: string;
  userId: string;
}

function NoteEditForm(props: NoteEditFormProps) {
  const { note, noteId, userId } = props;

  const boundEditNoteAction = editNoteAction.bind(null, {
    noteId: noteId,
    userId: userId,
  });

  const [state, formAction] = useActionState(boundEditNoteAction, undefined);

  const noteImages = note.images || [];

  const [form, fields] = useForm({
    id: 'note-edit-form',
    constraint: getZodConstraint(noteEditSchema),
    lastResult: state,
    onValidate(context) {
      return parseWithZod(context.formData, {
        schema: noteEditSchema,
      });
    },
    defaultValue: {
      title: note.title,
      content: note.content,
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

  return (
    <form
      action={formAction}
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
