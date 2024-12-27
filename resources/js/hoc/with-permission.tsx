import { WEB_ROUTES } from '@/config/web.routes';
import { router, usePage } from '@inertiajs/react';
import { ComponentType } from 'react';

interface Auth {
    user?: {
        permissions: string[];
    };
}

interface PageProps {
    auth: Auth;
}

function withPermission(
    WrappedComponent: ComponentType<any>,
    permission: string,
) {
    const WithPermissionComponent = (props: any) => {
        const { auth } = usePage<PageProps>().props;

        if (!auth.user?.permissions.includes(permission)) {
            router.visit(route(WEB_ROUTES.no_permiossion)); // Redirect to the no-permission page
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return WithPermissionComponent;
}

export default withPermission;
