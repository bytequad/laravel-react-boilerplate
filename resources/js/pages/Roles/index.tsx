import RolesFeatureFeature from '@/features/roles';
import { RolesResponse } from '@/features/roles/roles.type';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
type Props = {
    users: RolesResponse;
};
function index(props: Props) {
    return (
        <AuthenticatedLayout>
            <RolesFeatureFeature {...props} />
        </AuthenticatedLayout>
    );
}

export default index;
