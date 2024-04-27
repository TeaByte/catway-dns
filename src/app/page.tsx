import Link from "next/link";

import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth";

import {
  createUserSubDomain,
  updateUserSubDomain,
  deleteUserSubDomain,
} from "~/server/apis";
import { getUserSubDomains } from "~/server/queries";
import { SessionContext } from "next-auth/react";
import { RecordType } from "~/server/cloudflare/types";
const session = await getServerSession(authOptions);

export default async function HomePage() {
  async function testa(formData: FormData) {
    "use server";

    const rawFormData = {
      record: formData.get("record"),
      subdomain: formData.get("subdomain"),
      content: formData.get("content"),
    };

    const subdomain = rawFormData.subdomain?.toString();
    const record = rawFormData.record?.toString() as RecordType;
    const content = rawFormData.content?.toString();

    if (!record || !subdomain || !content) {
      return;
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return;
    }

    await createUserSubDomain(subdomain, record, content, session.user.id);
  }

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
      <form action={testa}>
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
          <option value="MX">MX</option>
          <option value="NS">NS</option>
          <option value="TXT">TXT</option>
        </select>

        <label htmlFor="content">Content</label>
        <input type="text" name="content" id="content" placeholder="content" />

        <button type="submit">Submit</button>
      </form>
      {subDomains.map((subDomain) => (
        <div key={subDomain.id}>
          {subDomain.subdomain}
          <button
          // onClick={async () => {
          //   // await deleteUserSubDomain(subDomain.id);
          // }}
          >
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}
