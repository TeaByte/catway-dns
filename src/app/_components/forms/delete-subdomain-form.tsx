import { deleteSubDomain } from "~/app/_actions/actions";

import { FormLoadingButton } from "~/components/form-loading-button";

export default function DeleteSubdomainForm({
  sessionId,
  subDomainId,
}: {
  sessionId: string;
  subDomainId: string;
}) {
  return (
    <form action={deleteSubDomain}>
      <input type="hidden" name="subdomainid" value={subDomainId} />
      <input type="hidden" name="sessionuserid" value={sessionId} />
      <FormLoadingButton>Delete</FormLoadingButton>
    </form>
  );
}
