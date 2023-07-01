import { unlocalizePathname } from "@/lib/intl/utils/unlocalizePathname";
import { usePathname as useNextPathname } from "next/navigation";
import React from "react";
import { hasPathnamePrefixed } from "../utils/hasPathnamePrefixed";
import { useLocale } from "./useLocale";

export function usePathname(): string {
  // The types aren't entirely correct here. Outside of Next.js
  // `useParams` can be called, but the return type is `null`.
  const pathname = useNextPathname() as ReturnType<
    typeof useNextPathname
  > | null;
  const locale = useLocale();

  return React.useMemo(() => {
    if (!pathname) return pathname as ReturnType<typeof useNextPathname>;

    const isPathnamePrefixed = hasPathnamePrefixed(locale, pathname);
    const unlocalizedPathname = isPathnamePrefixed
      ? unlocalizePathname(pathname, locale)
      : pathname;

    return unlocalizedPathname;
  }, [locale, pathname]);
}
