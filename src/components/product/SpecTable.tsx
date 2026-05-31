type SpecGroup = {
  title?: string;
  rows: [string, string][];
};

type SpecTableProps = {
  groups: SpecGroup[];
};

export function SpecTable({ groups }: SpecTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      {groups.map((group, gi) => (
        <div key={group.title ?? gi}>
          {group.title ? (
            <div className="border-b border-border/60 bg-surface-2 px-6 py-3 font-mono text-xs uppercase tracking-wider text-faint">
              {group.title}
            </div>
          ) : null}
          <dl>
            {group.rows.map(([k, v]) => (
              <div
                key={k}
                className="flex flex-col gap-1 border-b border-border/60 px-6 py-4 last:border-0 sm:flex-row sm:gap-6"
              >
                <dt className="w-40 shrink-0 font-mono text-xs uppercase tracking-wider text-faint">
                  {k}
                </dt>
                <dd className="text-sm text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
