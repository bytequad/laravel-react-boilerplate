import UsersFeature from '@/features/users';
import { UsersResponse } from '@/features/users/users.type';
import withPermission from '@/hoc/with-permission';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
type Props = {
    users: UsersResponse;
};

function Users(props: Props) {
    console.log("🚀 ~ Users ~ Props:", props)
    return (
        <AuthenticatedLayout>
            <Head title="Users" />
            <UsersFeature {...props} />
        </AuthenticatedLayout>
    );
}

export default withPermission(Users, 'read_users');
