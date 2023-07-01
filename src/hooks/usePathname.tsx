import { hasPathnamePrefixed } from "@/utils/router/hasPathnamePrefixed";
import { unlocalizePathname } from "@/utils/router/unlocalizePathname";
import { useParams, usePathname as useNextPathname } from "next/navigation";
import React from "react";

export default function usePathname(): string {
  // The types aren't entirely correct here. Outside of Next.js
  // `useParams` can be called, but the return type is `null`.
  const pathname = useNextPathname() as ReturnType<
    typeof useNextPathname
  > | null;

  const { locale } = useParams();

  return React.useMemo(() => {
    if (!pathname) return pathname as ReturnType<typeof useNextPathname>;

    const isPathnamePrefixed = hasPathnamePrefixed(locale, pathname);
    const unlocalizedPathname = isPathnamePrefixed
      ? unlocalizePathname(pathname, locale)
      : pathname;

    return unlocalizedPathname;
  }, [locale, pathname]);
}
