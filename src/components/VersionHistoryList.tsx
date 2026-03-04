import { format } from "date-fns";
import { GitCommit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorState } from "./ErrorState";
import type { VersionSummary } from "@/types/prompt";

interface Props {
  versions: VersionSummary[] | undefined;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  selectedVersion: string | null;
  compareVersion: string | null;
  onSelectVersion: (v: string) => void;
  onCompareVersion: (v: string) => void;
}

export function VersionHistoryList({
  versions, loading, error, onRetry,
  selectedVersion, compareVersion,
  onSelectVersion, onCompareVersion,
}: Props) {
  if (loading) return <LoadingSpinner message="Loading history…" />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;
  if (!versions?.length) return <p className="text-sm text-muted-foreground py-4">No versions found.</p>;

  return (
    <div className="rounded-lg border bg-card card-shadow animate-fade-in">
      <div className="border-b px-4 py-3">
        <h2 className="font-heading text-base font-semibold text-card-foreground">Version History</h2>
      </div>
      <div className="divide-y">
        {versions.map(v => {
          const isSelected = v.version === selectedVersion;
          const isCompare = v.version === compareVersion;
          return (
            <div key={v.version} className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <GitCommit className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-sm font-medium">{v.tag}</span>
                    <span className="font-mono text-xs text-muted-foreground">{v.commit}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{format(new Date(v.releasedAt), "MMM d, yyyy")}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {isSelected ? (
                  <span className="text-xs font-medium text-primary font-heading">Selected</span>
                ) : isCompare ? (
                  <span className="text-xs font-medium text-accent-foreground font-heading">Comparing</span>
                ) : (
                  <>
                    <Button size="sm" variant="outline" onClick={() => onSelectVersion(v.version)}>
                      Select
                    </Button>
                    {selectedVersion && (
                      <Button size="sm" variant="secondary" onClick={() => onCompareVersion(v.version)}>
                        Compare
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
