export interface CloudflareError {
  code: number;
  message: string;
}

export interface CloudflareMeta {
  auto_added: boolean;
  managed_by_apps: boolean;
  managed_by_argo_tunnel: boolean;
  source: string;
}

export interface CloudflareDNSRecord {
  id: string;
  zone_id: string;
  zone_name: string;
  name: string;
  type: string;
  content: string;
  proxiable: boolean;
  proxied: boolean;
  ttl: number;
  locked: boolean;
  meta: CloudflareMeta;
  comment: null | string;
  tags: string[];
  created_on: string;
  modified_on: string;
}

export interface CloudflareAPIResponse {
  result?: CloudflareDNSRecord;
  success: boolean;
  errors?: CloudflareError[];
  messages?: string[];
}

export type RecordType = "AAAA" | "A" | "CNAME";
