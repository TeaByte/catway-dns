export const revalidate = 10800;

import Image from "next/image";

import { getTotalRequests } from "~/server/cloudflare/apis";

import { SignInButton } from "./login-button";
import { PawPrint } from "lucide-react";
import RequestsChart from "./landing-chart";
import { Info } from "lucide-react";

export default async function LandingPage() {
  const chartData = await getTotalRequests();

  return (
    <main className="mx-4 mb-14 mt-6 flex flex-col items-center justify-center gap-6 md:mx-[200px] md:mt-10 lg:mx-[300px] xl:mx-[400px] 2xl:mx-[700px]">
      <div className="flex flex-col items-center gap-2">
        <Image
          draggable="false"
          title="CatWay cat logo"
          src="/cat-logo.webp"
          alt="logo"
          width={200}
          height={200}
          className="h-36 w-36"
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
      <div className="mt-6 w-full">
        <div className="flex items-center gap-1">
          <Info className="h-4 w-4" />
          <p className="text-sm font-semibold">Last month requests:</p>
        </div>
        <RequestsChart data={chartData} />
      </div>
    </main>
  );
}
