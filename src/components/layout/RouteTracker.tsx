"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { emitSessionEvent } from "@/lib/events";

export default function RouteTracker() {
  const pathname = usePathname();
  useEffect(() => {
    emitSessionEvent("page_view", pathname);
  }, [pathname]);
  return null;
}
