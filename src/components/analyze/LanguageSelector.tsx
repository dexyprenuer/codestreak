// src/components/analyze/LanguageSelector.tsx
'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LANGUAGES = ['javascript','typescript','python','java','cpp','go','rust','php','ruby','swift'];

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] bg-white/5 border border-white/10 hover:border-violet-500/40 text-white rounded-xl focus:ring-1 focus:ring-violet-500 transition-colors">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl">
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang} value={lang} className="capitalize text-zinc-300 hover:text-white focus:bg-white/10 rounded-lg cursor-pointer">
            {lang}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}