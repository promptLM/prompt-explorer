import { format } from "date-fns";
import { GitCommit, Check, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorState } from "./ErrorState";
import { cn } from "@/lib/utils";
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
    <div className="rounded-xl border bg-card card-shadow animate-fade-in overflow-hidden">
      <div className="px-5 py-4 border-b border-border/60">
        <h2 className="font-heading text-base font-bold text-card-foreground">Version History</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{versions.length} version{versions.length !== 1 ? "s" : ""} available</p>
      </div>
      <div className="divide-y divide-border/50">
        {versions.map((v, i) => {
          const isSelected = v.version === selectedVersion;
          const isCompare = v.version === compareVersion;
          const isLatest = i === 0;
          return (
            <div
              key={v.version}
              className={cn(
                "flex items-center justify-between gap-4 px-5 py-3.5 transition-colors",
                isSelected ? "bg-primary/5" : isCompare ? "bg-accent/5" : "hover:bg-muted/50"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  isSelected ? "bg-primary/15 text-primary" : isCompare ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"
                )}>
                  <GitCommit className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-sm font-semibold">{v.tag}</span>
                    {isLatest && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">Latest</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-[11px] text-muted-foreground">{v.commit}</span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="text-[11px] text-muted-foreground">{format(new Date(v.releasedAt), "MMM d, yyyy")}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {isSelected ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                    <Check className="h-3 w-3" /> Selected
                  </span>
                ) : isCompare ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                    <ArrowRightLeft className="h-3 w-3" /> Comparing
                  </span>
                ) : (
                  <>
                    <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg" onClick={() => onSelectVersion(v.version)}>
                      Select
                    </Button>
                    {selectedVersion && (
                      <Button size="sm" variant="secondary" className="h-8 text-xs rounded-lg" onClick={() => onCompareVersion(v.version)}>
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
