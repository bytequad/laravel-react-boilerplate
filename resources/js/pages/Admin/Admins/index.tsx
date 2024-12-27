import AdminsFeature from '@/features/admins';
import { AdminsResponse } from '@/features/admins/admins.type';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
type Props = {
    admins: AdminsResponse;
};

export default function Users(props: Props) {
    console.log('🚀 ~ Users ~ props:', props);
    return (
        <>
            <Head title="Admins" />
            <AuthenticatedLayout>
                <AdminsFeature {...props} />
            </AuthenticatedLayout>
        </>
    );
}
