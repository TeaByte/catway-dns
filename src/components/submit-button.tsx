"use client";

import { useEffect } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
