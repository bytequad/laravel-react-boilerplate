import Create from '@/features/roles/create';
import { RolesResponse } from '@/features/roles/roles.type';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
type Props = {
    users: RolesResponse;
};
function index(props: Props) {
    return (
        <>
            <Head>
                <title>Create Role</title>
            </Head>
            <AuthenticatedLayout>
                <Create {...props} />
            </AuthenticatedLayout>
        </>
    );
}

export default index;
