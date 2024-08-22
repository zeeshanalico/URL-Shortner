'use client';
import React, { useState } from 'react';
import {
    useGetApiKeysQuery,
    useCreateApiKeyMutation,
    useDeleteApiKeyMutation,
    ApiKey,
    CreateApiKeyDto
} from '@/app/store/slices/ApiKeyapiSlice/ApiKeyapiSlice';
import { handleSimpleCopyClick } from '@/app/utils/handleCopyClick';
import { AddIcon } from '../../../../public/icons';
import { toast } from 'react-toastify';
import errorHandler from '@/app/Error/errorHandler';
import { CopyIcon, DeleteIcon } from '../../../../public/icons';
import DateField from '@/app/components/coreComponents/DateField';

const ApiKeyPage = () => {
    const { data: apiKeys, isLoading } = useGetApiKeysQuery();
    const [createApiKey] = useCreateApiKeyMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<CreateApiKeyDto>({ expiration_date: '' });

    const [deleteMutation] = useDeleteApiKeyMutation()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleGenerateApiKey = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        try {
            const res: any = await createApiKey(formData).unwrap()            
            if(res.status){
                toast.success('Api generated Successfully')
                setIsModalOpen(false);
                setFormData({ expiration_date: '' });
            }
        } catch (e:any) {
            toast.error(e.data.message[0])
        }

    };

    const handleDelete = async (api_key_id: number) => {
        try {
            const response = await deleteMutation(api_key_id);
            toast.success('API key delete successfully!');

        } catch (error) {
            errorHandler(error)
        }

    }
    if (isLoading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Api Keys</h1>
                <button
                    className="flex items-center justify-center p-2 rounded bg-green-500 hover:bg-green-600"
                    onClick={handleGenerateApiKey}                >
                    <AddIcon className="h-6 w-6 text-white" />
                    <span className="ml-2 text-white">Generate API Key</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b">API Key</th>
                            <th className="py-2 px-4 border-b">Created At</th>
                            <th className="py-2 px-4 border-b">Expires At</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apiKeys?.map((apiKey: ApiKey) => (
                            <tr key={apiKey.api_key_id} className="bg-white hover:bg-gray-50">
                                <td className="py-2 px-4 border-b text-center whitespace-nowrap">{apiKey.api_key}
                                    <button
                                        title='click to copy api key'
                                        onClick={() => handleSimpleCopyClick(apiKey.api_key)} className="ml-2 text-blue-500"
                                    >
                                        <CopyIcon />
                                    </button>
                                </td>
                                <td className="py-2 px-4 border-b text-center whitespace-nowrap">{new Date(apiKey.created_at).toLocaleString()}</td>
                                <td className="py-2 px-4 border-b text-center whitespace-nowrap">
                                    {apiKey.expires_at ? new Date(apiKey.expires_at).toLocaleString() : 'N/A'}
                                </td>
                                <td className="py-2 px-4 border-b text-center whitespace-nowrap">
                                    <button
                                        title='click to copy api key'
                                        onClick={() => handleDelete(apiKey.api_key_id)} className="ml-2 text-blue-500"
                                    >
                                        <DeleteIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg space-y-4 w-96">
                        <h2 className="text-xl font-semibold">Generate API Key</h2>
                        <DateField
                            id="expiration_date"
                            label="Expiry Date"
                            value={formData.expiration_date ?? ''}
                            onChange={handleInputChange}
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleSubmit}
                            >
                                Generate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApiKeyPage;
