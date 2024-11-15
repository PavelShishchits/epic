import Link from "next/link";
import Typography from '@/components/ui/Typography/Typography';

export default function Home() {
  return (
    <>
      <Typography tag="h1" variant="h1">Home page</Typography>
      <div className="font-family-bold">Bold font text</div>
      <div className="font-family-medium">Medium font text</div>
      <div className="font-family-regular">Regular font text</div>

      <Link href="/users">Link to users</Link>
    </>
  );
}
