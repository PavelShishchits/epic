export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  owner: NoteUser;
  images: NoteImages;
};

export type NoteUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt: string;
  notes: Note[];
};

export type NoteImages = NoteImage[];

type NoteImage = {
  altText: string;
  contentType: string;
  filepath: string;
  id: string;
};
