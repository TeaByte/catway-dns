"use client";

import { updateSubDomain } from "~/app/_actions/actions";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/Label";
import { FormLoadingButton } from "~/components/form-loading-button";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Edit Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={clientAction} className="grid gap-3 py-4">
          <div>
            <Label htmlFor="record">Record</Label>
            <Input
              type="text"
              name="record"
              id="record"
              defaultValue={record}
            />
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Input
              type="text"
              name="content"
              id="content"
              defaultValue={content}
            />
          </div>
          <input type="hidden" name="subdomainid" value={subDomainId} />
          <input type="hidden" name="sessionuserid" value={sessionId} />
          <FormLoadingButton>Update</FormLoadingButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
