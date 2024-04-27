"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "~/components/ui/button";

export function FormLoadingButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="flex gap-2">
      {pending && <LoaderCircle className="h-5 w-5 animate-spin" />}
      <span className="text-md font-semibold">{children}</span>
    </Button>
  );
}
