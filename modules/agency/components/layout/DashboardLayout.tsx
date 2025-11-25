// layouts/DashboardLayout.tsx
"use client";
import React, { useEffect } from "react";
import { Sidebar } from "./DashboardSidebar";
import { Header } from "./DashboradHeader";
import { useAuthStore } from "@/store/Auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const { user } = useAuthStore();
  
  return (
    <div className="min-h-screen bg-gray-50">
            {!user?.isVerified && (
        <div className="bg-orange-500 text-black font-semibold text-sm py-2 px-4 overflow-hidden relative">
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="mx-8">
              Your agency account is not verified yet.
            </span>
            <span className="mx-8">Please complete your profile.</span>
            <span className="mx-8">Wait for admin approval.</span>
            <span className="mx-8">
              Access is restricted until verification.
            </span>

            {/* Duplicate for seamless loop */}
            <span className="mx-8">
              Your agency account is not verified yet.
            </span>
            <span className="mx-8">Please complete your profile.</span>
            <span className="mx-8">Wait for admin approval.</span>
          </div>
        </div>
      )}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <div className="lg:ml-64">
        {/* Header */}
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Page content */}
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
