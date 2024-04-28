"use client";

import { addSubDomain } from "~/app/_actions/actions";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/Label";
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
    <form action={clientAction}>
      <Label htmlFor="subdomain">Subdomain</Label>
      <Input
        type="text"
        name="subdomain"
        id="subdomain"
        placeholder="Subdomain"
      />
      <Label htmlFor="record">Record</Label>
      <Select name="record">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Record" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="A">A</SelectItem>
          <SelectItem value="AAAA">AAAA</SelectItem>
          <SelectItem value="CNAME">CNAME</SelectItem>
        </SelectContent>
      </Select>
      <input type="hidden" name="sessionuserid" value={sessionId} />
      <Label htmlFor="content">Content</Label>
      <Input type="text" name="content" id="content" placeholder="Content" />
      <FormLoadingButton>Create</FormLoadingButton>
    </form>
  );
}
