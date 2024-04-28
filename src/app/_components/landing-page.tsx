import Image from "next/image";

import { SignInButton } from "./login-button";
import { PawPrint } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="mx-4 mt-6 flex flex-col items-center justify-center gap-6 md:mx-[200px] md:mt-10 lg:mx-[300px] xl:mx-[400px] 2xl:mx-[700px]">
      <div className="flex flex-col items-center gap-2">
        <Image
          title="CatWay cat logo"
          src="/cat-logo.webp"
          alt="logo"
          width={200}
          height={200}
        />
        <p className="text-center text-lg font-semibold">
          Just like a cat finding its way home, Cat DNS ensures your devices and
          services are always reachable.
        </p>
      </div>
      <SignInButton isAnimated>
        <PawPrint className="h-5 w-5" />
        Leap In Now!
      </SignInButton>
    </main>
  );
}
