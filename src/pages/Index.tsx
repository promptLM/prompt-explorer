import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PromptSidebar } from "@/components/PromptSidebar";
import { EmptyState } from "@/components/EmptyState";
import { PromptOverview } from "@/components/PromptOverview";
import { VersionHistoryList } from "@/components/VersionHistoryList";
import { VersionDetail } from "@/components/VersionDetail";
import { ComparisonView } from "@/components/ComparisonView";
import { usePromptIndex, usePromptHistory, usePromptVersion } from "@/hooks/usePromptData";
import type { PromptSummary } from "@/types/prompt";

const Index = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<PromptSummary | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [compareVersion, setCompareVersion] = useState<string | null>(null);

  const index = usePromptIndex();
  const history = usePromptHistory(selected);
  const versionData = usePromptVersion(selected, selectedVersion);
  const compareData = usePromptVersion(selected, compareVersion);

  const handleSelectPrompt = useCallback((p: PromptSummary) => {
    setSelected(p);
    setSelectedVersion(null);
    setCompareVersion(null);
    setDrawerOpen(false);
  }, []);

  const handleCloseComparison = useCallback(() => {
    setCompareVersion(null);
  }, []);

  const isComparing = !!selectedVersion && !!compareVersion;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 lg:hidden" onClick={() => setDrawerOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-200 ease-out
        lg:relative lg:translate-x-0 lg:z-auto
        ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <PromptSidebar
          prompts={index.data?.prompts ?? []}
          loading={index.loading}
          error={index.error}
          onRetry={index.retry}
          selected={selected}
          onSelect={handleSelectPrompt}
        />
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <header className="flex h-14 items-center gap-3 border-b bg-card px-4 card-shadow shrink-0">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setDrawerOpen(!drawerOpen)}>
            {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="font-heading text-lg font-bold text-foreground">Prompt Viewer</h1>
            {index.data?.repository && (
              <span className="hidden sm:inline text-xs text-muted-foreground font-mono">
                {index.data.repository.name} {index.data.repository.version}
              </span>
            )}
          </div>
          <div className="ml-auto">
            {selected ? (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary font-heading">
                {selected.name}
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">No prompt selected</span>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {!selected ? (
            <EmptyState />
          ) : isComparing ? (
            <ComparisonView
              promptName={selected.name}
              left={{ data: versionData.data, loading: versionData.loading, error: versionData.error, retry: versionData.retry }}
              right={{ data: compareData.data, loading: compareData.loading, error: compareData.error, retry: compareData.retry }}
              onClose={handleCloseComparison}
            />
          ) : (
            <div className="space-y-4 max-w-5xl">
              <PromptOverview prompt={selected} />
              <VersionHistoryList
                versions={history.data?.versions}
                loading={history.loading}
                error={history.error}
                onRetry={history.retry}
                selectedVersion={selectedVersion}
                compareVersion={compareVersion}
                onSelectVersion={setSelectedVersion}
                onCompareVersion={setCompareVersion}
              />
              <VersionDetail
                version={versionData.data}
                loading={versionData.loading}
                error={versionData.error}
                onRetry={versionData.retry}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
