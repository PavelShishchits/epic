"use client";
import { useEffect, useRef, useId } from "react";
import { editNoteAction } from "@/actions/noteActions";
import { useFormState } from "react-dom";
import { Note } from "@/domain/note";
import SubmitBtn from "@/components/SubmitBtn/SubmitBtn";
import ErrorList from "@/components/ErrorList/ErrorList";

interface NoteEditFormProps {
  note: Note;
  noteId: string;
  userId: string;
}

const initialState = {
  errors: {
    title: [],
    content: [],
  },
};

function NoteEditForm(props: NoteEditFormProps) {
  const { note, noteId, userId } = props;

  const boundEditNoteAction = editNoteAction.bind(null, {
    noteId: noteId,
    userId: userId,
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(boundEditNoteAction, initialState);
  
  const titleHasErrors = Boolean(state.errors.title?.length);
  const contentHasErrors = Boolean(state.errors.content?.length);
  const titleErrorId = useId();
  const contentErrorId = useId();

  useEffect(() => {
    if (!formRef.current) return;
    if (Object.keys(state.errors).length === 0) return;

    const firstInvalidElement = formRef.current.querySelector('[aria-invalid="true"]');
    if (firstInvalidElement && firstInvalidElement instanceof HTMLElement) {
      firstInvalidElement.focus();
    }
    
  }, [state.errors]);

  return (
    <form ref={formRef} noValidate action={formAction} className="h-full flex flex-col">
      <div>
        <div className="mb-5">
          <label className="flex flex-col gap-2 mb-2">
            <span>Title</span>
            <input
              className="border-2 border-blue-200 py-3 px-4 rounded"
              type="text"
              name="title"
              defaultValue={note.title}
              aria-invalid={titleHasErrors || undefined}
              aria-describedby={titleHasErrors ? titleErrorId : undefined}
              autoFocus              
              required
            />
          </label>
          <ErrorList errors={state.errors.title} id={titleErrorId} />        
        </div>
        <div className="mb-5">
          <label className="flex flex-col gap-2 mb-2">
            <span>Content</span>
            <textarea
              className="border-2 border-blue-200 py-3 px-4 rounded resize-none"
              name="content"
              defaultValue={note.content}
              rows={10}
              aria-invalid={contentHasErrors || undefined}
              aria-describedby={contentHasErrors ? contentErrorId : undefined}
              required
            ></textarea>
          </label>
          <ErrorList errors={state.errors.content} id={contentErrorId} />    
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
