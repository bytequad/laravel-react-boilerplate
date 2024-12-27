import { Button } from '@/components/ui/button';
import usePermission from '@/hooks/use-permission';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Row } from '@tanstack/react-table';
import { useAdminsContext } from '../context/admins-context';
import { Admin } from '../data/schema';

interface DataTableRowActionsProps {
    row: Row<Admin>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
    const { setOpen, setCurrentRow } = useAdminsContext();
    const hasEditPermission = usePermission('update_admins');
    const hasDeletePermission = usePermission('delete_admins');

    return (
        <div className="flex space-x-2">
            {/* Edit Button */}
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
                    className="!text-red-500"
                >
                    <IconTrash size={16} />
                </Button>
            )}
        </div>
    );
}
