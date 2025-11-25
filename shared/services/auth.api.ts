import api from "@/lib/api";

export const login = async (data: { email: string; password: string ,role:string}) => {
  try {
    console.log(data,'In service brooooooooo front end tooo');
    
    const response = await api.post("/auth/signin", data);
    return response.data
  } catch (error) {
    throw error
  }
};

export const fetchUser = async () => {
  try {
    
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    console.log(error,'errror frno fetch')
    // throw error
  }
};

export const signup = async (data: {
  name?: string;
  email: string;
  password: string;
  role:string
}) => {
  try {
    const response = await api.post("/auth/signup", data);
    return response.data;
  } catch (error) {
    throw error
  }
};

export const verifyOtp = async (otp: string) => {
  try {
    const response = await api.post("/auth/verify-otp", { otp });
    return response.data;
  } catch (error) {
    console.log(error,'verify otp')
    throw error
  }
};

export const resendOtp = async (email: string) => {
  try {
    const response = await api.post("/auth/resend-otp", { email });
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
    console.log(response.data,'in forgot password from backend');
    
    return response.data;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const verifyForgotPassword = async (otp: string) => {
  try {
    const response = await api.post("/auth/verify-forgotPassword", { otp });
    return response.data;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const resetPassword = async (email: string, password: string) => {
  try {
    console.log(email,'email',password,'password','from reset-password service in frnotend');    
    const response = await api.patch("/auth/reset-password", { email, password });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error;
  }
};
// page refresh access token checking
export const checkAuth = async() =>{
  try {
  const res = await api.get('/auth/me')
  return res.data
  } catch (error) {
    throw error
  }
}
export const logout = async ()=>{
  try {
    const response = await api.post('/auth/logout')
    console.log(response,'response in logouttttttt')
    return response.data
  } catch (error) {
    console.log(error);
    throw error
  }
}