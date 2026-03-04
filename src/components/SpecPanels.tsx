import { useState } from "react";
import { StatusChip } from "./StatusChip";
import { MetadataChip } from "./MetadataChip";
import { Button } from "@/components/ui/button";
import { Code, Eye, MessageSquare, FileOutput, BarChart3 } from "lucide-react";
import type { VersionSpec } from "@/types/prompt";

function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-card card-shadow overflow-hidden">
      <div className="border-b border-border/60 px-4 py-3 flex items-center gap-2.5">
        <span className="text-primary">{icon}</span>
        <h3 className="font-heading text-sm font-bold text-card-foreground">{title}</h3>
      </div>
      <div className="p-4 text-sm font-body">{children}</div>
    </div>
  );
}

function MessageBlock({ role, content }: { role: string; content: string }) {
  return (
    <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
      <span className="inline-flex items-center rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">{role}</span>
      <pre className="mt-2 whitespace-pre-wrap font-mono text-xs text-foreground leading-relaxed">{content}</pre>
    </div>
  );
}

export function RequestPanel({ spec }: { spec: VersionSpec }) {
  const { request } = spec;
  return (
    <SectionCard title="Request" icon={<MessageSquare className="h-4 w-4" />}>
      <div className="flex flex-wrap gap-1.5 mb-3">
        <MetadataChip label="Vendor" value={request.vendor} />
        <MetadataChip label="Model" value={request.model} />
        {Object.entries(request.parameters).map(([k, v]) => (
          <MetadataChip key={k} label={k} value={String(v)} />
        ))}
      </div>
      <div className="space-y-2">
        {request.messages.map((m, i) => (
          <MessageBlock key={i} role={m.role} content={m.content} />
        ))}
      </div>
    </SectionCard>
  );
}

export function ResponsePanel({ spec }: { spec: VersionSpec }) {
  const { response } = spec;
  return (
    <SectionCard title="Response" icon={<FileOutput className="h-4 w-4" />}>
      <pre className="whitespace-pre-wrap font-mono text-xs text-foreground leading-relaxed mb-3 rounded-lg bg-muted/30 border border-border/50 p-3">{response.content}</pre>
      <div className="flex flex-wrap gap-1.5">
        {Object.entries(response.usage).map(([k, v]) => (
          <MetadataChip key={k} label={k} value={String(v)} />
        ))}
      </div>
    </SectionCard>
  );
}

export function EvaluationPanel({ spec }: { spec: VersionSpec }) {
  const { evaluationResults } = spec;
  return (
    <SectionCard title="Evaluation" icon={<BarChart3 className="h-4 w-4" />}>
      <div className="mb-3">
        <StatusChip status={evaluationResults.status} />
      </div>
      <div className="space-y-2.5">
        {evaluationResults.evaluations.map((ev, i) => (
          <div key={i} className="rounded-lg border border-border/50 p-3">
            <div className="flex items-center justify-between">
              <span className="font-heading text-sm font-semibold">{ev.name}</span>
              <span className="inline-flex items-center rounded-lg bg-primary/10 px-2 py-0.5 font-mono text-sm font-bold text-primary">
                {(ev.score * 100).toFixed(0)}%
              </span>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{ev.reasoning}</p>
            {ev.comments && <p className="mt-1 text-xs italic text-muted-foreground/70">{ev.comments}</p>}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function SpecView({ spec, showJsonToggle = true }: { spec: VersionSpec; showJsonToggle?: boolean }) {
  const [showJson, setShowJson] = useState(false);

  if (showJson) {
    return (
      <div>
        {showJsonToggle && (
          <div className="mb-3 flex justify-end">
            <Button variant="ghost" size="sm" className="rounded-lg" onClick={() => setShowJson(false)}>
              <Eye className="mr-1.5 h-3.5 w-3.5" /> Formatted View
            </Button>
          </div>
        )}
        <pre className="rounded-xl border bg-muted/30 p-5 text-xs font-mono overflow-x-auto text-foreground leading-relaxed">
          {JSON.stringify(spec, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div>
      {showJsonToggle && (
        <div className="mb-3 flex justify-end">
          <Button variant="ghost" size="sm" className="rounded-lg" onClick={() => setShowJson(true)}>
            <Code className="mr-1.5 h-3.5 w-3.5" /> Show JSON
          </Button>
        </div>
      )}
      <div className="grid gap-4 lg:grid-cols-3">
        <RequestPanel spec={spec} />
        <ResponsePanel spec={spec} />
        <EvaluationPanel spec={spec} />
      </div>
    </div>
  );
}
