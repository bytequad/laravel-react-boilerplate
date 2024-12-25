import AdminsFeature from '@/features/admins';
import { AdminsResponse } from '@/features/admins/admins.type';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
type Props = {
    admins: AdminsResponse;
};

export default function Users(props: Props) {
    console.log('🚀 ~ Users ~ props:', props);
    return (
        <AuthenticatedLayout>
            <AdminsFeature {...props} />
        </AuthenticatedLayout>
    );
}
