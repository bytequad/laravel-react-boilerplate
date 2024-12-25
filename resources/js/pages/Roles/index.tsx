import RolesFeatureFeature from '@/features/roles';
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
                <title>Roles</title>
            </Head>
            <AuthenticatedLayout>
                <RolesFeatureFeature {...props} />
            </AuthenticatedLayout>
        </>
    );
}

export default index;
