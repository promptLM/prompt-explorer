import { cn } from "@/lib/utils";

export function MetadataChip({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-lg bg-muted/70 border border-border/40 px-2.5 py-1 text-xs font-body", className)}>
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </span>
  );
}
