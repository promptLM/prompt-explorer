import { useState } from "react";
import { StatusChip } from "./StatusChip";
import { MetadataChip } from "./MetadataChip";
import { Button } from "@/components/ui/button";
import { Code, Eye } from "lucide-react";
import type { VersionSpec } from "@/types/prompt";

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-card card-shadow">
      <div className="border-b px-4 py-2.5">
        <h3 className="font-heading text-sm font-semibold text-card-foreground">{title}</h3>
      </div>
      <div className="p-4 text-sm font-body">{children}</div>
    </div>
  );
}

function MessageBlock({ role, content }: { role: string; content: string }) {
  return (
    <div className="rounded-md border bg-muted/50 p-3">
      <span className="text-xs font-heading font-semibold uppercase text-primary">{role}</span>
      <pre className="mt-1.5 whitespace-pre-wrap font-mono text-xs text-foreground leading-relaxed">{content}</pre>
    </div>
  );
}

export function RequestPanel({ spec }: { spec: VersionSpec }) {
  const { request } = spec;
  return (
    <SectionCard title="Request">
      <div className="flex flex-wrap gap-2 mb-3">
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
    <SectionCard title="Response">
      <pre className="whitespace-pre-wrap font-mono text-xs text-foreground leading-relaxed mb-3">{response.content}</pre>
      <div className="flex flex-wrap gap-2">
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
    <SectionCard title="Evaluation">
      <div className="mb-3">
        <StatusChip status={evaluationResults.status} />
      </div>
      <div className="space-y-3">
        {evaluationResults.evaluations.map((ev, i) => (
          <div key={i} className="rounded-md border p-3">
            <div className="flex items-center justify-between">
              <span className="font-heading text-sm font-medium">{ev.name}</span>
              <span className="font-mono text-sm font-semibold text-primary">{(ev.score * 100).toFixed(0)}%</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{ev.reasoning}</p>
            {ev.comments && <p className="mt-0.5 text-xs italic text-muted-foreground/80">{ev.comments}</p>}
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
            <Button variant="ghost" size="sm" onClick={() => setShowJson(false)}>
              <Eye className="mr-1.5 h-3.5 w-3.5" /> Formatted View
            </Button>
          </div>
        )}
        <pre className="rounded-lg border bg-muted/50 p-4 text-xs font-mono overflow-x-auto text-foreground leading-relaxed">
          {JSON.stringify(spec, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div>
      {showJsonToggle && (
        <div className="mb-3 flex justify-end">
          <Button variant="ghost" size="sm" onClick={() => setShowJson(true)}>
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
