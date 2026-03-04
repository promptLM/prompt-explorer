import { cn } from "@/lib/utils";

export function MetadataChip({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-xs font-body", className)}>
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium text-foreground">{value}</span>
    </span>
  );
}
