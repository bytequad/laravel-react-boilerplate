import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { appendQueryParams, useQueryParams } from '@/lib/utils';
import { Table } from '@tanstack/react-table';

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
}

export function DataTablePagination<TData>({
    table,
}: DataTablePaginationProps<TData>) {
    const query = useQueryParams();
    const getUrl = (url: string | null) =>
        url ? appendQueryParams(url, query, 'page') : '#';

    return (
        <div className="flex items-center justify-between overflow-auto px-2">
            <div className="hidden flex-1 text-sm text-muted-foreground sm:block">
                {table.getFilteredSelectedRowModel().rows.length} of{' '}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center sm:space-x-9 lg:space-x-10">
                <div className="flex items-center">
                    {/* <p className="hidden text-sm font-medium sm:block">
                        Rows per page
                    </p> */}
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue
                                placeholder={
                                    table.getState().pagination.pageSize
                                }
                            />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={`${pageSize}`}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {/* <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount()}
                </div> */}
                <Pagination>
                    <PaginationContent>
                        {table.getState().links.map((item, index) => (
                            <PaginationItem key={index}>
                                {index == 0 ? (
                                    <PaginationPrevious
                                        disabled={item.url == null}
                                        href={getUrl(item.url)}
                                        isActive={item.active}
                                    />
                                ) : index ==
                                  table.getState().links.length - 1 ? (
                                    <PaginationNext
                                        disabled={item.url == null}
                                        href={getUrl(item.url)}
                                        isActive={item.active}
                                    />
                                ) : (
                                    <PaginationLink
                                        href={getUrl(item.url)}
                                        isActive={item.active}
                                    >
                                        {item.label}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ))}
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
