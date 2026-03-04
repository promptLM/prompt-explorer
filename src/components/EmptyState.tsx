import { FileText, ArrowLeft } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 rounded-3xl bg-primary/5 blur-2xl scale-150" />
        <div className="relative rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-8 border border-border/50">
          <FileText className="h-12 w-12 text-primary" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h2 className="font-heading text-2xl font-bold text-foreground">Select a Prompt</h2>
        <p className="max-w-md text-sm text-muted-foreground font-body leading-relaxed">
          Choose a prompt from the sidebar to view its details, version history, and compare versions side by side.
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Browse prompts in the sidebar</span>
      </div>
    </div>
  );
}
