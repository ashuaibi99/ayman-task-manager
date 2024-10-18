"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

export type Task = {
  id: number
  task: string
  status: string
  dateCreated: string
}

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "task",
    header: "Task",
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
  },
]
