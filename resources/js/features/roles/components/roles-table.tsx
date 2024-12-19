import DataTable from '@/components/ui/data-table';
import { router, usePage } from '@inertiajs/react';
import {
    ColumnDef,
    ColumnFiltersState,
    RowData,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { User } from '../data/schema';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        className: string;
    }
    interface TableState {
        links: { url: string | null; label: string; active: boolean }[];
    }
}

interface DataTableProps {
    columns: ColumnDef<User>[];
    data: User[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export function RolesTable({
    columns,
    data,
    links,
    search,
    sort_by,
    sort_direction,
}: DataTableProps) {
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>(() =>
        sort_by ? [{ id: sort_by, desc: sort_direction === 'desc' }] : [],
    );
    const query = (usePage().props.ziggy as Record<any, any>).query;

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            links,
        },
        manualPagination: true,
        manualSorting: true,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: (newSorting) => {
            setSorting(newSorting);
            const sortingArr =
                newSorting instanceof Function
                    ? newSorting(sorting)
                    : newSorting;
            const sortingData = sortingArr[0];

            router.get(
                route('roles', {
                    ...query,
                    sort_by: sortingData.id,
                    sort_direction: sortingData.desc ? 'desc' : 'asc',
                }),
            );
        },
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    return (
        <div className="space-y-4">
            <DataTableToolbar table={table} />
            <DataTable table={table} isLoading={false} />
            <DataTablePagination table={table} />
        </div>
    );
}
