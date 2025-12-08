"use client";
import { useEffect, useState } from "react";
import { User } from "../../types/user.type";
export const useEditForm = (user?: User) => {
  const [formData, setFormData] = useState<Partial<User>>({
    name: user?.name || "",
    profileImage: user?.profileImage || "",
    email: user?.email || "",
    isBlock: user?.isBlock || false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        profileImage: user.profileImage,
        email: user.email,
        isBlock: user.isBlock,
      });
    }
  }, [user]);
  return {
    formData,
    setFormData,
    handleChange,
  };
};
