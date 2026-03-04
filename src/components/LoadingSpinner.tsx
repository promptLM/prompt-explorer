import { Loader2 } from "lucide-react";

export function LoadingSpinner({ message = "Loading…" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-lg scale-150" />
        <Loader2 className="relative h-6 w-6 animate-spin text-primary" />
      </div>
      <p className="text-sm text-muted-foreground font-body">{message}</p>
    </div>
  );
}
