"use client";
import { editNoteAction } from "@/application/useCases/noteUseCase";
import { useFormState } from "react-dom";
import { useForm, getFormProps, getInputProps, getTextareaProps } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Note } from "@/domain/note";
import SubmitBtn from "@/components/SubmitBtn/SubmitBtn";
import ErrorList from "@/components/ErrorList/ErrorList";
import FileUploader from "@/components/FileUploader/FileUploader"
import { noteEditSchema } from "@/schema/note";

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
    id: "note-edit-form",
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
      images: note.images.length > 0 ? note.images : [{}]
    },
    shouldValidate: 'onInput',
    shouldRevalidate: 'onInput',
  });

  const {key: titleKey, ...titleProps} = getInputProps(fields.title, { type: "text"});
  const {key: contentKey, ...contentProps} = getTextareaProps(fields.content);  

  const imagesList = fields.images.getFieldList();

  return (
    <form action={formAction} className="h-full flex flex-col" {...getFormProps(form)}>
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
          <label htmlFor={fields.content.id} className="flex flex-col gap-2 mb-2">
            <span>Content</span>
            <textarea
              className="border-2 border-blue-200 py-3 px-4 rounded resize-none"
              rows={10}
              {...contentProps}
            ></textarea>
          </label>
          <ErrorList errors={fields.content.errors} id={fields.content.errorId} />
        </div>
        {imagesList.map((imageField, index) => (
          <div key={imageField.key} className="mb-5 relative">
            <button 
              type="button" 
              onClick={() => form.remove({ name: fields.images.name, index })}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
            >
              <span className="sr-only">Delete Image {index + 1}</span>
              <span aria-hidden>×</span>
            </button>
            <FileUploader config={imageField} />
            <hr className="border-2 my-4 border-blue-200" />
          </div>
        ))}
        <div className="text-center">
          <button type="button" onClick={() => form.insert({ name: fields.images.name, defaultValue: {} })}>+ Add image</button>
        </div>
      </div>
      <div className="mt-auto pt-4">
        <div className="flex justify-end gap-4">
          <button type="reset">Reset</button>
          <SubmitBtn>Submit</SubmitBtn>
        </div>
      </div>
    </form>
  );
}

export default NoteEditForm;
