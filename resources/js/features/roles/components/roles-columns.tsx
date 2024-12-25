import { Checkbox } from '@/components/ui/checkbox';
import LongText from '@/components/ui/long-text';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<User>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        meta: {
            className: cn(
                'sticky md:table-cell left-0 z-10 rounded-tl',
                'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
            ),
        },
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'name',
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            return (
                <LongText className="max-w-36">{row.getValue('name')}</LongText>
            );
        },
        meta: { className: 'w-36' },
    },
    {
        accessorKey: 'display_name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Display Name" />
        ),
        cell: ({ row }) => (
            <div className="w-fit text-nowrap">
                {row.getValue('display_name')}
            </div>
        ),
    },
    {
        id: 'actions',
        cell: DataTableRowActions,
    },
];
