import axios, { AxiosError, AxiosResponse } from "axios";
import { CloudflareAPIResponse, CloudflareError, RecordType } from "./types";

export const UNKNOWN_ERROR = [{ code: 400, message: "Unknown Error" }];

const BASE_API = `https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records`;
const BASE_HEADERS = {
  Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
  "Content-Type": "application/json",
};

const handleAxiosError = (error: AxiosError): CloudflareError[] => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const { data, status } = error.response;
      return (data as CloudflareAPIResponse).errors ?? UNKNOWN_ERROR;
    } else if (error.request) {
      return [{ code: 500, message: "Request Error" }];
    }
  }
  return [{ code: 500, message: "Unknown Error" }];
};

export const registerCloudflareDNS = async (
  record: RecordType,
  subdomain: string,
  ip: string,
  proxied: boolean,
) => {
  try {
    const response: AxiosResponse = await axios.post(
      BASE_API,
      {
        type: record,
        name: subdomain,
        content: ip,
        ttl: 1,
        proxied,
      },
      {
        headers: BASE_HEADERS,
      },
    );
    return response.data as CloudflareAPIResponse;
  } catch (error) {
    return { success: false, errors: handleAxiosError(error as AxiosError) };
  }
};

export const editCloudflareDNS = async (
  subDomainId: string,
  record: RecordType,
  subdomain: string,
  ip: string,
  proxied: boolean,
) => {
  try {
    const response: AxiosResponse = await axios.put(
      `${BASE_API}/${subDomainId}`,
      {
        type: record,
        name: subdomain,
        content: ip,
        ttl: 1,
        proxied,
      },
      {
        headers: BASE_HEADERS,
      },
    );
    return response.data as CloudflareAPIResponse;
  } catch (error) {
    return { success: false, errors: handleAxiosError(error as AxiosError) };
  }
};

export const deleteCloudflareDNS = async (subDomainId: string) => {
  try {
    const response: AxiosResponse = await axios.delete(
      `${BASE_API}/${subDomainId}`,
      {
        headers: BASE_HEADERS,
      },
    );
    return response.data as CloudflareAPIResponse;
  } catch (error) {
    return { success: false, errors: handleAxiosError(error as AxiosError) };
  }
};
