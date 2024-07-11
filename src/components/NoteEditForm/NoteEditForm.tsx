"use client";
import { editNoteAction } from "@/actions/noteActions";
import { useFormState } from "react-dom";
import { Note } from "@/domain/note";
import SubmitBtn from "@/components/SubmitBtn/SubmitBtn";

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

  const [state, formAction] = useFormState(boundEditNoteAction, initialState);

  return (
    <form action={formAction} className="h-full flex flex-col">
      <div>
        <label className="flex flex-col gap-2 mb-5">
          <span>Title</span>
          <input
            className="border-2 border-blue-200 py-3 px-4 rounded"
            type="text"
            name="title"
            defaultValue={note.title}
            required
          />
          {state.errors.title?.map((error: string) => (
            <p className="text-red-500" key={error}>
              {error}
            </p>
          ))}
        </label>
        <label className="flex flex-col gap-2 mb-5">
          <span>Content</span>
          <textarea
            className="border-2 border-blue-200 py-3 px-4 rounded resize-none"
            name="content"
            defaultValue={note.content}
            rows={10}
          ></textarea>
          {state.errors.content?.map((error: string) => (
            <p className="text-red-500" key={error}>
              {error}
            </p>
          ))}
        </label>
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
