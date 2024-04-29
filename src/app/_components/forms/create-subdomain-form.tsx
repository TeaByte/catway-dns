"use client";

import { addSubDomain } from "~/app/_actions/actions";

import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { FormLoadingButton } from "~/components/form-loading-button";
import { toast } from "sonner";

export default function CreateSubdomainForm({
  sessionId,
}: {
  sessionId: string;
}) {
  async function clientAction(formData: FormData) {
    const result = await addSubDomain(formData);
    if (result?.error) {
      toast.error(result.error, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }

  return (
    <form
      action={clientAction}
      className="flex w-full flex-col gap-2 rounded border p-4"
    >
      <div className="flex w-full gap-2">
        <div className="w-full">
          <Label htmlFor="subdomain">Subdomain:</Label>
          <Input
            type="text"
            name="subdomain"
            id="subdomain"
            placeholder="Subdomain"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="domain">Domain:</Label>
          <Input id="domain" value={"catway.org"} disabled />
        </div>
      </div>
      <div>
        <Label htmlFor="record">Record:</Label>
        <Select name="record">
          <SelectTrigger>
            <SelectValue placeholder="Record" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A">A</SelectItem>
            <SelectItem value="AAAA">AAAA</SelectItem>
            <SelectItem value="CNAME">CNAME</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="content">Content:</Label>
        <Input type="text" name="content" id="content" placeholder="Content" />
      </div>
      <div className="mb-2 flex items-center gap-2">
        <Label htmlFor="content">Proxied ( SSL ):</Label>
        <Switch defaultChecked={true} name="proxied" />
      </div>
      <input type="hidden" name="sessionuserid" value={sessionId} />
      <FormLoadingButton text="Create" />
    </form>
  );
}
