import { AxiosError } from 'axios';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import codeMessage from './codeMessage';
import { toast } from 'react-toastify';


interface ErrorResponse {
  data?: {
    message?: string[];
    jwtExpired?: boolean;
  };
  status?: number;
}

// for general error of any type AxiosError|Error
 const errorHandler = (error: any) => {
  console.error('Error:', error); 
  if (error instanceof AxiosError) {
    const { response, request, code } = error;
    if (response) {
      const { data, status } = response as ErrorResponse; // Type assertion
      const message = data?.message ? data.message : undefined; // Extract the first message if available
      const errorText = message || codeMessage[status!] || 'An unexpected error occurred'; 

      toast.error(`${status}: ${errorText}`);

      if (data?.jwtExpired) {
        toast.info('Session expired. Redirecting to login...');
        setTimeout(() => {
          window.location.href = '/logout';
        }, 3000);
      }

      return {
        success: false,
        status,
        message: errorText,
      };
    }

    if (request) {
      toast.error('Network error: Unable to connect to the server. Please check your internet connection.');
      return {
        success: false,
        message: 'Network error: Unable to connect to the server.',
      };
    }

    // Handle client-side errors with a code
    if (code) {
      toast.error(`Error code: ${code}`);
      return {
        success: false,
        message: `Error code: ${code}`,
      };
    }
  }else if ('status' in error) {
    // Handle FetchBaseQueryError
    const fetchError = error as FetchBaseQueryError;
    const errorMessage = fetchError.status
        ? `HTTP error: ${fetchError.status} - ${fetchError.data || 'Unknown error'}`
        : 'Network error';
    toast.error(`HTTP error: ${fetchError.status} - ${'Unknown error'}`);
  } else if ('message' in error) {
    // Handle SerializedError
    const serializedError = error as SerializedError;
    const errorMessage = serializedError.message || 'Unknown error';
    toast.error(errorMessage);
} 
   else if (error instanceof Error) {// Handle generic JavaScript errors
    toast.error(`Error: ${error.message}`);
    return {
      success: false,
      message: error.message,
    };
  } else {
    // Handle unexpected errors
    toast.error('An unexpected error occurred.');
    return {
      success: false,
      message: 'An unexpected error occurred.',
    };
  }
};

export default errorHandler;