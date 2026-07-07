const icons = import.meta.glob("./assets/icons/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export function iconUrl(filename: string): string {
  const entry = Object.entries(icons).find(([path]) => path.endsWith(`/${filename}`));
  if (!entry) throw new Error(`Missing icon asset: ${filename}`);
  return entry[1];
}
