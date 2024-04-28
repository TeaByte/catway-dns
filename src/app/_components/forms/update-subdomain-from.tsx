"use client";

import { updateSubDomain } from "~/app/_actions/actions";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/Label";
import { FormLoadingButton } from "~/components/form-loading-button";
import { toast } from "sonner";

export default function UpdateSubdomainForm({
  sessionId,
  subDomainId,
  record,
  content,
}: {
  sessionId: string;
  subDomainId: string;
  record: string;
  content: string;
}) {
  async function clientAction(formData: FormData) {
    const result = await updateSubDomain(formData);
    if (result?.error) {
      toast.error(result.error, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }

  return (
    <form action={clientAction}>
      <Label htmlFor="subdomain">Subdomain</Label>
      <Input type="text" name="record" id="record" defaultValue={record} />
      <Label htmlFor="record">Record</Label>
      <Input type="text" name="content" id="content" defaultValue={content} />
      <input type="hidden" name="subdomainid" value={subDomainId} />
      <input type="hidden" name="sessionuserid" value={sessionId} />
      <FormLoadingButton>Update</FormLoadingButton>
    </form>
  );
}
