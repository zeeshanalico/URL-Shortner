import React from 'react';
import { Card, CardContent, CardHeader } from '@/app/components/ui/Card';
import { Logo } from '@/app/store/slices/logoSlice/logoApiSlice';

const UrlClick = ({ logos }: { logos: Logo[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {logos && logos.map((logo) => (
                <Card key={logo.logo_id} className="bg-white shadow-md rounded-lg overflow-hidden">
                    <CardHeader>
                        <h2 className="text-lg font-bold">Logo ID: {logo.logo_id}</h2>
                    </CardHeader>
                    <CardContent>
                        <img src={logo.logo_path} alt="Logo" className="w-full h-auto object-contain" />
                        <p className="text-gray-600 mt-2">Created At: {new Date(logo.created_at).toLocaleDateString()}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default UrlClick;
