import { format } from "date-fns";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetadataChip } from "./MetadataChip";
import { RequestPanel, ResponsePanel, EvaluationPanel } from "./SpecPanels";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorState } from "./ErrorState";
import type { PromptVersion } from "@/types/prompt";

interface Props {
  promptName: string;
  left: { data: PromptVersion | null; loading: boolean; error: string | null; retry: () => void };
  right: { data: PromptVersion | null; loading: boolean; error: string | null; retry: () => void };
  onClose: () => void;
}

function VersionColumn({ version, loading, error, retry }: { version: PromptVersion | null; loading: boolean; error: string | null; retry: () => void }) {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} onRetry={retry} />;
  if (!version) return null;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 mb-2">
        <MetadataChip label="Version" value={version.tag} />
        <MetadataChip label="Released" value={format(new Date(version.releasedAt), "MMM d, yyyy")} />
        <MetadataChip label="Commit" value={version.commit} />
      </div>
      <RequestPanel spec={version.spec} />
      <ResponsePanel spec={version.spec} />
      <EvaluationPanel spec={version.spec} />
    </div>
  );
}

export function ComparisonView({ promptName, left, right, onClose }: Props) {
  return (
    <div className="animate-fade-in space-y-4">
      <div className="flex items-center justify-between rounded-lg border bg-card p-4 card-shadow">
        <h2 className="font-heading text-lg font-semibold text-card-foreground">
          Comparing Versions – {promptName}
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="mr-1.5 h-4 w-4" /> Close Comparison
        </Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="font-heading text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Selected</h3>
          <VersionColumn version={left.data} loading={left.loading} error={left.error} retry={left.retry} />
        </div>
        <div>
          <h3 className="font-heading text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Comparison</h3>
          <VersionColumn version={right.data} loading={right.loading} error={right.error} retry={right.retry} />
        </div>
      </div>
    </div>
  );
}
