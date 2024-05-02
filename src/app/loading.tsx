import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <main className="container mt-6 flex flex-col items-center justify-center gap-6 lg:w-1/2">
      <div className="flex flex-col items-center gap-2">
        <LoaderCircle className="h-24 w-24 animate-spin" />
        <p className="text-center text-lg font-semibold">Loading content</p>
      </div>
    </main>
  );
}
