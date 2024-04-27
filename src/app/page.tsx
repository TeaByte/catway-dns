import Link from "next/link";

import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {/* {session?.user.name ?? "Not logged in"} */}
      {/* <LoginButton /> */}
    </main>
  );
}
