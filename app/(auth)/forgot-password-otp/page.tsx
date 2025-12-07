"use client"
import { UserForgotPassword } from "@/modules/auth/components/ForgotPasswordDialog";
import { useSearchParams } from "next/navigation";

export default function ForgotPassword() {
  const params = useSearchParams();
  const email = params.get("email") || "";
  return (
    <>
      <UserForgotPassword email={email}/>
    </>
  );
}
