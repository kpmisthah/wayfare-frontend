// app/agency/page.tsx
"use client";

import React, { useState } from "react";
import DashboardLayout from "@/modules/agency/components/layout/DashboardLayout";
import { Dashboard } from "@/modules/agency/components/dashboard/DashboardOverview";
import { PackageManagement } from "@/modules/agency/components/packages/PackageManagement";
import { BookingManagement } from "@/modules/agency/components/bookings/BookingManagement";
import { AddPackage } from "@/modules/agency/components/packages/AddPackage";
import { AnalyticsFeedback } from "@/modules/agency/components/analytics/AnalyticsFeedback";
import AgencyProfile  from "@/modules/agency/components/profile/AgencyProfile";


const TravelAgencyDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "packages":
        return <PackageManagement />;
      case "bookings":
        return <BookingManagement />;
      case "add-package":
        return <AddPackage />;
      case "analytics":
        return <AnalyticsFeedback />;
      case "profile":
        return <AgencyProfile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isMobileMenuOpen={isMobileMenuOpen}
      setIsMobileMenuOpen={setIsMobileMenuOpen}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default TravelAgencyDashboard;
