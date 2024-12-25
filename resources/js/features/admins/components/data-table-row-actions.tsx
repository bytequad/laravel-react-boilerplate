import { Button } from '@/components/ui/button';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Row } from '@tanstack/react-table';
import { useAdminsContext } from '../context/admins-context';
import { Admin } from '../data/schema';

interface DataTableRowActionsProps {
    row: Row<Admin>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
    const { setOpen, setCurrentRow } = useAdminsContext();
    return (
        <div className="flex space-x-2">
            {/* Edit Button */}
            <Button
                variant="outline"
                onClick={() => {
                    setCurrentRow(row.original);
                    setOpen('edit');
                }}
            >
                <IconEdit size={16} />
            </Button>
            <DropdownMenuSeparator />
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
        </div>
    );
}
