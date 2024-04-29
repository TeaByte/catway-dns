import { getServerSession } from "next-auth";
import Link from "next/link";

import { authOptions } from "~/server/auth";
import { getUserSubDomains, getUser } from "~/server/queries";

import { ExternalLink, Database, Info } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import LandingPage from "./_components/landing-page";

import CreateSubdomainForm from "./_components/forms/create-subdomain-form";
import DeleteSubdomainForm from "./_components/forms/delete-subdomain-form";
import UpdateSubdomainForm from "./_components/forms/update-subdomain-from";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LandingPage />;
  }

  const user = await getUser(session.user.id);
  const subDomains = await getUserSubDomains(session.user.id);

  return (
    <main className="mx-4 mt-6 flex flex-col items-center justify-center gap-6 md:mx-[200px] md:mt-10 lg:mx-[300px] xl:mx-[400px] 2xl:mx-[600px]">
      <CreateSubdomainForm sessionId={session.user.id} />
      <section className="mb-14 flex w-full flex-col items-center justify-center gap-2 overflow-y-auto">
        <p className="flex w-full items-center gap-1 text-start text-sm font-semibold">
          <Info className="h-4 w-4" />
          You have ( {subDomains.length}/{user?.maxDomains} ) subdomains.
        </p>
        {subDomains.length > 0 ? (
          subDomains.map((subDomain) => (
            <div
              className="flex w-full flex-col gap-2 rounded border p-4"
              key={subDomain.id}
            >
              <div className="flex w-full justify-between gap-2">
                <Input
                  className="text-shadow-lg truncate text-center text-lg font-semibold subpixel-antialiased opacity-60"
                  value={subDomain.subdomain + ".catway.org"}
                  readOnly
                />
                <Link
                  title={`Open ${subDomain.subdomain}.catway.org`}
                  href={`https://${subDomain.subdomain}.catway.org`}
                  target="_blank"
                >
                  <Button>
                    <ExternalLink className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="flex w-full justify-between gap-2">
                <UpdateSubdomainForm
                  subDomainId={subDomain.id}
                  content={subDomain.content}
                  record={subDomain.record}
                  sessionId={session.user.id}
                  isProxied={subDomain.isProxied}
                />
                <DeleteSubdomainForm
                  subDomainId={subDomain.id}
                  sessionId={session.user.id}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-2 rounded border p-4">
            <Database className="h-14 w-14" />
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-xl font-bold">No subdomains found</p>
              <p className="text-sm">Create one from the section above</p>
            </div>
          </div>
        )}
        {subDomains.length === user?.maxDomains && (
          <p className="w-full text-center text-sm font-semibold">
            You{"'"}ve hit the subdomain limit.
            <br /> Remove one to add more or reach out at{" "}
            <Link
              title="telegram - t.me/TeaByte"
              className="underline"
              href="https://t.me/TeaByte"
              target="_blank"
            >
              t.me/TeaByte
            </Link>
          </p>
        )}
      </section>
    </main>
  );
}
