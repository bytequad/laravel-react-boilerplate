import { Main } from '@/components/core-layouts/main';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import CreateRoleForm from './components/create-role-form';

function Create({ permissions }) {
    return (
        <Main>
            <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Create Role
                    </h2>
                    <p className="text-muted-foreground">
                        Create role with permissions.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button asChild className="space-x-1" variant={'outline'}>
                        <Link href={route('roles')}>
                            <span>Back</span> <IconArrowNarrowLeft size={18} />
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            <CreateRoleForm />
            </div>
        </Main>
    );
}

export default Create;
