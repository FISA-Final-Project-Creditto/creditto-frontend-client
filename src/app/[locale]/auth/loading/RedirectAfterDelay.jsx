"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectAfterDelay() {
  const router = useRouter();

  useEffect(() => {
    const id = setTimeout(() => {
      router.replace("/auth/success");
    }, 3000);

    return () => clearTimeout(id);
  }, [router]);

  return null;
}
