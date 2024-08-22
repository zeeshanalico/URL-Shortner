
'use client'
import React from 'react'
import { useGetLogosQuery, useAddLogosMutation } from '../../store/slices/logoSlice/logoApiSlice'
import { toast } from 'react-toastify'
import MultiplePicturesUpload from '../../components/coreComponents/MultiplePicturesUpload'
import errorHandler from '@/app/Error/errorHandler'
import UrlClick from './UrlClicks'

const page = () => {
    const [addLogos, { isLoading, error }] = useAddLogosMutation();
    const { data: logos, error: fetchError } = useGetLogosQuery();
    console.log(logos);

    const fileHandler = async (files: File[]) => {
        try {
            const response = await addLogos({ files }).unwrap();
            if (response) {
                console.log(response);
                toast.success('File upload successful:');
            } else {
                toast.error('File upload failed.');
            }
        } catch (err) {
            console.error('File upload error:', err);
            toast.error('File upload failed.');
        }
    };

    if (isLoading) return <div>Loading...</div>
    return (
        <div>
            <MultiplePicturesUpload onUpload={fileHandler} />
            {fetchError && <div>Error loading logos...</div>}
            {logos && <UrlClick logos={logos} />}
        </div>
    )
}

export default page