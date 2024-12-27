import { Button } from '@/components/ui/button';
import usePermission from '@/hooks/use-permission';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Row } from '@tanstack/react-table';
import { useUsersContext } from '../context/users-context';
import { User } from '../data/schema';

interface DataTableRowActionsProps {
    row: Row<User>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
    const { setOpen, setCurrentRow } = useUsersContext();
    const hasEditPermission = usePermission('update_users');
    const hasDeletePermission = usePermission('delete_users');

    return (
        <div className="flex space-x-2">
            {hasEditPermission && (
                <Button
                    variant="outline"
                    onClick={() => {
                        setCurrentRow(row.original);
                        setOpen('edit');
                    }}
                >
                    <IconEdit size={16} />
                </Button>
            )}
            {hasDeletePermission && (
                <Button
                    variant="outline"
                    onClick={() => {
                        setCurrentRow(row.original);
                        setOpen('delete');
                    }}
                    className="text-red-500"
                >
                    <IconTrash size={16} />
                </Button>
            )}
        </div>
    );
}
