"use client";

import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import { useEffect, useState } from "react"; // Import Provider type

export function SignIn() {
  // @ts-ignore
  const [providers, setProviders] = useState<any>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res); // ...
    };

    fetchProviders()
      .then(() => console.log("Providers fetched"))
      .catch(console.error);
  }, []);

  return (
    <>
      {providers &&
        // @ts-ignore
        Object.values(providers).map((provider: any) => (
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
