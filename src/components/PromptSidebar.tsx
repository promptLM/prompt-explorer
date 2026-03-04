import { useState, useMemo } from "react";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { StatusChip } from "@/components/StatusChip";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorState } from "@/components/ErrorState";
import { cn } from "@/lib/utils";
import type { PromptSummary } from "@/types/prompt";

interface Props {
  prompts: PromptSummary[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  selected: PromptSummary | null;
  onSelect: (p: PromptSummary) => void;
}

export function PromptSidebar({ prompts, loading, error, onRetry, selected, onSelect }: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return prompts;
    const q = search.toLowerCase();
    return prompts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.group.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    );
  }, [prompts, search]);

  const grouped = useMemo(() => {
    const map: Record<string, PromptSummary[]> = {};
    for (const p of filtered) {
      (map[p.group] ??= []).push(p);
    }
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo area */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <Sparkles className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h2 className="font-heading text-base font-bold tracking-tight">Prompts</h2>
            <p className="text-[11px] text-sidebar-foreground/50">Browse & compare</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-sidebar-foreground/40" />
          <Input
            placeholder="Search prompts…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 bg-sidebar-accent/60 border-sidebar-border/50 text-sidebar-foreground placeholder:text-sidebar-foreground/30 h-9 text-sm rounded-lg focus:bg-sidebar-accent"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        {loading && <LoadingSpinner message="Loading prompts…" />}
        {error && <ErrorState message={error} onRetry={onRetry} />}
        {!loading && !error && grouped.length === 0 && (
          <p className="p-4 text-sm text-sidebar-foreground/50">No prompts found.</p>
        )}
        {grouped.map(([group, items]) => (
          <div key={group} className="mb-4">
            <p className="px-2 pb-1.5 pt-2 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/35">
              {group}
            </p>
            <div className="space-y-0.5">
              {items.map(p => (
                <button
                  key={p.id}
                  onClick={() => onSelect(p)}
                  className={cn(
                    "w-full rounded-lg px-3 py-2.5 text-left transition-all duration-150",
                    selected?.id === p.id
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                      : "hover:bg-sidebar-accent/80"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold font-heading">{p.name}</span>
                    <StatusChip status={p.status} className="shrink-0 text-[10px]" />
                  </div>
                  <p className="mt-0.5 text-[11px] opacity-50 font-mono">{p.latestTag}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
