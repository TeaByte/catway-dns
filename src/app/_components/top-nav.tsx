import SessionButton from "./login-button";

export default function TopNav() {
  return (
    <nav className="flex items-center justify-between p-4">
      <h1 className="text-3xl font-bold">DNS Catway</h1>
      <SessionButton />
    </nav>
  );
}
