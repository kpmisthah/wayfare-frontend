import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { StatusCode } from "@/shared/enums/status-code.enum";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});


api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<{ message?: string; statusCode?: number }>) => {

    const silentErrors = [StatusCode.UNAUTHORIZED]; 

    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.message || 'Something went wrong';

      if (!silentErrors.includes(statusCode)) {
        switch (statusCode) {
          case StatusCode.BAD_REQUEST:
            toast.error('Bad Request', {
              description: errorMessage,
            });
            break;
          case StatusCode.FORBIDDEN:
            toast.error('Access Denied', {
              description: 'You do not have permission to perform this action.',
            });
            break;
          case StatusCode.NOT_FOUND:
            toast.error('Not Found', {
              description: errorMessage,
            });
            break;
          case StatusCode.CONFLICT:
            toast.error('Conflict', {
              description: errorMessage,
            });
            break;
          case StatusCode.UNPROCESSABLE_ENTITY:
            toast.error('Validation Error', {
              description: errorMessage,
            });
            break;
          case StatusCode.TOO_MANY_REQUESTS:
            toast.error('Too Many Requests', {
              description: 'Please slow down and try again later.',
            });
            break;
          case StatusCode.INTERNAL_SERVER_ERROR:
          case StatusCode.BAD_GATEWAY:
          case StatusCode.SERVICE_UNAVAILABLE:
            toast.error('Server Error', {
              description: 'Something went wrong on our end. Please try again later.',
            });
            break;
          default:
            toast.error('Error', {
              description: errorMessage,
            });
        }
      }
    } else if (error.request) {
      // Network error - no response received
      toast.error('Network Error', {
        description: 'Unable to connect to server. Please check your internet connection.',
      });
    }

    // Re-throw the error so it can still be caught by specific handlers
    return Promise.reject(error);
  }
);

export default api;