import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RecordType } from "~/server/cloudflare/types";

import {
  createUserSubDomain,
  updateUserSubDomain,
  deleteUserSubDomain,
} from "~/server/apis";

export async function addSubDomain(formData: FormData) {
  "use server";

  const rawFormData = {
    sessionUserId: formData.get("sessionuserid"),
    record: formData.get("record"),
    subdomain: formData.get("subdomain"),
    content: formData.get("content"),
  };

  const sessionUserId = rawFormData.sessionUserId?.toString();
  const subdomain = rawFormData.subdomain?.toString();
  const record = rawFormData.record?.toString() as RecordType;
  const content = rawFormData.content?.toString();

  if (!sessionUserId || !record || !subdomain || !content) {
    throw new Error("Invalid form data");
  }

  await createUserSubDomain(subdomain, record, content, sessionUserId);
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

  await new Promise((resolve) => setTimeout(resolve, 3000));
  await deleteUserSubDomain(subDomainId, sessionUserId);
  redirect("/");
}
