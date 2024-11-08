'use client'

import { ColumnDef } from '@tanstack/react-table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import * as React from 'react'
import { ArrowUpCircle, CheckCircle2, Circle, LucideIcon } from 'lucide-react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

export type Task = {
    id: number
    task: string
    status: string
    dateCreated: string
}

type Status = {
    value: string
    label: string
    icon: LucideIcon
}

const statuses: Status[] = [
    {
        value: 'todo',
        label: 'Todo',
        icon: Circle,
    },
    {
        value: 'in progress',
        label: 'In Progress',
        icon: ArrowUpCircle,
    },
    {
        value: 'done',
        label: 'Done',
        icon: CheckCircle2,
    },
]

export function ComboboxPopover({
    status,
    onStatusChange,
}: {
    status: string
    onStatusChange: (newStatus: string) => void
}) {
    const [open, setOpen] = React.useState(false)
    const selectedStatus = statuses.find((s) => s.value === status)

    return (
        <div className="flex items-center space-x-4">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-[150px] justify-start"
                    >
                        {selectedStatus ? (
                            <>
                                <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                                {selectedStatus.label}
                            </>
                        ) : (
                            <>+ Set status</>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                    <Command>
                        <CommandInput placeholder="Change status..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {statuses.map((status) => (
                                    <CommandItem
                                        key={status.value}
                                        value={status.value}
                                        onSelect={(value) => {
                                            onStatusChange(value) // Call the handler passed from App to update the status
                                            setOpen(false)
                                        }}
                                    >
                                        <status.icon
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                status.value ===
                                                    selectedStatus?.value
                                                    ? 'opacity-100'
                                                    : 'opacity-40'
                                            )}
                                        />
                                        <span>{status.label}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export const columns = (
    handleDelete: (id: number) => void,
    handleStatusChange: (id: number, newStatus: string) => void
): ColumnDef<Task>[] => [
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
            <ComboboxPopover
                status={row.original.status}
                onStatusChange={(newStatus) =>
                    handleStatusChange(row.original.id, newStatus)
                }
            />
        ),
    },
    {
        accessorKey: 'task',
        header: () => <div className="w-50">Task</div>,
    },
    {
        accessorKey: 'dateCreated',
        header: 'Date Created',
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => handleDelete(row.original.id)}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
