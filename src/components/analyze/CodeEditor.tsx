// src/components/analyze/CodeEditor.tsx
'use client';

import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

export default function CodeEditor({ value, onChange, language }: CodeEditorProps) {
  const languageMap: Record<string, string> = {
    javascript: 'javascript', typescript: 'typescript', python: 'python',
    java: 'java', cpp: 'cpp', go: 'go', rust: 'rust', php: 'php', ruby: 'ruby', swift: 'swift',
  };

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 shadow-glass">
      <Editor
        height="400px"
        language={languageMap[language] || 'javascript'}
        value={value}
        onChange={(val) => onChange(val || '')}
        theme="vs-dark"
        options={{ minimap: { enabled: false }, fontSize: 14, scrollBeyondLastLine: false, automaticLayout: true }}
      />
    </div>
  );
}