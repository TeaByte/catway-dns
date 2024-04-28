import "server-only";

import { db } from "~/server/db";

export async function getUserSubDomains(userId: string) {
  const subdomains = await db.subDomain.findMany({
    where: {
      owner: {
        id: userId,
      },
    },
  });

  return subdomains;
}

export async function getUser(userId: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
}

export async function getUserSubDomainsCount(userId: string) {
  const count = await db.subDomain.count({
    where: {
      ownerId: userId,
    },
  });

  return count;
}

export async function getSubDomainById(subDomainId: string) {
  const subDomain = await db.subDomain.findUnique({
    where: {
      id: subDomainId,
    },
  });

  return subDomain;
}

export async function __createUserSubDomain(
  subdomain: string,
  record: string,
  content: string,
  cloudflareId: string,
  userId: string,
  isProxied: boolean,
) {
  return await db.subDomain.create({
    data: {
      content,
      record,
      id: cloudflareId,
      subdomain,
      ownerId: userId,
      isProxied,
    },
  });
}

export async function __updateUserSubDomain(
  content: string,
  record: string,
  subDomainId: string,
  isProxied: boolean,
) {
  return await db.subDomain.update({
    where: {
      id: subDomainId,
    },
    data: {
      content,
      record,
      isProxied,
    },
  });
}

export async function __deleteUserSubDomain(subDomainId: string) {
  return await db.subDomain.delete({
    where: {
      id: subDomainId,
    },
  });
}
