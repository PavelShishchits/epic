import { PlusIcon } from 'lucide-react';

import { getAuthenticatedUserCached } from '@/app/_cached/get-authenticated-user.cached';
import NavLink from '@/app/_components/NavLink/NavLink';

type SidebarNote = {
  id: string;
  title: string;
};

interface NotesSidebarListProps {
  userId: string;
  userName: string;
  notes?: SidebarNote[];
}

async function NoteSidebarList({
  userId,
  userName,
  notes = [],
}: NotesSidebarListProps) {
  const hasNotes = notes?.length > 0;

  const authenticatedUser = await getAuthenticatedUserCached();

  const isAuthenticatedUser = userId === authenticatedUser?.id;

  return (
    <div>
      {!hasNotes && <p>This user has no notes yet.</p>}
      {hasNotes && (
        <ul className="overflow-y-auto overflow-x-hidden pb-12">
          {isAuthenticatedUser ? (
            <li key="add-new-note" className="p-1 pr-0">
              <NavLink
                className="inline-flex items-center gap-1"
                href={`/users/${userName}/notes/new`}
                scroll={false}
              >
                <PlusIcon />
                <span>Add new</span>
              </NavLink>
            </li>
          ) : null}
          {notes.map((note) => (
            <li key={note.id} className="p-1 pr-0">
              <NavLink
                href={`/users/${userName}/notes/${note.id}`}
                scroll={false}
              >
                {note.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NoteSidebarList;
