import SessionButton from "./login-button";
import { Separator } from "~/components/ui/separator";

export default function TopNav() {
  return (
    <>
      <nav className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-semibold">CatWay DNS</h1>
        <SessionButton />
      </nav>
      <Separator />
    </>
  );
}
