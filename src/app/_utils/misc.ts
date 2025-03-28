const getUserImageSrc = (id?: string | null) => {
  return id ? `/api/resources/user-images?id=${id}` : '/images/user.png';
};

const getNoteImageSrc = (id: string) => {
  if (!id) return '';
  return `/api/resources/note-images?id=${id}`;
};

export { getUserImageSrc, getNoteImageSrc };
