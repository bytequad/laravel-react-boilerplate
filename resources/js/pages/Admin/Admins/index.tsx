import AdminsFeature from '@/features/admins';
import { AdminsResponse } from '@/features/admins/admins.type';
import withPermission from '@/hoc/with-permission';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
type Props = {
    admins: AdminsResponse;
};

function index(props: Props) {
    return (
        <>
            <Head title="Admins" />
            <AuthenticatedLayout>
                <AdminsFeature {...props} />
            </AuthenticatedLayout>
        </>
    );
}
export default withPermission(index, 'read_admins');
