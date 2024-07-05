import { cookies, headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookiesStore = cookies();
  const headersStore = headers();
  console.log(cookiesStore.getAll());
  console.log(headersStore.get("Connection"));

  return new Response("OK", {
    status: 200,
    headers: { "Set-Cookie": `token=${Math.random()}` },
  });
}