// import axios, { AxiosError } from "axios";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// interface BackendResponse {
//   message: string;
//   user: {
//     id: string;
//     email: string;
//     name: string;
//   };
//   token: string;
// }

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn({user,account}){
//       try {
//         const response = await axios.post<BackendResponse>(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`,{
//           email:user.email,
//           name:user.name,
//           googleId:account?.providerAccountId
//         })
//         if(response.status == 200){
//         (user as any).accessToken = response.data.token
//         return true
//         }else{
//           console.error("Unexpected backend status:", response.status);
//           return false
//         }
//       } catch (error) {
//         const axiosError = error as AxiosError;
//         console.error("Error during Google sign-in:", axiosError.response?.data || error);
//         return false;

//       }
//     }
//   },
//   secret:process.env.NEXTAUTH_SECRET
// });
