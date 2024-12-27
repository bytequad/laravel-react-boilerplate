import DashboardPage from '@/features/dashboard';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <DashboardPage />
        </AuthenticatedLayout>
    );
}
