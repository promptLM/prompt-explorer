import type { PromptSummary } from "@/types/prompt";
import { StatusChip } from "./StatusChip";
import { MetadataChip } from "./MetadataChip";
import { format } from "date-fns";

export function PromptOverview({ prompt }: { prompt: PromptSummary }) {
  return (
    <div className="rounded-lg border bg-card p-6 card-shadow animate-fade-in">
      <h1 className="font-heading text-2xl font-bold text-card-foreground">{prompt.name}</h1>
      <p className="mt-1.5 text-sm text-muted-foreground font-body">{prompt.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <MetadataChip label="Group" value={prompt.group} />
        <StatusChip status={prompt.status} />
        <MetadataChip label="Latest" value={prompt.latestTag} />
        <MetadataChip label="Created" value={format(new Date(prompt.createdAt), "MMM d, yyyy")} />
        <MetadataChip label="Updated" value={format(new Date(prompt.updatedAt), "MMM d, yyyy")} />
      </div>
    </div>
  );
}
