import DataTable from '@/components/ui/data-table';
import { PAGE_ROUTES } from '@/config/page.routes';
import { debounce } from '@/utils';
import { router, usePage } from '@inertiajs/react';
import {
    ColumnDef,
    ColumnFiltersState,
    RowData,
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

export function UsersTable({
    columns,
    data,
    links,
    sort_by,
    per_page,
    sort_direction,
}: DataTableProps) {
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );

    const [sorting, setSorting] = useState<SortingState>(() =>
        sort_by ? [{ id: sort_by, desc: sort_direction === 'desc' }] : [],
    );

    const query = (usePage().props.ziggy as Record<any, any>).query;

    const [pagination, setPagination] = useState({
        pageSize: per_page,
        pageIndex: 0,
    });

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            pagination,
            columnVisibility,
            rowSelection,
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
                route(PAGE_ROUTES.users, {
                    ...query,
                    sort_by: sortingData.id,
                    sort_direction: sortingData.desc ? 'desc' : 'asc',
                }),
            );
        },
        onPaginationChange: (newPagination) => {
            const paginationArr =
                newPagination instanceof Function
                    ? newPagination(pagination)
                    : newPagination;
            setPagination(paginationArr);

            router.get(
                route(PAGE_ROUTES.users, {
                    ...query,
                    page: undefined,
                    per_page: paginationArr.pageSize,
                }),
            );
        },
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
