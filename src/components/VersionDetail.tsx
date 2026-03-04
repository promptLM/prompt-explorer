import { format } from "date-fns";
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
      <div className="rounded-lg border bg-card p-5 card-shadow">
        <h2 className="font-heading text-lg font-semibold text-card-foreground">Selected Version Details</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <MetadataChip label="Version" value={version.tag} />
          <MetadataChip label="Released" value={format(new Date(version.releasedAt), "MMM d, yyyy")} />
          <MetadataChip label="Commit" value={version.commit} />
        </div>
      </div>
      <SpecView spec={version.spec} />
    </div>
  );
}
