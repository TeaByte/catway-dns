import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RecordType } from "~/server/cloudflare/types";
import {
  createUserSubDomain,
  updateUserSubDomain,
  deleteUserSubDomain,
} from "~/server/apis";

import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth";

export async function addSubDomain(formData: FormData) {
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
    throw new Error("Invalid form data");
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  await createUserSubDomain(subdomain, record, content, session.user.id);
  revalidatePath("/");
  redirect("/");
}

export async function updateSubDomain(formData: FormData) {
  "use server";

  const rawFormData = {
    subDomainId: formData.get("subdomainid"),
    sessionUserId: formData.get("sessionuserid"),
    record: formData.get("record"),
    content: formData.get("content"),
  };

  const subDomainId = rawFormData.subDomainId?.toString();
  const sessionUserId = rawFormData.sessionUserId?.toString();
  const record = rawFormData.record?.toString();
  const content = rawFormData.content?.toString();

  if (!subDomainId || !sessionUserId || !record || !content) {
    throw new Error("Invalid form data");
  }

  if (record !== "A" && record !== "AAAA" && record !== "CNAME") {
    throw new Error("Invalid record type");
  }

  await updateUserSubDomain(content, record, subDomainId, sessionUserId);
  revalidatePath("/");
}

export async function deleteSubDomain(formData: FormData) {
  "use server";

  const rawFormData = {
    subDomainId: formData.get("subdomainid"),
    sessionUserId: formData.get("sessionuserid"),
  };

  const subDomainId = rawFormData.subDomainId?.toString();
  const sessionUserId = rawFormData.sessionUserId?.toString();

  if (!subDomainId || !sessionUserId) {
    throw new Error("Invalid form data");
  }

  await deleteUserSubDomain(subDomainId, sessionUserId);
  redirect("/");
}