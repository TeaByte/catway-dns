"use client";

import { deleteSubDomain } from "~/app/_actions/actions";

import { FormLoadingButton } from "~/components/form-loading-button";
import { toast } from "sonner";

export default function DeleteSubdomainForm({
  sessionId,
  subDomainId,
}: {
  sessionId: string;
  subDomainId: string;
}) {
  async function clientAction(formData: FormData) {
    const result = await deleteSubDomain(formData);
    if (result?.error) {
      toast.error(result.error, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }

  return (
    <form action={clientAction}>
      <input type="hidden" name="subdomainid" value={subDomainId} />
      <input type="hidden" name="sessionuserid" value={sessionId} />
      <FormLoadingButton>Delete</FormLoadingButton>
    </form>
  );
}
