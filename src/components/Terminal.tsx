import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { profile, experience, projects, skillGroups, education } from '../data/profile';

type Line = { id: number; kind: 'input' | 'output'; content: ReactNode };

const email = () => `${profile.emailUser}@${profile.emailDomain}`;

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="text-accent underline-offset-4 hover:underline">
    {children}
  </a>
);

const COMMANDS: Record<string, { desc: string; run: (args: string[]) => ReactNode }> = {
  help: {
    desc: 'List available commands',
    run: () => (
      <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-0.5">
        {Object.entries(COMMANDS)
          .filter(([k]) => !HIDDEN.includes(k))
          .map(([k, v]) => (
            <div key={k} className="contents">
              <span className="text-accent">{k}</span>
              <span className="text-muted">{v.desc}</span>
            </div>
          ))}
      </div>
    ),
  },
  whoami: {
    desc: 'Who is this guy?',
    run: () => (
      <span>
        <span className="text-ink">{profile.name}</span> · {profile.title} · {profile.location}
      </span>
    ),
  },
  about: {
    desc: 'A short summary',
    run: () => <div className="space-y-2">{profile.summary.map((p, i) => <p key={i}>{p}</p>)}</div>,
  },
  experience: {
    desc: 'Work history',
    run: () => (
      <div className="space-y-1">
        {experience.map((j) => (
          <div key={j.company}>
            <span className="inline-block w-44 text-accent">{j.period}</span>
            <span className="text-ink">{j.role}</span> @ {j.company}
          </div>
        ))}
      </div>
    ),
  },
  skills: {
    desc: 'Tech stack by area',
    run: () => (
      <div className="space-y-1">
        {skillGroups.map((g) => (
          <div key={g.id}>
            <span className="text-accent">{g.label}:</span> {g.skills.join(', ')}
          </div>
        ))}
      </div>
    ),
  },
  projects: {
    desc: 'Featured work',
    run: () => (
      <div className="space-y-1">
        {projects.map((p) => (
          <div key={p.title}>
            <span className="text-accent">▸</span> <span className="text-ink">{p.title}</span>
            {p.metric && <span className="text-faint"> ({p.metric})</span>}
          </div>
        ))}
      </div>
    ),
  },
  education: {
    desc: 'Degrees and schools',
    run: () => (
      <div className="space-y-1">
        {education.map((e) => (
          <div key={e.school}>
            <span className="text-ink">{e.degree}</span>, {e.school} <span className="text-faint">· {e.detail}</span>
          </div>
        ))}
      </div>
    ),
  },
  contact: {
    desc: 'How to reach me',
    run: () => (
      <div className="space-y-1">
        <div>
          email&nbsp;&nbsp;&nbsp;&nbsp;<A href={`mailto:${email()}`}>{email()}</A>
        </div>
        <div>
          linkedin <A href={profile.linkedin}>enamul-haq-chowdhury</A>
        </div>
        <div>
          github&nbsp;&nbsp;&nbsp;<A href={profile.github}>@{profile.githubHandle}</A>
        </div>
      </div>
    ),
  },
  cv: {
    desc: 'Download my CV (PDF)',
    run: () => {
      window.open(profile.cv, '_blank');
      return <span>Opening CV… <A href={profile.cv}>click here</A> if it didn't open.</span>;
    },
  },
  theme: {
    desc: 'Toggle light / dark mode',
    run: () => {
      window.dispatchEvent(new Event('toggle-theme'));
      return <span>Theme switched to {document.documentElement.getAttribute('data-theme')}.</span>;
    },
  },
  goto: {
    desc: 'Scroll to a section, e.g. goto projects',
    run: ([section]) => {
      const el = section && document.getElementById(section);
      if (!el) return <span>Usage: goto [about|experience|projects|skills|education|contact]</span>;
      el.scrollIntoView({ behavior: 'smooth' });
      return <span>Navigating to #{section}…</span>;
    },
  },
  clear: { desc: 'Clear the terminal', run: () => null },
  // Easter eggs
  sudo: {
    desc: '',
    run: (args) =>
      args.join(' ') === 'hire-me' ? (
        <span>
          <span className="text-accent">✔ Permission granted.</span> Great choice! Let's talk: <A href={`mailto:${email()}`}>{email()}</A>
        </span>
      ) : (
        <span>enamul is not in the sudoers file. This incident will be reported. (try: sudo hire-me)</span>
      ),
  },
  ls: { desc: '', run: () => <span>about.md&nbsp;&nbsp;experience/&nbsp;&nbsp;projects/&nbsp;&nbsp;skills.json&nbsp;&nbsp;cv.pdf</span> },
  java: { desc: '', run: () => <span>openjdk version "21" · Spring Boot ready. ☕</span> },
};
const HIDDEN = ['sudo', 'ls', 'java'];

const banner = (
  <div>
    <div className="text-ink">enamul-os v5.0 · type <span className="text-accent">help</span> to get started.</div>
    <div className="text-faint">Tip: Tab autocompletes, ↑/↓ browse history.</div>
  </div>
);

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([{ id: 0, kind: 'output', content: banner }]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const idRef = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
    const cmdline = raw.trim();
    const [name = '', ...args] = cmdline.split(/\s+/);
    const key = name.toLowerCase();
    const next: Line[] = [{ id: idRef.current++, kind: 'input', content: cmdline }];

    if (key === 'clear') {
      setLines([]);
    } else {
      if (key) {
        const cmd = COMMANDS[key];
        const out = cmd ? cmd.run(args) : <span>command not found: {name}. Type <span className="text-accent">help</span>.</span>;
        if (out) next.push({ id: idRef.current++, kind: 'output', content: out });
      }
      setLines((l) => [...l, ...next]);
    }
    if (cmdline) setHistory((h) => [cmdline, ...h].slice(0, 50));
    setHIndex(-1);
    setInput('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const i = Math.min(hIndex + 1, history.length - 1);
      if (history[i] !== undefined) {
        setHIndex(i);
        setInput(history[i]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const i = hIndex - 1;
      setHIndex(Math.max(i, -1));
      setInput(i >= 0 ? history[i] : '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = Object.keys(COMMANDS).filter((c) => !HIDDEN.includes(c) && c.startsWith(input.toLowerCase()));
      if (match.length === 1) setInput(match[0]);
      else if (match.length > 1 && input)
        setLines((l) => [...l, { id: idRef.current++, kind: 'output', content: <span className="text-muted">{match.join('  ')}</span> }]);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const quick = ['help', 'whoami', 'experience', 'skills', 'contact', 'sudo hire-me'];

  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-bg-soft shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-faint">guest@enamul: ~</span>
      </div>

      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        className="h-[22rem] cursor-text overflow-y-auto p-4 font-mono text-[13px] leading-relaxed text-muted sm:p-5 sm:text-sm"
      >
        {lines.map((l) =>
          l.kind === 'input' ? (
            <div key={l.id} className="mt-2 text-ink">
              <span className="text-accent">❯</span> {l.content}
            </div>
          ) : (
            <div key={l.id} className="mt-1 break-words">
              {l.content}
            </div>
          ),
        )}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-accent">❯</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal input"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-ink caret-[var(--accent)] outline-none"
            placeholder="type a command…"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
        {quick.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => run(q)}
            className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] text-muted transition hover:border-accent hover:text-accent"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
