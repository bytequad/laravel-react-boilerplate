import UsersFeature from '@/features/users';
import { UsersResponse } from '@/features/users/users.type';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
type Props = {
    users: UsersResponse;
};

export default function Users(props: Props) {
    console.log("🚀 ~ Users ~ props:", props)
    return (
        <AuthenticatedLayout>
            <UsersFeature {...props} />
        </AuthenticatedLayout>
    );
}
