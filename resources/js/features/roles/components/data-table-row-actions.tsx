import { Button } from '@/components/ui/button';
import { WEB_ROUTES } from '@/config/web.routes';
import usePermission from '@/hooks/use-permission';
import { router } from '@inertiajs/react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Row } from '@tanstack/react-table';
import { useUsersContext } from '../context/users-context';
import { User } from '../data/schema';

interface DataTableRowActionsProps {
    row: Row<User>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
    const { setOpen, setCurrentRow } = useUsersContext();
    const hasEditPermission = usePermission('update_roles');
    const hasDeletePermission = usePermission('delete_roles');
    return (
        <div className="flex space-x-2">
            {/* Edit Button */}
            {hasEditPermission && (
                <Button
                    variant="outline"
                    onClick={() => {
                        setCurrentRow(row.original);
                        router.get(
                            route(WEB_ROUTES.roles_edit, row.original.id),
                        );
                    }}
                >
                    <IconEdit size={16} />
                </Button>
            )}

            {/* Delete Button */}
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
