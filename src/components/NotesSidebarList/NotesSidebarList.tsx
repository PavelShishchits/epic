import { db } from '@/infrastructure/db/db.server';
import NavLink from '@/components/NavLink/NavLink';

interface NotesSidebarListProps {
  userName: string;
}

async function NoteSidebarList({ userName }: NotesSidebarListProps) {
  const notes = db.note.findMany({
    where: {
      owner: {
        username: {
          equals: userName,
        },
      },
    },
  });

  return (
    <ul>
      {notes?.map((note) => (
        <li key={note.id} className="mb-2">
          <NavLink href={`/users/${userName}/notes/${note.id}`} scroll={false}>
            {note.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default NoteSidebarList;
