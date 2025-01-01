import { Button } from '@/components/ui/button';
import { PAGE_ROUTES } from '@/config/page.routes';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Shield } from 'lucide-react';

export default function NoPermissionPage() {
    return (
        <>
            <Head title="No Permission" />
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="mb-4 flex justify-center">
                        <Shield className="h-24 w-24 text-red-500" />
                    </div>
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">
                        Access Denied
                    </h1>
                    <p className="mb-8 text-xl text-gray-600">
                        Sorry, you don't have permission to access this page.
                    </p>
                    <Button asChild>
                        <Link
                            href={route(PAGE_ROUTES.dashboard)}
                            className="inline-flex items-center"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Return to Home
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    );
}
