import { useRouter } from "next/navigation";
import { logout } from "@/shared/services/auth.api";
import { useAuthStore } from "@/store/Auth";
export const useLogout = ()=>{
    const {clearAuth} = useAuthStore()
    const router = useRouter()

    const handleLogin = () => {
        router.push('/login')
    };
    
    const handleLogout = async () => {
     const response = await logout()
     let role = response?.role
     console.log(role,'==============frpm use-logout=============')
    clearAuth()
    if(role == 'ADMIN'){
      router.push("/admin/login")
    }
    if(role == 'AGENCY'){
      router.push('/agency/login')
    }
  };

  const handleSignUp = () => {
    router.push('/signup')
  };

  return {
    handleLogin,
    handleLogout,
    handleSignUp
}
}