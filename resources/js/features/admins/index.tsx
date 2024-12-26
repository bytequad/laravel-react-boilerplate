import { Main } from '@/components/core-layouts/main';
import { Button } from '@/components/ui/button';
import useDialogState from '@/hooks/use-dialog-state';
import { IconMailPlus, IconUserShield } from '@tabler/icons-react';
import { useState } from 'react';
import { AdminsActionDialog } from './components/admins-action-dialog';
import { columns } from './components/admins-columns';
import { AdminsDeleteDialog } from './components/admins-delete-dialog';
import { AdminsInviteDialog } from './components/admins-invite-dialog';
import { AdminsTable } from './components/admins-table';
import AdminsContextProvider, {
    type AdminsDialogType,
} from './context/admins-context';
import { Admin } from './data/schema';

export default function AdminsFeature({
    admins,
    roles,
    search,
    sort_by,
    sort_direction,
}) {
    const [currentRow, setCurrentRow] = useState<Admin | null>(null);
    const [open, setOpen] = useDialogState<AdminsDialogType>(null);
    const atr = { search, sort_by, sort_direction };
    // Parse admin list
    // const adminList = adminListSchema.parse(admins);
    const adminList = admins.data;

    return (
        <AdminsContextProvider
            value={{ open, setOpen, currentRow, setCurrentRow, roles }}
        >
            <Main>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Admin List
                        </h2>
                        <p className="text-muted-foreground">
                            Manage your admins and their roles here.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="space-x-1"
                            onClick={() => setOpen('invite')}
                        >
                            <span>Invite Admin</span> <IconMailPlus size={18} />
                        </Button>
                        <Button
                            className="space-x-1"
                            onClick={() => setOpen('add')}
                        >
                            <span>Add Admin</span> <IconUserShield size={18} />
                        </Button>
                    </div>
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <AdminsTable
                        data={adminList}
                        columns={columns}
                        links={admins.links}
                        {...atr}
                    />
                </div>
            </Main>

            <AdminsActionDialog
                key="admin-add"
                open={open === 'add'}
                onOpenChange={() => setOpen('add')}
            />

            <AdminsInviteDialog
                key="admin-invite"
                open={open === 'invite'}
                onOpenChange={() => setOpen('invite')}
            />

            {currentRow && (
                <>
                    <AdminsActionDialog
                        key={`admin-edit-${currentRow.id}`}
                        open={open === 'edit'}
                        onOpenChange={() => {
                            setOpen('edit');
                            setTimeout(() => {
                                setCurrentRow(null);
                            }, 500);
                        }}
                        currentRow={currentRow}
                    />

                    <AdminsDeleteDialog
                        key={`admin-delete-${currentRow.id}`}
                        open={open === 'delete'}
                        onOpenChange={() => {
                            setOpen('delete');
                            setTimeout(() => {
                                setCurrentRow(null);
                            }, 500);
                        }}
                        currentRow={currentRow}
                    />
                </>
            )}
        </AdminsContextProvider>
    );
}
