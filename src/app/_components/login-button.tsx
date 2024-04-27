"use client";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

export function SignIn() {
  const [providers, setProviders] = useState<any>();
  const { data: session, status } = useSession();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </>
  );
}

export default function SessionButton() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        <p>Signed in as {session.user.id}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <SignIn />
    </>
  );
}
