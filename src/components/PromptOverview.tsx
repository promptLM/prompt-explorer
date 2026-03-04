import type { PromptSummary } from "@/types/prompt";
import { StatusChip } from "./StatusChip";
import { MetadataChip } from "./MetadataChip";
import { format } from "date-fns";
import { BookOpen } from "lucide-react";

export function PromptOverview({ prompt }: { prompt: PromptSummary }) {
  return (
    <div className="rounded-xl border bg-card p-6 card-shadow animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <BookOpen className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl font-bold text-card-foreground">{prompt.name}</h1>
            <StatusChip status={prompt.status} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground font-body leading-relaxed">{prompt.description}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-border/60">
        <MetadataChip label="Group" value={prompt.group} />
        <MetadataChip label="Latest" value={prompt.latestTag} />
        <MetadataChip label="Created" value={format(new Date(prompt.createdAt), "MMM d, yyyy")} />
        <MetadataChip label="Updated" value={format(new Date(prompt.updatedAt), "MMM d, yyyy")} />
      </div>
    </div>
  );
}
