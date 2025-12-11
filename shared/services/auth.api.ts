import api from "@/lib/api";
import { toast } from "sonner";

export const login = async (data: { email: string; password: string; role: string }) => {
  try {
    console.log(data, 'In service front end');
    const response = await api.post("/auth/signin", data);
    toast.success('Welcome back!', {
      description: 'You have successfully logged in.',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    console.log(error, 'error from fetch user');
    // Silent - don't throw, just return undefined
  }
};

export const signup = async (data: {
  name?: string;
  email: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await api.post("/auth/signup", data);
    toast.success('Account created!', {
      description: 'Please check your email for the OTP verification code.',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (data: { otpCode: string; email: string }) => {
  try {
    const response = await api.post("/auth/verify-otp", data);
    toast.success('Email verified!', {
      description: 'Your email has been successfully verified.',
    });
    return response.data;
  } catch (error) {
    console.log(error, 'verify otp');
    throw error;
  }
};

export const resendOtp = async (email: string) => {
  try {
    const response = await api.post("/auth/resend-otp", { email });
    toast.success('OTP Sent!', {
      description: 'A new verification code has been sent to your email.',
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const googleLogin = (): void => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    console.log(response.data, 'in forgot password from backend');
    toast.success('Reset link sent!', {
      description: 'Check your email for the password reset instructions.',
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyForgotPassword = async (data: { otp: string; email: string }) => {
  try {
    const response = await api.post("/auth/verify-forgotPassword", data);
    toast.success('Code verified!', {
      description: 'You can now reset your password.',
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const resetPassword = async (email: string, password: string) => {
  try {
    console.log(email, 'email', password, 'password', 'from reset-password service');
    const response = await api.patch("/auth/reset-password", { email, password });
    toast.success('Password reset!', {
      description: 'Your password has been successfully changed.',
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// page refresh access token checking
export const checkAuth = async () => {
  try {
    const res = await api.get('/auth/me');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/auth/logout');
    console.log(response, 'response in logout');
    toast.success('Logged out', {
      description: 'You have been successfully logged out.',
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};