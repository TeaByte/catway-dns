"use client";

import { useState } from "react";
import { Switch } from "./ui/switch";

export default function SwitchButton({ isProxied }: { isProxied: boolean }) {
  const [isProxiedState, setProxiedState] = useState<boolean>(isProxied);
  return (
    <Switch
      checked={isProxiedState}
      onCheckedChange={() => setProxiedState(!isProxiedState)}
      name="proxied"
    />
  );
}
