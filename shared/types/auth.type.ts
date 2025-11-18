import React from "react";

export interface SignupForm  {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  mobile?:string
  role?:string 
};
export interface LoginForm {
  email:string,
  password:string
}
export interface ErrorMessages {
  [key: string]: string; 
};

export interface AuthLayoutProps {
  children: React.ReactNode;
};
export interface AuthTokens {
  accessToken: string;

}

export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?:string

}

export interface AuthResponse {
  user:User
}

export interface AuthError {
  type:string
  field?:string
}

export interface UseSignupProps {
    role?:"USER"|'AGENCY'|'ADMIN'
    redirectUrl?:string
    onSubmit:(data:{name?:string,email:string,password:string,role:string})=>Promise<void>
    redirectLogin:string
}

export interface ResetProps {

  redirectPath?: string;
};

export interface ForgotPasswordProps {
  redirectUrl:string
  children?:React.ReactNode
}

export interface OTPPageProps {
  userEmail?: string;
  redirectUrl:string  
}