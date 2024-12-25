import { Button } from '@/components/ui/button';
import { IconAdminPlus, IconMailPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { AdminsActionDialog } from './admins-action-dialog';

export function AdminPrimaryActions() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="flex gap-2">
                <Button variant="outline">
                    Invite Admin
                    <IconMailPlus />
                </Button>
                <Button onClick={() => setOpen(true)}>
                    Add Admin
                    <IconAdminPlus />
                </Button>
            </div>

            <AdminsActionDialog
                key="admin-add"
                open={open}
                onOpenChange={setOpen}
            />
        </>
    );
}
