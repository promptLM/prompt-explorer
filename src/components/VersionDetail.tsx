import { format } from "date-fns";
import { Layers } from "lucide-react";
import { MetadataChip } from "./MetadataChip";
import { SpecView } from "./SpecPanels";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorState } from "./ErrorState";
import type { PromptVersion } from "@/types/prompt";

interface Props {
  version: PromptVersion | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export function VersionDetail({ version, loading, error, onRetry }: Props) {
  if (loading) return <LoadingSpinner message="Loading version…" />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;
  if (!version) return null;

  return (
    <div className="animate-fade-in space-y-4">
      <div className="rounded-xl border bg-card p-5 card-shadow">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-bold text-card-foreground">Version Details</h2>
            <p className="text-xs text-muted-foreground">Inspect the full spec for this version</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-border/60">
          <MetadataChip label="Version" value={version.tag} />
          <MetadataChip label="Released" value={format(new Date(version.releasedAt), "MMM d, yyyy")} />
          <MetadataChip label="Commit" value={version.commit} />
        </div>
      </div>
      <SpecView spec={version.spec} />
    </div>
  );
}
