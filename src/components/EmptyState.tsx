import { FileText } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 animate-fade-in">
      <div className="rounded-2xl bg-secondary p-6">
        <FileText className="h-10 w-10 text-primary" />
      </div>
      <div className="text-center">
        <h2 className="font-heading text-xl font-semibold text-foreground">Select a Prompt</h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground font-body">
          Choose a prompt from the sidebar to view its details, version history, and compare versions side by side.
        </p>
      </div>
    </div>
  );
}
