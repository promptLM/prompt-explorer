import { useState, useEffect, useCallback } from "react";
import type { PromptIndex, PromptHistory, PromptVersion, PromptSummary } from "@/types/prompt";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  return res.json();
}

export function usePromptIndex() {
  const [data, setData] = useState<PromptIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchJson<PromptIndex>("/data/index.json")
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);
  return { data, loading, error, retry: load };
}

export function usePromptHistory(prompt: PromptSummary | null) {
  const [data, setData] = useState<PromptHistory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!prompt) { setData(null); return; }
    setLoading(true);
    setError(null);
    fetchJson<PromptHistory>(`/data/prompts/${prompt.group}/${prompt.name}/history.json`)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [prompt]);

  useEffect(() => { load(); }, [load]);
  return { data, loading, error, retry: load };
}

export function usePromptVersion(prompt: PromptSummary | null, version: string | null) {
  const [data, setData] = useState<PromptVersion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!prompt || !version) { setData(null); return; }
    setLoading(true);
    setError(null);
    fetchJson<PromptVersion>(`/data/prompts/${prompt.group}/${prompt.name}/versions/${version}.json`)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [prompt, version]);

  useEffect(() => { load(); }, [load]);
  return { data, loading, error, retry: load };
}
