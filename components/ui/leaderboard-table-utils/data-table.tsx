"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DataTableColumn<T> {
  id: string;
  header: React.ReactNode;
  sortable?: boolean;
  numeric?: boolean;
  align?: "left" | "center" | "right";
  width?: number | string;
  hideBelow?: "sm" | "md" | "lg" | "xl";
  value: (row: T) => any;
  cell: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  rowId: (row: T) => string;
  rowLabel?: (row: T) => string;
  caption?: string;
  variant?: "panel" | "striped";
  title?: string;
  defaultSort?: { columnId: string; direction: "asc" | "desc" };
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  rowId,
  caption,
  variant = "panel",
  title,
  defaultSort,
  className,
}: DataTableProps<T>) {
  const [sortState, setSortState] = React.useState<{
    columnId: string;
    direction: "asc" | "desc";
  }>(defaultSort || { columnId: columns[0]?.id || "", direction: "asc" });

  const handleSort = (columnId: string) => {
    setSortState((prev) => {
      if (prev.columnId === columnId) {
        return {
          columnId,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { columnId, direction: "asc" };
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortState.columnId) return data;
    const col = columns.find((c) => c.id === sortState.columnId);
    if (!col) return data;

    return [...data].sort((a, b) => {
      const valA = col.value(a);
      const valB = col.value(b);

      if (valA === valB) return 0;
      if (valA == null) return 1;
      if (valB == null) return -1;

      const comp =
        typeof valA === "number" && typeof valB === "number"
          ? valA - valB
          : String(valA).localeCompare(String(valB));

      return sortState.direction === "asc" ? comp : -comp;
    });
  }, [data, columns, sortState]);

  const getHideClass = (hideBelow?: "sm" | "md" | "lg" | "xl") => {
    switch (hideBelow) {
      case "sm":
        return "hidden sm:table-cell";
      case "md":
        return "hidden md:table-cell";
      case "lg":
        return "hidden lg:table-cell";
      case "xl":
        return "hidden xl:table-cell";
      default:
        return "";
    }
  };

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md overflow-hidden shadow-2xl transition-all",
        className
      )}
    >
      {(title || caption) && (
        <div className="border-b border-white/[0.08] px-6 py-5">
          {title && (
            <h3 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              {title}
            </h3>
          )}
          {caption && (
            <p className="mt-1 text-xs text-neutral-400 font-normal tracking-tight">
              {caption}
            </p>
          )}
        </div>
      )}

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.01] text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              {columns.map((col) => {
                const isSorted = sortState.columnId === col.id;
                return (
                  <th
                    key={col.id}
                    style={{ width: col.width }}
                    onClick={() => col.sortable && handleSort(col.id)}
                    className={cn(
                      "px-4 py-3.5 select-none transition-colors",
                      col.sortable && "cursor-pointer hover:text-white",
                      col.align === "center" && "text-center",
                      col.align === "right" && "text-right",
                      getHideClass(col.hideBelow)
                    )}
                  >
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5",
                        col.align === "center" && "justify-center",
                        col.align === "right" && "justify-end"
                      )}
                    >
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className="text-[10px] opacity-70">
                          {isSorted
                            ? sortState.direction === "asc"
                              ? "▲"
                              : "▼"
                            : "⇅"}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {sortedData.map((row, idx) => (
              <tr
                key={rowId(row)}
                className={cn(
                  "transition-colors hover:bg-white/[0.04]",
                  variant === "striped" && idx % 2 === 1 && "bg-white/[0.015]"
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.id}
                    className={cn(
                      "px-4 py-3.5 text-sm",
                      col.align === "center" && "text-center",
                      col.align === "right" && "text-right",
                      getHideClass(col.hideBelow)
                    )}
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
