"use client";

import { useEffect, useState } from "react";
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
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  Share2,
  Search,
  X,
} from "lucide-react";
import { useAgencyById, usePackages } from "../../hooks/use-agency";
import { fetchAgencyPackages } from "../../services/agency-packages.api";
import { fetchAgencyById } from "@/modules/agency/services/agency.api";

const mockReviews = [
  {
    id: "1",
    name: "Priya Sharma",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Absolutely amazing experience! The guides were knowledgeable and safety was their top priority.",
  },
  {
    id: "2",
    name: "Rahul Kumar",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    date: "1 month ago",
    comment:
      "Best trekking experience ever! Adventure Seekers made our Himalayan dream come true.",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    rating: 4,
    date: "2 months ago",
    comment:
      "Professional service and great value for money. Highly recommended for adventure enthusiasts!",
  },
];

const AgencyProfile = ({ id }: { id: string }) => {
  const [activeTab, setActiveTab] = useState("about");
  const { agency, setAgency } = useAgencyById(id)
  const { packages, /* setPackages, */ page, totalPages, loadMore, search, setSearch } = usePackages(id);

  // Packages are filtered on the backend now
  const filteredPackages = packages;
  useEffect(() => {
    async function fetchAgency() {
      let agency = await fetchAgencyById(id);
      setAgency(agency);
    }
    fetchAgency();
  }, []);

  if (!agency) return <p className="p-6">Agency not found</p>;
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Cover Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={agency?.user.image}
          alt="Cover Image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <div className="flex items-end gap-6">
              <Avatar className="w-24 h-24 border-4 border-background">
                <AvatarImage src={agency?.user.image} alt={agency?.user.name} />
                <AvatarFallback className="text-2xl">AS</AvatarFallback>
              </Avatar>

              <div className="flex-1 text-white">
                {/* <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{agency?.name}</h1>
                  <div className="flex items-center gap-4">
                    {agency?.certifications.map((cert, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-white/20 text-white border-white/30"
                      >
                        <Award className="h-3 w-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div> */}

                {/* <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{agency?.rating}</span>
                    <span className="opacity-80">
                      ({agency?.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{agency?.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{agency?.yearsExperience}+ years experience</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span> happy clients</span>
                  </div>
                </div> */}
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
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
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

                    {/* <h4 className="font-semibold mb-3">Our Services</h4> */}
                    {/* <ul className="grid grid-cols-1 md:grid-cols-2 gap-2"> */}
                    {/* {agency?.services.map((service, index) => (
                        <li
                          key={index}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                          {service}
                        </li>
                      ))} */}
                    {/* </ul> */}
                  </CardContent>
                </Card>

                {/* Specialties */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {/* {mockAgency.specialties.map((specialty, index) => ( */}
                      <Badge variant="outline">special</Badge>
                      {/* ))} */}
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

                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        {/* <div>
                          <p className="font-medium">Address</p>
                          <p className="text-sm text-muted-foreground">
                            {agency?.contact.address}
                          </p>
                        </div> */}
                      </div>
                    </div>

                    <Button className="w-full mt-6">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
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

            {filteredPackages.length > 0 ? (
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
                  This agency hasn’t added any travel packages yet. Please check
                  back later.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="mb-6">
              {/* <h3 className="text-2xl font-semibold mb-2">Customer Reviews</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-lg font-medium">{agency?.rating}</span>
                  <span className="text-muted-foreground ml-1">out of 5</span>
                </div>
                <span className="text-muted-foreground">
                  {/* ({agency?.reviewCount} reviews) */}
              {/* </span>
              </div> */}
            </div>

            <div className="space-y-4">
              {mockReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{review.name}</h4>
                          <span className="text-sm text-muted-foreground">
                            {review.date}
                          </span>
                        </div>

                        <div className="flex items-center mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                                }`}
                            />
                          ))}
                        </div>

                        <p className="text-muted-foreground">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgencyProfile;
