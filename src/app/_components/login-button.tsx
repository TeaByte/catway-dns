"use client";

import { useSession, signIn, signOut } from "next-auth/react";

import { Button } from "~/components/ui/button";
import { LogOut, Github } from "lucide-react";

export function SignInButton() {
  return (
    <>
      <Button
        className="flex items-center gap-2"
        onClick={async () => {
          await signIn("github");
        }}
      >
        <Github className="h-5 w-5" />
        Sign in
      </Button>
    </>
  );
}

export default function SessionButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Button onClick={() => signOut()} className="flex items-center gap-2">
          <LogOut className="h-5 w-5" />
          Sign out
        </Button>
      </>
    );
  }
  return <SignInButton />;
}
