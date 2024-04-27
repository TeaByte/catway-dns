import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth";

import {
  addSubDomain,
  deleteSubDomain,
  updateSubDomain,
} from "~/app/_actions/actions";
import { getUserSubDomains } from "~/server/queries";

import {
  createUserSubDomain,
  updateUserSubDomain,
  deleteUserSubDomain,
} from "~/server/apis";
import { FormLoadingButton } from "~/components/form-loading-button";

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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <form action={addSubDomain}>
        <label htmlFor="subdomain">Subdomain</label>
        <input
          type="text"
          name="subdomain"
          id="subdomain"
          placeholder="subdomain"
        />

        <label htmlFor="record">Record</label>
        <select name="record" id="record">
          <option value="A">A</option>
          <option value="AAAA">AAAA</option>
          <option value="CNAME">CNAME</option>
        </select>

        <label htmlFor="content">Content</label>
        <input type="text" name="content" id="content" placeholder="content" />

        <FormLoadingButton>Create</FormLoadingButton>
      </form>
      <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        {subDomains.map((subDomain) => (
          <div className="flex flex-col" key={subDomain.id}>
            {subDomain.subdomain}
            <form action={deleteSubDomain}>
              <input type="hidden" name="subdomainid" value={subDomain.id} />
              <input
                type="hidden"
                name="sessionuserid"
                value={session.user.id}
              />
              <FormLoadingButton>Delete</FormLoadingButton>
            </form>
            <form action={updateSubDomain}>
              <input type="hidden" name="subdomainid" value={subDomain.id} />
              <input
                type="hidden"
                name="sessionuserid"
                value={session.user.id}
              />
              <input
                type=""
                name="record"
                className="text-black"
                defaultValue={subDomain.record}
              />
              <input
                type=""
                name="content"
                className="text-black"
                defaultValue={subDomain.content}
              />

              <FormLoadingButton>Update</FormLoadingButton>
            </form>
          </div>
        ))}
      </section>
    </main>
  );
}
