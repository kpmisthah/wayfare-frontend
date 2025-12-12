"use client";
import { useState } from "react";
import Link from "next/link";
import { Header } from "@/shared/components/layout/Header";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  IndianRupee,
  Calendar,
  Car,
  Navigation,
  Star,
  Share2,
  Heart,
  Image as ImageIcon,
  Utensils,
  Hotel,
  Activity,
  Plus,
  Minus,
  CalendarDays,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Shield,
} from "lucide-react";
import { usePackage } from "../../hooks/use-agency";
import { useGenerateTrip } from "../../hooks/use-ai-trip-plan";
import { useEffect, useCallback } from "react";

const PackageDetails = ({ id }: { id: string }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [travelers, setTravelers] = useState(1);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const { packageById, isLoading } = usePackage(id);
  const [startDate, setStartDate] = useState("");
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Format date for display
  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  const { handleBookNow } = useGenerateTrip();

  // Gallery navigation functions
  const openGallery = (index: number = 0) => {
    setGalleryIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const nextImage = useCallback(() => {
    if (packageById?.picture) {
      setGalleryIndex((prev) =>
        prev === packageById.picture.length - 1 ? 0 : prev + 1
      );
    }
  }, [packageById?.picture]);

  const prevImage = useCallback(() => {
    if (packageById?.picture) {
      setGalleryIndex((prev) =>
        prev === 0 ? packageById.picture.length - 1 : prev - 1
      );
    }
  }, [packageById?.picture]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isGalleryOpen) return;

      switch (e.key) {
        case "Escape":
          closeGallery();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGalleryOpen, nextImage, prevImage]);


  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isGalleryOpen]);

  const incrementTravelers = () => {
    setTravelers((prev) => prev + 1);
  };

  const decrementTravelers = () => {
    setTravelers((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />

      {/* Modern Compact Hero Section */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        {/* Background Blur Effect */}
        <div
          className="absolute inset-0 opacity-30 blur-3xl scale-110"
          style={{ backgroundImage: `url(${packageById?.picture[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-slate-900/80" />

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6 order-2 md:order-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary hover:bg-primary/90 text-white border-0">
                  {packageById?.duration}
                </Badge>
                <div className="flex items-center text-slate-300 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {packageById?.destination}
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {packageById?.title}
              </h1>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-slate-300 border-slate-700 bg-slate-800/50">
                  {packageById?.highlights}
                </Badge>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="border-slate-600 text-black hover:bg-slate-800 hover:text-black"
                  onClick={() => openGallery(0)}
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  View Gallery
                </Button>
              
              </div>
            </div>

            {/* Right: Main Image & Thumbnails */}
            <div className="order-1 md:order-2 space-y-3">
              <div className="relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-700 group cursor-pointer" onClick={() => openGallery(currentImageIndex)}>
                <img
                  src={packageById?.picture[currentImageIndex]}
                  alt={packageById?.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {packageById?.picture.slice(0, 5).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border transition-all ${currentImageIndex === index
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-slate-700 opacity-70 hover:opacity-100"
                      }`}
                  >
                    <img src={image} className="w-full h-full object-cover" alt="thumb" />
                  </button>
                ))}
                {packageById?.picture && packageById.picture.length > 5 && (
                  <button
                    className="flex-shrink-0 w-20 h-14 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 text-xs hover:bg-slate-700 hover:text-white transition-colors"
                    onClick={() => openGallery(5)}
                  >
                    +{packageById.picture.length - 5}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Quick Stats Bar */}
            <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm sticky top-24 z-30 lg:hidden mb-6">
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price per person</p>
                  <div className="flex items-center text-primary font-bold text-xl">
                    <IndianRupee className="h-5 w-5" />
                    {packageById?.price}
                  </div>
                </div>
                <Button onClick={() => document.getElementById('booking-card')?.scrollIntoView({ behavior: 'smooth' })}>
                  Book Now
                </Button>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start h-auto p-1 bg-white border rounded-xl shadow-sm mb-6 overflow-x-auto flex-nowrap">
                <TabsTrigger
                  value="overview"
                  className="flex-1 min-w-[100px] h-10 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg transition-all"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="itinerary"
                  className="flex-1 min-w-[100px] h-10 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg transition-all"
                >
                  Itinerary
                </TabsTrigger>
                <TabsTrigger
                  value="logistics"
                  className="flex-1 min-w-[100px] h-10 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg transition-all"
                >
                  Logistics
                </TabsTrigger>
              </TabsList>

              <div className="animate-in slide-in-from-bottom-4 duration-500 fade-in">
                <TabsContent value="overview" className="mt-0">
                  <Card className="border-none shadow-md overflow-hidden">
                    <CardContent className="p-6 md:p-8 space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">Experience Description</h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                          {packageById?.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" /> Highlights
                          </h4>
                          <ul className="space-y-2">
                            <li className="flex items-start text-sm text-slate-700">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2.5 mt-2 flex-shrink-0" />
                              {packageById?.highlights}
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Activity className="h-5 w-5 text-blue-500" /> Key Details
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {packageById?.details}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="itinerary" className="mt-0">
                  <Card className="border-none shadow-md">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold">Your Journey</h3>
                        <Badge variant="outline" className="text-muted-foreground">
                          {packageById?.itinerary?.length} Days
                        </Badge>
                      </div>

                      <div className="space-y-0 relative before:absolute before:inset-y-0 before:left-[19px] before:w-0.5 before:bg-slate-200">
                        {packageById?.itinerary.map((day, index) => (
                          <div key={index} className="relative pl-12 pb-12 last:pb-0 group">
                            {/* Marker */}
                            <div className="absolute left-0 top-0 h-10 w-10 bg-white border-2 border-primary rounded-full text-primary font-bold flex items-center justify-center text-sm shadow-sm z-10 group-hover:scale-110 transition-transform">
                              {day.day}
                            </div>

                            {/* Card Body */}
                            <div className="bg-slate-50 hover:bg-white hover:shadow-md border border-slate-100 rounded-2xl p-5 transition-all duration-300">
                              <div className="grid gap-4">
                                <div className="flex items-start gap-4">
                                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <Activity className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-slate-900">Activities</h5>
                                    <p className="text-slate-600 mt-1">{day.activities}</p>
                                  </div>
                                </div>
                                <Separator className="bg-slate-200" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-orange-100 text-orange-600 rounded-md">
                                      <Utensils className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm text-slate-600">{day.meals}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-md">
                                      <Hotel className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm text-slate-600">{day.accommodation}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="logistics" className="mt-0">
                  <Card className="border-none shadow-md">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-6">Trip Logistics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-primary/10 text-primary rounded-lg">
                              <Car className="h-5 w-5" />
                            </div>
                            <h4 className="font-semibold">Transport</h4>
                          </div>
                          <p className="text-muted-foreground ml-12">{packageById?.vehicle}</p>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-primary/10 text-primary rounded-lg">
                              <Navigation className="h-5 w-5" />
                            </div>
                            <h4 className="font-semibold">Pickup</h4>
                          </div>
                          <p className="text-muted-foreground ml-12">{packageById?.pickup_point}</p>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-primary/10 text-primary rounded-lg">
                              <MapPin className="h-5 w-5" />
                            </div>
                            <h4 className="font-semibold">Drop-off</h4>
                          </div>
                          <p className="text-muted-foreground ml-12">{packageById?.drop_point}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div id="booking-card" className="sticky top-24 space-y-6">
              <Card className="border-none shadow-xl ring-1 ring-slate-900/5 bg-white/95 backdrop-blur overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="text-center mb-6">
                    <p className="text-muted-foreground text-sm uppercase tracking-wide font-medium mb-1">Total Price Per Person</p>
                    <div className="flex items-center justify-center text-primary">
                      <IndianRupee className="h-6 w-6" />
                      <span className="text-4xl font-bold tracking-tight">{packageById?.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Includes taxes & fees</p>
                  </div>

                  <div className="space-y-6">
                    {/* Date Picker */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-muted-foreground tracking-wider ml-1">Travel Date</label>
                      <div className="relative group">
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          min={getTodayDate()}
                          className="w-full bg-slate-50 border-slate-200 hover:border-primary/50 focus:border-primary rounded-xl p-3 pr-10 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none group-hover:text-primary transition-colors" />
                      </div>
                      {startDate && (
                        <p className="text-xs text-green-600 font-medium flex items-center gap-1.5 ml-1 animate-in fade-in">
                          <Check className="h-3 w-3" /> Selected: {formatDateDisplay(startDate)}
                        </p>
                      )}
                    </div>

                    {/* Travelers */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-muted-foreground tracking-wider ml-1">Travelers</label>
                      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={decrementTravelers}
                          disabled={travelers <= 1}
                          className="h-9 w-9 hover:bg-white hover:shadow-sm"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold text-lg min-w-[3ch] text-center">{travelers}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={incrementTravelers}
                          className="h-9 w-9 hover:bg-white hover:shadow-sm"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Summary */}
                    {travelers > 1 && (
                      <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-slate-700">Subtotal</span>
                          <span className="font-bold text-primary flex items-center"><IndianRupee className="h-3 w-3" /> {Number(packageById?.price) * travelers}</span>
                        </div>
                        <p className="text-xs text-muted-foreground text-right">for {travelers} travelers</p>
                      </div>
                    )}

                    <Button
                      className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                      size="lg"
                      disabled={!startDate}
                      onClick={() =>
                        packageById &&
                        handleBookNow(packageById.id, startDate, String(travelers))
                      }
                    >
                      Book Adventure
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </Button>
                  </div>

                  <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1.5">
                    <Shield className="h-3 w-3" /> Secure Booking Confirmation
                  </p>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <div className="bg-white/50 backdrop-blur rounded-xl p-4 border border-white/20 text-center space-y-3">
                <p className="text-sm font-medium text-slate-600">Need help booking?</p>
                <Button variant="outline" size="sm" className="w-full bg-white hover:bg-slate-50">
                  <Users className="h-4 w-4 mr-2" /> Contact Agency
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Gallery Modal - Keeping existing functionality */}
      {isGalleryOpen && packageById?.picture && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col animate-in fade-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 text-white">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold">{packageById.title}</h3>
              <span className="text-sm text-white/70 bg-white/10 px-3 py-1 rounded-full">
                {galleryIndex + 1} / {packageById.picture.length}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeGallery}
              className="text-white hover:bg-white/10 rounded-full"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Main Image */}
          <div className="flex-1 flex items-center justify-center px-4 relative group">
            {/* Previous Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-4 text-white hover:bg-white/10 h-14 w-14 rounded-full backdrop-blur-sm bg-black/20 hover:scale-110 transition-all"
            >
              <ChevronLeft className="h-10 w-10" />
            </Button>

            {/* Image */}
            <img
              src={packageById.picture[galleryIndex]}
              alt={`${packageById.title} - Image ${galleryIndex + 1}`}
              className="max-h-[85vh] max-w-full object-contain shadow-2xl"
            />

            {/* Next Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-4 text-white hover:bg-white/10 h-14 w-14 rounded-full backdrop-blur-sm bg-black/20 hover:scale-110 transition-all"
            >
              <ChevronRight className="h-10 w-10" />
            </Button>
          </div>

          {/* Thumbnail Strip */}
          <div className="p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex gap-2 justify-center overflow-x-auto pb-2">
              {packageById.picture.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setGalleryIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all transform ${galleryIndex === index
                    ? "border-primary scale-110 shadow-lg z-10"
                    : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                    }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetails;
