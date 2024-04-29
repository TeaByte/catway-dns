"use client";

import { updateSubDomain } from "~/app/_actions/actions";

import SwitchButton from "~/components/switch-button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { FormLoadingButton } from "~/components/form-loading-button";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

export default function UpdateSubdomainForm({
  sessionId,
  subDomainId,
  record,
  content,
  isProxied,
}: {
  sessionId: string;
  subDomainId: string;
  record: string;
  content: string;
  isProxied: boolean;
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
        <Button className="w-full">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={clientAction} className="grid gap-3 py-4">
          <div>
            <Label htmlFor="record">Record:</Label>
            <Input
              type="text"
              name="record"
              id="record"
              defaultValue={record}
            />
          </div>
          <div>
            <Label htmlFor="content">Content:</Label>
            <Input
              type="text"
              name="content"
              id="content"
              defaultValue={content}
            />
          </div>
          <div className="mb-2 flex items-center gap-2">
            <Label htmlFor="content">Proxied ( SSL ):</Label>
            <SwitchButton isProxied={isProxied} />
          </div>
          <input type="hidden" name="subdomainid" value={subDomainId} />
          <input type="hidden" name="sessionuserid" value={sessionId} />
          <FormLoadingButton text="Update" />
        </form>
      </DialogContent>
    </Dialog>
  );
}
