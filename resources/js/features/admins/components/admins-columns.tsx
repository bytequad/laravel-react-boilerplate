import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import LongText from '@/components/ui/long-text';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Admin } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Admin>[] = [
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
        accessorKey: 'email',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => (
            <div className="w-fit text-nowrap">{row.getValue('email')}</div>
        ),
    },
    {
        accessorKey: 'roles',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Roles" />
        ),
        cell: ({ row }) => {
            const roles: [{ display_name: string; id: number }] =
                row.getValue('roles');
            return (
                <div className="flex space-x-2">
                    {roles.map((role) => (
                        <Badge key={role.id} className="w-fit text-nowrap">
                            {role.display_name}
                        </Badge>
                    ))}
                </div>
            );
        },
    },
    // {
    //     accessorKey: 'status',
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Status" />
    //     ),
    //     cell: ({ row }) => {
    //         const { status } = row.original;
    //         const badgeColor = callTypes.get(status);
    //         return (
    //             <div className="flex space-x-2">
    //                 <Badge
    //                     variant="outline"
    //                     className={cn('capitalize', badgeColor)}
    //                 >
    //                     {row.getValue('status')}
    //                 </Badge>
    //             </div>
    //         );
    //     },
    //     filterFn: 'weakEquals',
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    // {
    //     accessorKey: 'role',
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Role" />
    //     ),
    //     cell: ({ row }) => {
    //         const { role } = row.original;
    //         const adminType = adminTypes.find(({ value }) => value === role);

    //         if (!adminType) {
    //             return null;
    //         }

    //         return (
    //             <div className="flex items-center gap-x-2">
    //                 {adminType.icon && (
    //                     <adminType.icon
    //                         size={16}
    //                         className="text-muted-foreground"
    //                     />
    //                 )}
    //                 <span className="text-sm capitalize">
    //                     {row.getValue('role')}
    //                 </span>
    //             </div>
    //         );
    //     },
    //     filterFn: 'weakEquals',
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        id: 'actions',
        cell: DataTableRowActions,
    },
];
