'use client';
import { editNoteAction } from '@/application/useCases/noteUseCase';
import { useFormState } from 'react-dom';
import {
  useForm,
  getFormProps,
  getInputProps,
  getTextareaProps,
} from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { Note } from '@/domain/note';
import SubmitBtn from '@/components/SubmitBtn/SubmitBtn';
import Button from '@/components/ui/Button/Button';
import ErrorList from '@/components/ErrorList/ErrorList';
import FileUploader from '@/components/FileUploader/FileUploader';
import { noteEditSchema } from '@/schema/note';
import { X, Plus } from 'lucide-react';

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

  const [state, formAction] = useFormState(boundEditNoteAction, undefined);

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
      images: note.images.length > 0 ? note.images : [{}],
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
        <div className="mb-5">
          <label htmlFor={fields.title.id} className="flex flex-col gap-2 mb-2">
            <span>Title</span>
            <input
              className="border-2 border-blue-200 py-3 px-4 rounded"
              autoFocus
              {...titleProps}
            />
          </label>
          <ErrorList errors={fields.title.errors} id={fields.title.errorId} />
        </div>
        <div className="mb-5">
          <label
            htmlFor={fields.content.id}
            className="flex flex-col gap-2 mb-2"
          >
            <span>Content</span>
            <textarea
              className="border-2 border-blue-200 py-3 px-4 rounded resize-none"
              rows={10}
              {...contentProps}
            ></textarea>
          </label>
          <ErrorList
            errors={fields.content.errors}
            id={fields.content.errorId}
          />
        </div>
        {imagesList.map((imageField, index) => (
          <div key={imageField.key} className="mb-5 relative">
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
            <FileUploader config={imageField} />
            <hr className="border-2 my-4 border-blue-200" />
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
