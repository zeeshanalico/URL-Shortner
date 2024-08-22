import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
import { DownloadIcon } from '../../../../public/icons';
const ImageToggle = ({ short_url }: { short_url: string }) => {
    const [imagePath, setImagePath] = useState<string >('');
useEffect(() => {
    handleButtonClick()
},[])
    const handleButtonClick = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'}/url/qr-image/${short_url.slice(-14)}`, {
                    responseType: 'blob', // Response type is 'blob' for binary data like images
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`,
                    },
                });

                const imageUrl = URL.createObjectURL(response.data);
                setImagePath(imageUrl);
            } catch (error: unknown) {
                if (error instanceof AxiosError) {
                    toast.error(error.message);
                    console.error('Error fetching image:', error);
                } else {
                    console.error('Error fetching image:', error);
                }
            }
    };

    const handleDownload = () => {
        if (imagePath) {
            const link = document.createElement('a');
            link.href = imagePath;
            link.download = `${short_url.slice(-14)}.png`; // Suggest a file name
            link.click();
        }
    };

    return (
                <div className=' flex flow-row items-center gap-3 px-1'>
                    <button className='hover:cursor-pointer hover:rounded-md hover:bg-gray-100 p-1 bg-gray-50' title='Download QrCode '> 
                        
                        <DownloadIcon  className='h-4 w-4 ' onClick={handleDownload}/>
                        </button>
                    <div>
                        {[<img key={imagePath} src={imagePath} alt="QR Code" className='h-auto w-auto' />]}
                    </div>  
                </div>
    );
};

export default ImageToggle;

            // const fetchImage = async () => {
            //     try {
            //         const response = await axiosImageInstance.get(`/url/shorturl/${short_url}`, {
            //             responseType: 'arraybuffer', // Fetch the image as binary data
            //         });
    
            //         // Convert the binary data to a base64 string
            //         const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');
            //         const imageSrc = `data:image/png;base64,${imageBase64}`;
            //         setImagePath(imageSrc);
            //     } catch (error) {
            //         console.error('Error fetching image:', error);
            //     }
            // };