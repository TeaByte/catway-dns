import * as qr from "./queries";
import * as cf from "./cloudflare/apis";
import type { RecordType } from "./cloudflare/types";

export async function createUserSubDomain(
  subdomain: string,
  record: RecordType,
  content: string,
  userId: string,
  proxied: boolean,
) {
  const userSubDomainsCount = await qr.getUserSubDomainsCount(userId);
  const user = await qr.getUser(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (userSubDomainsCount >= user.maxDomains) {
    throw new Error("Maximum number of subdomains reached");
  }

  const cfResponse = await cf.registerCloudflareDNS(
    record,
    subdomain,
    content,
    proxied,
  );
  if (!cfResponse.success) {
    if (cfResponse.errors) {
      throw new Error(cfResponse.errors[0]?.message);
    } else {
      throw new Error(cf.UNKNOWN_ERROR[0]?.message);
    }
  } else {
    if (!cfResponse.result?.id) {
      throw new Error(cf.UNKNOWN_ERROR[0]?.message);
    }

    const cloudflareId = cfResponse.result.id;
    return await qr.__createUserSubDomain(
      subdomain,
      record,
      content,
      cloudflareId,
      userId,
      proxied,
    );
  }
}

export async function updateUserSubDomain(
  content: string,
  record: RecordType,
  subDomainId: string,
  ownerId: string,
  proxied: boolean,
) {
  const subDomainData = await qr.getSubDomainById(subDomainId);

  if (!subDomainData) {
    throw new Error("Subdomain not found");
  }

  if (subDomainData.ownerId !== ownerId) {
    throw new Error("Unauthorized: You are not the owner of this subdomain");
  }

  const cfResponse = await cf.editCloudflareDNS(
    subDomainData.id,
    record,
    subDomainData.subdomain,
    content,
    proxied,
  );

  if (!cfResponse.success) {
    if (cfResponse.errors) {
      throw new Error(cfResponse.errors[0]?.message);
    } else {
      throw new Error(cf.UNKNOWN_ERROR[0]?.message);
    }
  } else {
    return await qr.__updateUserSubDomain(
      content,
      record,
      subDomainId,
      proxied,
    );
  }
}

export async function deleteUserSubDomain(
  subDomainId: string,
  ownerId: string,
) {
  const subDomainData = await qr.getSubDomainById(subDomainId);

  if (!subDomainData) {
    throw new Error("Subdomain not found");
  }

  if (subDomainData.ownerId !== ownerId) {
    throw new Error("Unauthorized: You are not the owner of this subdomain");
  }

  const cfResponse = await cf.deleteCloudflareDNS(subDomainData.id);
  if (!cfResponse.success) {
    if (cfResponse.errors) {
      throw new Error(cfResponse.errors[0]?.message);
    } else {
      throw new Error(cf.UNKNOWN_ERROR[0]?.message);
    }
  } else {
    return await qr.__deleteUserSubDomain(subDomainId);
  }
}
