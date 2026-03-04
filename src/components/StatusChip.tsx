import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  active: "bg-primary/10 text-primary border-primary/20",
  deprecated: "bg-destructive/10 text-destructive border-destructive/20",
  passed: "bg-primary/10 text-primary border-primary/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
};

export function StatusChip({ status, className }: { status: string; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium font-heading",
      statusStyles[status] ?? "bg-muted text-muted-foreground border-border",
      className
    )}>
      {status}
    </span>
  );
}
