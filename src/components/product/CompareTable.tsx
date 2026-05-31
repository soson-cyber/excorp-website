type CompareRow = {
  label: string;
  values: string[];
};

type CompareTableProps = {
  columns: string[];
  rows: CompareRow[];
  cornerLabel?: string;
};

export function CompareTable({ columns, rows, cornerLabel }: CompareTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse overflow-hidden rounded-2xl border border-border">
        <thead>
          <tr>
            <th
              scope="col"
              className="bg-surface-2 p-4 text-left font-mono text-xs uppercase tracking-wider text-faint"
            >
              {cornerLabel ?? ""}
            </th>
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="border-l border-border bg-surface-2 p-4 text-center text-sm font-semibold text-fg"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th
                scope="row"
                className="border-t border-border bg-surface p-4 text-left font-mono text-xs uppercase tracking-wider text-faint"
              >
                {row.label}
              </th>
              {row.values.map((v, i) => (
                <td
                  key={i}
                  className="border-l border-t border-border bg-surface p-4 text-center text-sm text-muted"
                >
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
