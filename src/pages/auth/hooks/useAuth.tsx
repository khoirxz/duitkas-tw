import { useMutation } from "@tanstack/react-query";
import { login, checkEmail, signup } from "../services/authApi";

export const useLogin = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: (formData: FormData) => login(formData),
    ...options,
  });
};

export const useCheckEmail = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: (formData: FormData) => checkEmail(formData),
    ...options,
  });
};

export const useSignup = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: (formData: FormData) => signup(formData),
    ...options,
  });
};
