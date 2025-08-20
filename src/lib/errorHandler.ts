import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export const handleServiceError = (error: unknown, defaultMessage: string): void => {
  console.error(defaultMessage, error);
  
  if (error instanceof AxiosError) {
    if (error.response?.data && typeof error.response.data === 'string') {
      toast.error(error.response.data);
      return;
    }
    
    if (error.response?.status && error.response.status >= 500) {
      toast.error("Erro no servidor. Tente novamente mais tarde.");
      return;
    }
    
    if (!error.response) {
      toast.error("Erro inesperado. Tente novamente mais tarde.");
      return;
    }
  }
  
  toast.error(defaultMessage);
};
