export interface PromptIndex {
  generatedAt: string;
  repository: { name: string; version: string; description: string };
  prompts: PromptSummary[];
}

export interface PromptSummary {
  id: string;
  name: string;
  group: string;
  description: string;
  status: string;
  latestVersion: string;
  latestTag: string;
  createdAt: string;
  updatedAt: string;
}

export interface PromptHistory {
  id: string;
  name: string;
  group: string;
  versions: VersionSummary[];
}

export interface VersionSummary {
  version: string;
  tag: string;
  releasedAt: string;
  commit: string;
}

export interface PromptVersion {
  id: string;
  name: string;
  group: string;
  version: string;
  tag: string;
  releasedAt: string;
  commit: string;
  spec: VersionSpec;
}

export interface VersionSpec {
  request: {
    vendor: string;
    model: string;
    parameters: Record<string, unknown>;
    messages: { role: string; content: string }[];
  };
  response: {
    content: string;
    usage: Record<string, unknown>;
  };
  evaluationResults: {
    status: string;
    evaluations: {
      name: string;
      score: number;
      reasoning: string;
      comments: string;
    }[];
  };
}
