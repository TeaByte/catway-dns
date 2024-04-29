"use client";

import { deleteSubDomain } from "~/app/_actions/actions";
import { toastErrorConfig } from "./toast-error";

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
      toast.error(result.error, toastErrorConfig);
    }
  }

  return (
    <form action={clientAction} className="w-full">
      <input type="hidden" name="subdomainid" value={subDomainId} />
      <input type="hidden" name="sessionuserid" value={sessionId} />
      <FormLoadingButton variant="destructive" text="Delete" />
    </form>
  );
}
