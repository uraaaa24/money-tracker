'use client'

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { isError } from '@/lib/type-guard'

import { Skeleton } from '../ui/skeleton'

const COL_SPAN = 10

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading: boolean
  error: Error
}

const DataTable = <TData, TValue>({
  columns,
  data,
  isLoading,
  error,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="border rounded-lg bg-white">
      <Table>
        {/* Header */}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className='pointer-events-none'>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className='py-2 px-6 text-gray-500'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        {/* Body */}
        <TableBody>
          {isLoading ? (
            Array.from({ length: COL_SPAN }, (_, i) => {
              const uniqueKey = `loading-${i}`
              return (
                <TableRow key={uniqueKey}>
                  {columns.map((col, colIdx) => (
                    <TableCell
                      key={String(col.id ?? colIdx)}
                      className="py-2 px-6"
                    >
                      <Skeleton className="h-9 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              )
            })
          ) : error ? (
            <TableRow>
              <TableCell colSpan={COL_SPAN} className="h-24 text-center text-destructive">
                {isError(error)
                  ? error.message
                  : 'Something went wrong. Please try again later.'
                }
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className='py-2 px-6'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default DataTable
