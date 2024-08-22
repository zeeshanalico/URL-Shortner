import { toast } from 'react-toastify';
import codeMessage from './codeMessage';

const successHandler = (response: any, options = { notifyOnSuccess: false, notifyOnFailed: true }) => {
    const { data,status } = response;
    if (data && data.success === true) {
        const message = data && data.message;
        const successText = message || codeMessage[status];

        if (options.notifyOnSuccess) {
            toast.success(successText);
        }
    } else {
        console.log(data);  
        const message = data && data.message;
        const errorText = message || codeMessage[status];
        if (options.notifyOnFailed) {
            toast.error(`${status}: ${errorText}`);
        }
    }
};

export default successHandler;
