import { updateSubDomain } from "~/app/_actions/actions";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/Label";
import { FormLoadingButton } from "~/components/form-loading-button";

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
  return (
    <form action={updateSubDomain}>
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
