import { Separator } from "~/components/ui/separator";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 z-50 w-full bg-background">
      <Separator />
      <ul className="flex items-center justify-center px-5 py-1">
        <li>
          <a
            target="_blank"
            href="https://github.com/TeaByte/catway-dns"
            className="hover:underline"
          >
            <strong className="text-sm font-semibold">
              Please ⭐ us on Github!
            </strong>
          </a>
        </li>
      </ul>
    </footer>
  );
}
