'use client';
import React, { useState } from 'react';
import { AddIcon, AssignIcon } from '../../../../public/icons';
import { toast } from 'react-toastify';
import errorHandler from '@/app/Error/errorHandler';
import {
    useUpdatePregeneratedUrlMutation,
    useGetUrlsQuery,
    useGetUrlTypesQuery,
    usePregenrateMutation,
} from '@/app/store/slices/urlSlice/urlApiSlice';
import SelectField from '../../components/coreComponents/SelectField';
import { handleCopyClick } from '@/app/utils/handleCopyClick';
import InputField from '../../components/coreComponents/InputField'; // Assuming these components exist
import DateField from '../../components/coreComponents/DateField';
import DataList from '../../components/coreComponents/DataList';
import { useGetUrlTagsQuery } from '@/app/store/slices/urlSlice/urlApiSlice';
import { validateGenerateUrlForm } from '@/app/validations/urlFormValidation';
import { GenerateUrlFormState as FormState } from '@/app/types/url';
import { Url } from '@/app/types/url';

const Page = () => {
    const [pageNumber, setPageNumber] = useState(1);

    const { data: { urls = [], limit, totalRecords } = {}, isLoading, error } = useGetUrlsQuery({ pregenerated: true, pageNumber, limit: 10 });
    const [pregenerate] = usePregenrateMutation();
    const [mutatePregenerate] = useUpdatePregeneratedUrlMutation();
    const { data: urlTags = [], isLoading: urlTagsLoading } = useGetUrlTagsQuery();
    const { data: urlTypes = [] } = useGetUrlTypesQuery();
    const [selectedPreGeneratedUrl, setSelectedPreGeneratedUrl] = useState({ url_id: '' });

    const [urlType, setUrlType] = useState({ url_type: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalReserveUrlOpen, setIsReserveUrlModalOpen] = useState(false);
    const [formState, setFormState] = useState<FormState>({
        original_url: '',
        url_type: '',
        expiration_date: '',
        tag_name: '',
        url_id: ''
    });


    const handleOpenModal = (url: any) => {
        setFormState({
            original_url: url?.original_url || '',
            expiration_date: url?.expiration_date || '',
            tag_name: url?.tag_name || '',
            url_type: url?.url_type || '',
            url_id: url?.url_id || '',
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsReserveUrlModalOpen(false);
        setFormState({
            original_url: '',
            expiration_date: '',
            tag_name: '',
            url_type: '',
        });
        setUrlType({ url_type: "" });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { id, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        try {
            const validFormData = validateGenerateUrlForm(formState);
            await mutatePregenerate(validFormData).unwrap();
            toast.success('Short URL generated successfully!');
            handleCloseModal();
        } catch (error) {
            errorHandler(error);
        }

    };
    const handleReserverChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setUrlType(prevState => ({
            ...prevState,
            [id]: value
        }));
    };
    if (isLoading) return <div>Loading ...</div>;
    if (error) return <div>Error loading data</div>;

    const handleReserveSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await pregenerate(urlType);
        if (data)
            toast.success('Short URL pre-generated successfully!');

        handleCloseModal();
        setUrlType({ url_type: "" });
    };

    const totalPages = Math.ceil(totalRecords / parseInt(limit as unknown as string));

    const handleNextPage = () => {
        if (pageNumber < totalPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    const handlePrevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };


    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Reserved URLs</h1>
                <button
                    className="flex items-center justify-center p-2 rounded bg-green-500 hover:bg-green-600"
                    onClick={() => setIsReserveUrlModalOpen(true)}
                >
                    <AddIcon className="h-6 w-6 text-white" />
                    <span className="ml-2 text-white">Reserve URLs</span>
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Short URL</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-left">Type</th>
                            <th className="py-3 px-6 text-left">Expiry Date</th>
                            <th className="py-3 px-6 text-left">Assign</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {urls.map((url) => (
                            <tr
                                key={url.url_id}
                                className="border-b border-gray-200 hover:bg-gray-100"
                            >
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <span
                                        className="font-medium hover:cursor-pointer"
                                        onClick={() => handleCopyClick(url.short_url)}
                                    >
                                        {url.short_url}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{url.status}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{url.url_type}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{url.expiration_date ?? 'N/A'}</span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        onClick={() => handleOpenModal(url)}
                                    >
                                        <AssignIcon className="h-6 w-6 text-green-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="inline-flex rounded-md shadow-sm mt-4 " role="group">
                    <button
                        onClick={handlePrevPage}
                        disabled={pageNumber === 1}
                        className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-s-lg ${pageNumber === 1 ? 'bg-gray-300' : 'hover:bg-green-600 bg-green-400 text-white'
                            }`}
                    >
                        Prev
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={pageNumber >= totalPages}
                        className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-e-lg ${pageNumber >= totalPages ? 'bg-gray-300' : 'hover:bg-green-600 bg-green-400 text-white'}`}
                    >
                        Next
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-xl mb-4">Assign URL</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 border border-gray-300 rounded-lg bg-white shadow-md">
                            <InputField
                                id="original_url"
                                label="Original URL"
                                value={formState.original_url}
                                onChange={handleChange}
                                placeholder="Enter URL"
                            />

                            <DataList
                                id="tag_name"
                                label="Add a Tag"
                                value={formState.tag_name ?? ''}
                                onChange={handleChange}
                                options={urlTags.map((tag) => tag.tag_name)}
                                placeholder="Tag e.g. #store"
                            />

                            <DateField
                                id="expiration_date"
                                label="Expiry Date"
                                value={formState.expiration_date}
                                onChange={handleChange}
                            />

                            <SelectField
                                id="url_type"
                                label="Type"
                                value={formState.url_type}
                                onChange={handleChange}
                                options={urlTypes.map((type) => ({
                                    value: type,
                                    label: type.charAt(0).toUpperCase() + type.slice(1),
                                }))}
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isModalReserveUrlOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-xl mb-4">Reserve Urls</h2>
                        <form onSubmit={handleReserveSubmit}>
                            <div className="mb-4">
                                <SelectField
                                    id="url_type"
                                    label="Type"
                                    value={urlType.url_type}
                                    onChange={handleReserverChange}
                                    options={urlTypes.map(type => ({ value: type, label: type.charAt(0).toUpperCase() + type.slice(1) }))}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Generate
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
