import Link from 'next/link';

import Typography from '@/app/_components/ui/Typography/Typography';

export default async function NotFound() {
  return (
    <div>
      <Typography variant={'h2'} tag="h2">
        Not Found
      </Typography>
      <Typography variant="p" tag="p">
        Could not find requested resource
      </Typography>
      <Link href="/">Return Home</Link>
    </div>
  );
}
