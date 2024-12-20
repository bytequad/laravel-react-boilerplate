import { Header } from '@/components/core-layouts/header';
import { Main } from '@/components/core-layouts/main';
import { Button } from '@/components/ui/button';
import { ProfileDropdown } from '@/components/ui/profile-dropdown';
import { Search } from '@/components/ui/search';
import { ThemeSwitch } from '@/components/ui/theme-switch';
import useDialogState from '@/hooks/use-dialog-state';
import { IconUserShield } from '@tabler/icons-react';
import { useState } from 'react';
import { RolesDeleteDialog } from './components/roles-delete-dialog';
import { RolesTable } from './components/roles-table';
import { UsersActionDialog } from './components/users-action-dialog';
import { columns } from './components/users-columns';
import { UsersInviteDialog } from './components/users-invite-dialog';
import UsersContextProvider, {
    type UsersDialogType,
} from './context/users-context';
import { User } from './data/schema';
import { Link } from '@inertiajs/react';
import { WEB_ROUTES } from '@/config/web.routes';

export default function RolesFeature({
    roles,
    search,
    sort_by,
    sort_direction,
}) {
    const [currentRow, setCurrentRow] = useState<User | null>(null);
    const [open, setOpen] = useDialogState<UsersDialogType>(null);
    const atr = { search, sort_by, sort_direction };
    // Parse user list
    // const userList = userListSchema.parse(users);
    const userList = roles.data;

    return (
        <UsersContextProvider
            value={{ open, setOpen, currentRow, setCurrentRow }}
        >
            <Main>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Roles List
                        </h2>
                        <p className="text-muted-foreground">
                            Manage roles and their permisisons here.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild className="space-x-1">
                            <Link href={route(WEB_ROUTES.roles_create)}>
                                <span>Add Role</span>{' '}
                                <IconUserShield size={18} />
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <RolesTable
                        data={userList}
                        columns={columns}
                        links={roles.links}
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

                    <RolesDeleteDialog
                        key={`role-delete-${currentRow.id}`}
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
