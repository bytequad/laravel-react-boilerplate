import { usePage, Inertia } from '@inertiajs/react';

interface Auth {
    user?: {
        permissions: string[];
    };
}

interface PageProps {
    auth: Auth;
}

const usePermission = (permission: string): boolean => {
    const { auth } = usePage<PageProps>().props;

    // Check if the user has the required permission
    const hasPermission = auth.user?.permissions.includes(permission);

    return hasPermission || false;
};

export default usePermission;
