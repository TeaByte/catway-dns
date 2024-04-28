import { getServerSession } from "next-auth";
import Link from "next/link";

import { authOptions } from "~/server/auth";
import { getUserSubDomains } from "~/server/queries";

import { Input } from "~/components/ui/input";
import CreateSubdomainForm from "./_components/forms/create-subdomain-form";
import DeleteSubdomainForm from "./_components/forms/delete-subdomain-form";
import UpdateSubdomainForm from "./_components/forms/update-subdomain-from";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <Link href="/login">Login</Link>
      </main>
    );
  }

  const subDomains = await getUserSubDomains(session.user.id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <CreateSubdomainForm sessionId={session.user.id} />
      <section className="flex w-full flex-col items-center justify-center">
        {subDomains.map((subDomain) => (
          <div className="flex flex-col" key={subDomain.id}>
            <Input value={subDomain.subdomain} />
            <div className="flex justify-between">
              <UpdateSubdomainForm
                subDomainId={subDomain.id}
                content={subDomain.content}
                record={subDomain.record}
                sessionId={session.user.id}
              />
              <DeleteSubdomainForm
                subDomainId={subDomain.id}
                sessionId={session.user.id}
              />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
