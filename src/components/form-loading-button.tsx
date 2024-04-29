"use client";

import { useFormStatus } from "react-dom";
import { usePostHog } from "posthog-js/react";

import { LoaderCircle } from "lucide-react";
import { Button } from "~/components/ui/button";

export function FormLoadingButton({
  variant,
  text,
}: {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}) {
  const { pending } = useFormStatus();
  const posthog = usePostHog();

  return (
    <Button
      onClick={() => posthog?.capture(`${text}`)}
      type="submit"
      variant={variant}
      disabled={pending}
      className="flex w-full gap-1"
    >
      {pending && <LoaderCircle className="h-5 w-5 animate-spin" />}
      <span className="text-md font-semibold">{text}</span>
    </Button>
  );
}
