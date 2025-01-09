import NavLink from '@/app/_components/NavLink/NavLink';

type SidebarNote = {
  id: string;
  title: string;
};

interface NotesSidebarListProps {
  userName: string;
  notes?: SidebarNote[];
}

async function NoteSidebarList({
  userName,
  notes = [],
}: NotesSidebarListProps) {
  const hasNotes = notes?.length > 0;

  return (
    <div>
      {!hasNotes && <p>This user has no notes yet.</p>}
      {hasNotes && (
        <ul className="overflow-y-auto overflow-x-hidden pb-12">
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
