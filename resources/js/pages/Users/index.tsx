import UsersFeature from '@/features/users';
import { UsersResponse } from '@/features/users/users.type';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
type Props = {
    users: UsersResponse;
};

export default function Users({ users }: Props) {
    return (
        <AuthenticatedLayout>
            <UsersFeature users={users} />
        </AuthenticatedLayout>
    );
}
