'use client';

import { useState } from 'react';

interface HintAccordionProps {
  hints: string[];
}

export default function HintAccordion({ hints }: HintAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(p => !p)}
        className="flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
      >
        <span className={`inline-block transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>▾</span>
        Show Hints
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-smooth ${open ? 'max-h-64 mt-3' : 'max-h-0'}`}>
        <ul className="list-none space-y-2">
          {hints.map((hint, i) => (
            <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
              {hint}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}