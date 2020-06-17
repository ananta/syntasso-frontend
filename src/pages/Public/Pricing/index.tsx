import React from 'react';
import PricingTable from 'components/Common/PricingTable';

const Pricing = () => {
    return (
        <div>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold leading-tight text-gray-900">Subscriptions</h1>
                </div>
            </header>
            <PricingTable />
        </div>
    );
};

export default Pricing;
