import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="font-family-bold">Bold font text</div>
      <div className="font-family-medium">Medium font text</div>
      <div className="font-family-regular">Regular font text</div>

      <Link href="/users">Link to users</Link>
    </>
  );
}
