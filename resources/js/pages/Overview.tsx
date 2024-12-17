import Authenticated from '@/layouts/AuthenticatedLayout';
import React from 'react';

function Overview() {
    return <div>Overview</div>;
}

Overview.layout = (page: React.ReactNode) => <Authenticated children={page} />;
export default Overview;
