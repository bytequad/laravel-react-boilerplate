import { Main } from '@/components/core-layouts/main';
import { Button } from '@/components/ui/button';
import useDialogState from '@/hooks/use-dialog-state';
import usePermission from '@/hooks/use-permission';
import { IconMailPlus, IconUserPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { UsersActionDialog } from './components/users-action-dialog';
import { columns } from './components/users-columns';
import { UsersDeleteDialog } from './components/users-delete-dialog';
import { UsersInviteDialog } from './components/users-invite-dialog';
import { UsersTable } from './components/users-table';
import UsersContextProvider, {
    type UsersDialogType,
} from './context/users-context';
import { User } from './data/schema';

export default function UsersFeature({
    search,
    sort_by,
    sort_direction,
    users
}) {
    const [currentRow, setCurrentRow] = useState<User | null>(null);
    const [open, setOpen] = useDialogState<UsersDialogType>(null);
    const hasCreatePermission = usePermission('create_users');
    console.log("🚀 ~ users:", users)

    const atr = { search, sort_by, sort_direction, per_page: users.per_page };
    const userList = users.data;

    return (
        <UsersContextProvider
            value={{ open, setOpen, currentRow, setCurrentRow }}
        >
            <Main>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            User List
                        </h2>
                        <p className="text-muted-foreground">
                            Manage your users and their roles here.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="space-x-1"
                            onClick={() => setOpen('invite')}
                        >
                            <span>Invite User</span> <IconMailPlus size={18} />
                        </Button>
                        {hasCreatePermission && (
                            <Button
                                className="space-x-1"
                                onClick={() => setOpen('add')}
                            >
                                <span>Add User</span> <IconUserPlus size={18} />
                            </Button>
                        )}
                    </div>
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <UsersTable
                        data={userList}
                        columns={columns}
                        links={users.links}
                        {...atr}
                    />
                </div>
            </Main>

            <UsersActionDialog
                key="user-add"
                open={open === 'add'}
                onOpenChange={() => setOpen('add')}
            />

            <UsersInviteDialog
                key="user-invite"
                open={open === 'invite'}
                onOpenChange={() => setOpen('invite')}
            />

            {currentRow && (
                <>
                    <UsersActionDialog
                        key={`user-edit-${currentRow.id}`}
                        open={open === 'edit'}
                        onOpenChange={() => {
                            setOpen('edit');
                            setTimeout(() => {
                                setCurrentRow(null);
                            }, 500);
                        }}
                        currentRow={currentRow}
                    />

                    <UsersDeleteDialog
                        key={`user-delete-${currentRow.id}`}
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
        </UsersContextProvider>
    );
}
