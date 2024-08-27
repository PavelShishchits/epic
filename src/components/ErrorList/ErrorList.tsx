type ErrorListProps = {
  errors: string[] | null | undefined;
  id?: string;
}

function ErrorList({ errors, id }: ErrorListProps) {
  return errors?.length ? (
    <ul className="text-red-500 flex flex-col gap-2" id={id}>
      {errors.map((error: string) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  ) : null;
}

export default ErrorList;