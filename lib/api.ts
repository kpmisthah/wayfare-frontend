import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { StatusCode } from "@/shared/enums/status-code.enum";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});


interface ApiErrorResponse {
  message?: string;
  statusCode?: number;
  code?: string;
  error?: string;
}

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    const silentError = error.config?.silentError;

    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.message || 'Something went wrong';

      const silentErrors = [StatusCode.UNAUTHORIZED];

      if (statusCode === StatusCode.UNAUTHORIZED) {
        const data = error.response.data;
        if (data?.code === 'USER_BLOCKED' || data?.message?.includes('blocked')) {
          toast.error('Account Blocked', {
            description: 'Your account has been blocked by the administrator.',
          });
          if (typeof window !== 'undefined') {
            const isAgency = window.location.pathname.startsWith('/agency');
            setTimeout(() => {
              window.location.href = isAgency ? '/agency/login' : '/login';
            }, 2000);
          }
        }
      }

      // Don't show toast if silentError flag is set
      if (!silentError && !silentErrors.includes(statusCode)) {
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
      toast.error('Network Error', {
        description: 'Unable to connect to server. Please check your internet connection.',
      });
    }

    return Promise.reject(error);
  }
);

export default api;