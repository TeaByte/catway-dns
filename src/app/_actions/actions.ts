"use server";

import { redirect } from "next/navigation";
import { type RecordType, isValidRecord } from "~/server/cloudflare/types";

import {
  createUserSubDomain,
  updateUserSubDomain,
  deleteUserSubDomain,
} from "~/server/apis";

export async function addSubDomain(formData: FormData) {
  const rawFormData = {
    sessionUserId: formData.get("sessionuserid"),
    record: formData.get("record"),
    subdomain: formData.get("subdomain"),
    content: formData.get("content"),
    proxied: formData.get("proxied"),
  };

  const sessionUserId = rawFormData.sessionUserId?.toString();
  const subdomain = rawFormData.subdomain?.toString();
  const record = rawFormData.record?.toString() as RecordType;
  const content = rawFormData.content?.toString();
  const proxied = rawFormData.proxied?.toString() === "on";

  if (!sessionUserId || !record || !subdomain || !content) {
    return {
      error: "Invalid form data",
    };
  }

  if (!isValidRecord(record)) {
    return {
      error: "Invalid record type",
    };
  }

  try {
    await createUserSubDomain(
      subdomain,
      record,
      content,
      sessionUserId,
      proxied,
    );
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }

  redirect("/");
}

export async function updateSubDomain(formData: FormData) {
  const rawFormData = {
    subDomainId: formData.get("subdomainid"),
    sessionUserId: formData.get("sessionuserid"),
    record: formData.get("record"),
    content: formData.get("content"),
    proxied: formData.get("proxied"),
  };

  const subDomainId = rawFormData.subDomainId?.toString();
  const sessionUserId = rawFormData.sessionUserId?.toString();
  const record = rawFormData.record?.toString() as RecordType;
  const content = rawFormData.content?.toString();
  const proxied = rawFormData.proxied?.toString() === "on";

  if (!subDomainId || !sessionUserId || !record || !content) {
    return {
      error: "Invalid form data",
    };
  }

  if (!isValidRecord(record)) {
    return {
      error: "Invalid record type",
    };
  }

  try {
    await updateUserSubDomain(
      content,
      record,
      subDomainId,
      sessionUserId,
      proxied,
    );
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }

  redirect("/");
}

export async function deleteSubDomain(formData: FormData) {
  const rawFormData = {
    subDomainId: formData.get("subdomainid"),
    sessionUserId: formData.get("sessionuserid"),
  };

  const subDomainId = rawFormData.subDomainId?.toString();
  const sessionUserId = rawFormData.sessionUserId?.toString();

  if (!subDomainId || !sessionUserId) {
    return {
      error: "Invalid form data",
    };
  }

  try {
    await deleteUserSubDomain(subDomainId, sessionUserId);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }

  redirect("/");
}
