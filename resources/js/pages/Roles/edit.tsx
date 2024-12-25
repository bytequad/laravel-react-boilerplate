import Edit from '@/features/roles/edit';
import { PermissionsGrouped } from '@/features/roles/roles.type';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
type Props = {
    permissions: PermissionsGrouped;
};
function index(props: Props) {
    return (
        <>
            <Head>
                <title>Edit Role</title>
            </Head>
            <AuthenticatedLayout>
                <Edit {...props} />
            </AuthenticatedLayout>
        </>
    );
}

export default index;
