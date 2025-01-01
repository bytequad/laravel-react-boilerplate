import { Button } from '@/components/ui/button';
import { PAGE_ROUTES } from '@/config/page.routes';
import { Link } from '@inertiajs/react';
import {
    AlertTriangle,
    ArrowLeft,
    Ban,
    FileQuestion,
    Server,
} from 'lucide-react';

interface ErrorPageProps {
    status: 404 | 403 | 500 | 503;
}

const statusInfo = {
    503: {
        title: '503: Service Unavailable',
        description:
            'Sorry, we are doing some maintenance. Please check back soon.',
        Icon: Server,
    },
    500: {
        title: '500: Server Error',
        description: 'Whoops, something went wrong on our servers.',
        Icon: AlertTriangle,
    },
    404: {
        title: '404: Page Not Found',
        description: 'Sorry, the page you are looking for could not be found.',
        Icon: FileQuestion,
    },
    403: {
        title: '403: Forbidden',
        description: 'Sorry, you are forbidden from accessing this page.',
        Icon: Ban,
    },
};

export default function ErrorPage({ status }: ErrorPageProps) {
    const { title, description, Icon } = statusInfo[status];

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <Icon className="mb-4 h-24 w-24 text-gray-400" />
            <h1 className="mb-4 text-6xl font-bold text-gray-800">{status}</h1>
            <h2 className="mb-4 text-2xl font-semibold text-gray-600">
                {title}
            </h2>
            <p className="mb-8 text-gray-500">{description}</p>
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
    );
}
