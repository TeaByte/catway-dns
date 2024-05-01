import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <main className="mx-4 mt-6 flex flex-col items-center justify-center gap-6 md:mx-[200px] md:mt-10 lg:mx-[300px] xl:mx-[400px] 2xl:mx-[700px]">
      <div className="flex flex-col items-center gap-2">
        <LoaderCircle className="h-24 w-24 animate-spin" />
        <p className="text-center text-lg font-semibold">Loading content</p>
      </div>
    </main>
  );
}
