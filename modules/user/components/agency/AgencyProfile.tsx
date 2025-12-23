"use client";

import { useState } from "react";
import { Header } from "@/shared/components/layout/Header";
import PackageCard from "./PackageCard";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Badge } from "@/shared/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  Phone,
  Mail,
  Globe,
  MessageCircle,
  Share2,
  Search,
  X,
  Loader2,
} from "lucide-react";
import { useAgencyById, usePackages } from "../../hooks/use-agency";


const AgencyProfile = ({ id }: { id: string }) => {
  const [activeTab, setActiveTab] = useState("about");
  const { agency, isLoading } = useAgencyById(id)
  const { packages, page, totalPages, loadMore, search, setSearch, isLoadingPackages } = usePackages(id);

  const filteredPackages = packages;

  // Show loading spinner while fetching agency data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading agency details...</p>
        </div>
      </div>
    );
  }

  if (!agency) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg text-muted-foreground">Agency not found</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Cover Image */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
        {agency?.user?.bannerImage ? (
          <img
            src={agency?.user?.bannerImage || ''}
            alt="Cover Image"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">
              {agency?.user?.name}
            </h1>
          </div>
        )}
        <div className="absolute inset-0 bg-black/40" />

        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <div className="flex items-end gap-6">
              <Avatar className="w-24 h-24 border-4 border-background">
                <AvatarImage src={agency?.user?.profileImage} alt={agency?.user?.name} />
                <AvatarFallback className="text-2xl">
                  {agency?.user?.name?.substring(0, 2).toUpperCase() || 'AG'}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-white">
                <h1 className="text-2xl md:text-3xl font-bold mb-1">
                  {agency?.user?.name}
                </h1>
              </div>

              <div className="flex gap-2">
                <Button variant="secondary">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">About Us</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {agency?.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Specialties */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Specialties</h3>
                    <div className="flex flex-wrap gap-2">

                      <Badge variant="outline">special</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">
                            {agency?.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">
                            {agency?.user.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Website</p>
                          <p className="text-sm text-muted-foreground">
                            {agency?.websiteUrl}
                          </p>
                        </div>
                      </div>

                    </div>

                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Packages Tab */}

          <TabsContent value="packages">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">Active Packages</h3>
              <p className="text-muted-foreground">
                Explore our carefully curated travel packages
              </p>
            </div>

            {/* Search Input */}
            <div className="relative max-w-md mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search packages by name or destination..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {isLoadingPackages ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground mt-4">Loading packages...</p>
              </div>
            ) : filteredPackages.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPackages.map((pkg) => (
                    <PackageCard
                      key={pkg.id}
                      id={pkg.id}
                      title={pkg.title}
                      image={pkg.picture?.[0] || ''}
                      duration={pkg.duration}
                      destination={pkg.destination}
                      price={pkg.price}
                      highlights={pkg.highlights}
                    />
                  ))}
                </div>
                {page < totalPages && (
                  <div className="text-center mt-6">
                    <button
                      onClick={loadMore}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-muted/30">
                <h4 className="text-lg font-semibold mb-2">
                  No Packages Available
                </h4>
                <p className="text-muted-foreground">
                  This agency hasn't added any travel packages yet. Please check
                  back later.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgencyProfile;
