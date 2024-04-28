"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "~/components/ui/button";

export function FormLoadingButton({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={variant}
      disabled={pending}
      className="flex w-full gap-1"
    >
      {pending && <LoaderCircle className="h-5 w-5 animate-spin" />}
      <span className="text-md font-semibold">{children}</span>
    </Button>
  );
}
