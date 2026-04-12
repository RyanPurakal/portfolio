function IconReact({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#61DAFB"
      strokeWidth="1"
      className={className}
      aria-hidden
    >
      <ellipse cx="12" cy="12" rx="11" ry="4.2" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="#61DAFB" stroke="none" />
    </svg>
  );
}

function IconTS({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path
        fill="white"
        d="M14.5 11.5v1.2c.5.3 1.1.4 1.7.4 1.2 0 1.9-.6 1.9-1.6 0-.8-.4-1.3-1.4-1.6l-.6-.2c-.4-.1-.6-.3-.6-.5 0-.3.3-.5.8-.5.4 0 .8.1 1.2.4l.9-1.1c-.5-.4-1.2-.7-2-.7-1.2 0-2 .6-2 1.5 0 .7.4 1.2 1.3 1.5l.5.2c.5.2.7.3.7.6 0 .3-.3.5-.9.5-.5 0-1-.2-1.5-.6l-1 1zm-4.2-4.2H8.8v6H7.3v-6H5.8V6.3h4.5v1z"
      />
    </svg>
  );
}

function IconPython({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#3776AB"
        d="M12 2C7.5 2 7 4.2 7 5.5V8h10V5.5C17 3.8 16.2 2 12 2zm-1 2h2v2h-2V4zM7 10c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h2v2.5c0 .8.7 1.5 1.5 1.5h5c.8 0 1.5-.7 1.5-1.5V14c0-1.1-.9-2-2-2H7zm1 2h8v6H8v-6zm11-8c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2h-2v2.5c0 .8-.7 1.5-1.5 1.5h-2v-2h2v-2h-4V8h10z"
      />
    </svg>
  );
}

function IconNode({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="#339933" className={className} aria-hidden>
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2l6.3 3.5v7l-6.3 3.5-6.3-3.5v-7L12 4.2zM9.5 9.5v5l2.5 1.4 2.5-1.4v-5L12 8l-2.5 1.5z" />
    </svg>
  );
}

function IconTailwind({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="#06B6D4" className={className} aria-hidden>
      <path d="M12 6c-2 0-3.25 1-4 3 1-1 2.1-1.4 3.3-.8.7.4 1.2 1 1.7 1.8 1.3 2.2 3.3 3.5 6 3.5 2 0 3.25-1 4-3-1 1-2.1 1.4-3.3.8-.7-.4-1.2-1-1.7-1.8C16.7 7.5 14.7 6 12 6zm-4 6c-2 0-3.25 1-4 3 1-1 2.1-1.4 3.3-.8.7.4 1.2 1 1.7 1.8 1.3 2.2 3.3 3.5 6 3.5 2 0 3.25-1 4-3-1 1-2.1 1.4-3.3.8-.7-.4-1.2-1-1.7-1.8C12.7 13.5 10.7 12 8 12z" />
    </svg>
  );
}

function IconFigma({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#F24E1E"
        d="M8 2a4 4 0 000 8v4a4 4 0 104 4V10a4 4 0 100-8H8zm8 0a4 4 0 014 4 4 4 0 01-4 4v-4a4 4 0 00-4-4h4z"
      />
    </svg>
  );
}

const stack = [
  { id: "react", label: "React", Icon: IconReact },
  { id: "ts", label: "TypeScript", Icon: IconTS },
  { id: "python", label: "Python", Icon: IconPython },
  { id: "node", label: "Node.js", Icon: IconNode },
  { id: "tailwind", label: "Tailwind CSS", Icon: IconTailwind },
  { id: "figma", label: "Figma", Icon: IconFigma },
] as const;

export function TechStackRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`} role="list">
      {stack.map(({ id, label, Icon }) => (
        <span
          key={id}
          role="listitem"
          title={label}
          className="border-border bg-secondary/30 text-muted-foreground hover:border-brand/50 inline-flex size-10 cursor-default items-center justify-center rounded-lg border transition-colors"
        >
          <Icon className="size-6" />
          <span className="sr-only">{label}</span>
        </span>
      ))}
    </div>
  );
}
