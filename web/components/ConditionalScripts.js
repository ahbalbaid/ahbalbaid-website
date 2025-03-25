"use client";

import { usePathname } from "next/navigation";
import ThirdPartyScripts from "./ThirdPartyScripts";

export default function ConditionalScripts() {
  const pathname = usePathname();

  const hideOnPaths = ["/desktop"]; // ⬅️ your hide list

  if (hideOnPaths.includes(pathname)) {
    return null;
  }

  return <ThirdPartyScripts />;
}
