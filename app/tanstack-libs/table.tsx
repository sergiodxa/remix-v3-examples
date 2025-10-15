import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  createTable,
} from "@tanstack/table-core";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
};

const data: Person[] = [
  { firstName: "John", lastName: "Doe", age: 30, visits: 100 },
  { firstName: "Jane", lastName: "Smith", age: 25, visits: 150 },
  { firstName: "Bob", lastName: "Johnson", age: 35, visits: 75 },
  { firstName: "Alice", lastName: "Williams", age: 28, visits: 200 },
  { firstName: "Charlie", lastName: "Brown", age: 42, visits: 50 },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("firstName", { header: "First Name" }),
  columnHelper.accessor("lastName", { header: "Last Name" }),
  columnHelper.accessor("age", { header: "Age" }),
  columnHelper.accessor("visits", { header: "Visits" }),
];

export function TableExample(this: Remix.Handle) {
  let sorting: SortingState = [];

  const table = createTable({
    data,
    columns,
    state: {
      get sorting() {
        return sorting;
      },
      get columnPinning() {
        return { left: [], right: [] };
      },
    },
    onStateChange: () => this.update(),
    renderFallbackValue: undefined,
    onSortingChange: (updater: any) => {
      sorting = typeof updater === "function" ? updater(sorting) : updater;
      this.update();
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return () => {
    return (
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <th
                  key={header.id}
                  style={{
                    padding: "8px",
                    borderBottom: "2px solid #ddd",
                    textAlign: "left",
                    cursor: header.column.getCanSort() ? "pointer" : "default",
                  }}
                >
                  <div on={[press(() => header.column.toggleSorting())]}>
                    {typeof header.column.columnDef.header === "string"
                      ? header.column.columnDef.header
                      : header.id}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row: any) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell: any) => (
                <td
                  key={cell.id}
                  style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                >
                  {cell.getValue()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
}
