import { useEffect, useMemo, useRef, useState } from 'react';
import { profile } from '../data/profile';

type Action = { id: string; label: string; hint: string; group: string; run: () => void };

const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
const open = (url: string) => () => window.open(url, '_blank', 'noopener');

const ACTIONS: Action[] = [
  { id: 'top', label: 'Home', hint: '#top', group: 'Navigate', run: go('top') },
  { id: 'about', label: 'About', hint: '#about', group: 'Navigate', run: go('about') },
  { id: 'experience', label: 'Experience', hint: '#experience', group: 'Navigate', run: go('experience') },
  { id: 'projects', label: 'Featured work', hint: '#projects', group: 'Navigate', run: go('projects') },
  { id: 'skills', label: 'Skills', hint: '#skills', group: 'Navigate', run: go('skills') },
  { id: 'terminal', label: 'Terminal', hint: '#terminal', group: 'Navigate', run: go('terminal') },
  { id: 'education', label: 'Education', hint: '#education', group: 'Navigate', run: go('education') },
  { id: 'contact', label: 'Contact', hint: '#contact', group: 'Navigate', run: go('contact') },
  { id: 'cv', label: 'Download CV', hint: 'PDF', group: 'Actions', run: open(profile.cv) },
  {
    id: 'email',
    label: 'Copy email address',
    hint: 'clipboard',
    group: 'Actions',
    run: () => navigator.clipboard?.writeText(`${profile.emailUser}@${profile.emailDomain}`),
  },
  { id: 'theme', label: 'Toggle theme', hint: 'light / dark', group: 'Actions', run: () => window.dispatchEvent(new Event('toggle-theme')) },
  { id: 'github', label: 'GitHub', hint: profile.githubHandle, group: 'Links', run: open(profile.github) },
  { id: 'linkedin', label: 'LinkedIn', hint: 'profile', group: 'Links', run: open(profile.linkedin) },
];

export default function CommandPalette() {
  const [isOpen, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? ACTIONS.filter((a) => `${a.label} ${a.hint} ${a.group}`.toLowerCase().includes(q)) : ACTIONS;
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-palette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-palette', onOpen);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => setActive(0), [query]);

  if (!isOpen) return null;

  const choose = (a: Action | undefined) => {
    if (!a) return;
    setOpen(false);
    a.run();
  };

  let lastGroup = '';

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[15vh]" role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-bg-soft shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <span className="font-mono text-accent">❯</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((i) => Math.min(i + 1, results.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              } else if (e.key === 'Enter') {
                choose(results[active]);
              }
            }}
            placeholder="Search sections and actions…"
            aria-label="Search commands"
            className="h-14 flex-1 bg-transparent text-ink outline-none placeholder:text-faint"
          />
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">ESC</kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto p-2" role="listbox">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-faint">No results.</li>}
          {results.map((a, i) => {
            const header = a.group !== lastGroup ? a.group : null;
            lastGroup = a.group;
            return (
              <li key={a.id} role="option" aria-selected={i === active}>
                {header && <div className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-wider text-faint">{header}</div>}
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(a)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    i === active ? 'bg-surface-strong text-ink' : 'text-muted'
                  }`}
                >
                  <span>{a.label}</span>
                  <span className="font-mono text-xs text-faint">{a.hint}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
