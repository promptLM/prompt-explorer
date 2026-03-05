/**
 * Resolves a path relative to the Vite base URL (for GitHub Pages compatibility).
 */
export function resolvePath(path: string): string {
  const base = import.meta.env.BASE_URL ?? "/";
  // Ensure no double slashes
  const cleanBase = base.endsWith("/") ? base : base + "/";
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return cleanBase + cleanPath;
}
