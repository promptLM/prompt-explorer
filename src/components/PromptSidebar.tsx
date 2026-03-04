import { useState, useMemo } from "react";
import { Search } from "lucide-react";
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
      <div className="border-b border-sidebar-border p-4">
        <h2 className="font-heading text-lg font-semibold">Prompts</h2>
        <div className="relative mt-3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-sidebar-foreground/50" />
          <Input
            placeholder="Search…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40 h-9 text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {loading && <LoadingSpinner message="Loading prompts…" />}
        {error && <ErrorState message={error} onRetry={onRetry} />}
        {!loading && !error && grouped.length === 0 && (
          <p className="p-4 text-sm text-sidebar-foreground/60">No prompts found.</p>
        )}
        {grouped.map(([group, items]) => (
          <div key={group} className="mb-3">
            <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
              {group}
            </p>
            {items.map(p => (
              <button
                key={p.id}
                onClick={() => onSelect(p)}
                className={cn(
                  "w-full rounded-md px-3 py-2 text-left transition-colors",
                  selected?.id === p.id
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "hover:bg-sidebar-accent"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-medium font-heading">{p.name}</span>
                  <StatusChip status={p.status} className="shrink-0" />
                </div>
                <p className="mt-0.5 text-xs opacity-70">{p.latestTag}</p>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
