import { getServerSession } from "next-auth";
import Link from "next/link";

import { authOptions } from "~/server/auth";
import { getUserSubDomains } from "~/server/queries";

import { ExternalLink } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/Label";
import { Button } from "~/components/ui/button";

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
    <main className="mx-4 mt-6 flex flex-col items-center justify-center gap-6 md:mx-[200px] md:mt-10 lg:mx-[300px] xl:mx-[400px] 2xl:mx-[600px]">
      <CreateSubdomainForm sessionId={session.user.id} />
      <section className="flex w-full flex-col items-center justify-center overflow-y-auto">
        <p className="w-full pb-1 text-start text-sm font-semibold">
          You have {subDomains.length}/5 Subdomains
        </p>
        {subDomains.map((subDomain) => (
          <div
            className="flex w-full flex-col gap-2 rounded border p-4"
            key={subDomain.id}
          >
            <div className="flex w-full justify-between gap-2">
              <Input
                className="text-center text-lg font-semibold"
                value={subDomain.subdomain + ".catway.org"}
                readOnly
              />
              <Link
                href={`https://${subDomain.subdomain}.catway.org`}
                target="_blank"
              >
                <Button>
                  <ExternalLink />
                </Button>
              </Link>
            </div>
            <div className="flex w-full justify-between gap-2">
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
