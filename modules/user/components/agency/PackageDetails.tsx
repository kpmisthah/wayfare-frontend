"use client"
import { useState } from "react";
import Link from "next/link"
import { Header } from "@/shared/components/layout/Header";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
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
  Activity
} from "lucide-react";
import { usePackage } from "../../hooks/use-agency";
import { useGenerateTrip } from "../../hooks/use-ai-trip-plan";

const PackageDetails = ({id}:{id:string}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const{packageById,isLoading} = usePackage(id)
  {console.log(packageById,'usePackage hhok')}
  const {handleBookNow} = useGenerateTrip()
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="relative">
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/agencies/1">
            <Button variant="secondary" size="sm" className="bg-background/90 backdrop-blur">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Agency
            </Button>
          </Link>
        </div>

        {/* Main Image */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={packageById?.picture[currentImageIndex]}
            alt={packageById?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="secondary" size="icon" className="bg-background/90 backdrop-blur">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" className="bg-background/90 backdrop-blur">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Image Gallery Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {packageById?.picture.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex gap-2 overflow-x-auto">
            {packageById?.picture.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  currentImageIndex === index ? 'border-primary' : 'border-white/50'
                }`}
              >
                <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Package Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{packageById?.title}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{packageById?.destination}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{packageById?.duration}</span>
                    </div>
                  </div>
                </div>
                {/* <Badge variant="secondary">{mockPackage.difficulty}</Badge> */}
              </div>

              {/* Rating and Reviews */}
              {/* <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{mockPackage.rating}</span>
                  <span className="text-muted-foreground ml-1">({mockPackage.reviewCount} reviews)</span>
                </div>
              </div> */}

              {/* Highlights */}
              <div className="flex flex-wrap gap-2">

                  <Badge variant="outline" className="text-xs">
                    {packageById?.highlights}
                  </Badge>
                
                {/* {mockPackage.highlights.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{mockPackage.highlights.length - 4} more
                  </Badge> */}
                {/* )} */}
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="logistics">Logistics</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Description</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {packageById?.description}
                    </p>
                    
                    <h4 className="font-semibold mb-3">Package Highlights</h4>
                    <ul className="space-y-2 mb-6">

                        <li className="flex items-start text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                          {packageById?.highlights}
                        </li>
               
                    </ul>
                    
                    <Separator className="my-6" />
                    
                    <p className="text-sm text-muted-foreground">
                      {packageById?.details}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Itinerary Tab */}
              <TabsContent value="itinerary" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Day-by-Day Itinerary</h3>
                    <div className="space-y-6">
                      {packageById?.itinerary.map((day, index) => (
                        <div key={index} className="border-l-2 border-primary/20 pl-6 relative">
                          <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                          <div className="mb-4">
                            <h4 className="font-semibold text-lg mb-2">{day.day}</h4>
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <Activity className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="font-medium text-sm">Activities</p>
                                  <p className="text-sm text-muted-foreground">{day.activities}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <Utensils className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="font-medium text-sm">Meals</p>
                                  <p className="text-sm text-muted-foreground">{day.meals}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <Hotel className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="font-medium text-sm">Accommodation</p>
                                  <p className="text-sm text-muted-foreground">{day.accommodation}</p>
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

              {/* Logistics Tab */}
              <TabsContent value="logistics" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Travel Logistics</h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <Car className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold mb-1">Vehicle</h4>
                          <p className="text-muted-foreground">{packageById?.vehicle}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <Navigation className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold mb-1">Pickup Point</h4>
                          <p className="text-muted-foreground">{packageById?.pickup_point}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold mb-1">Drop Point</h4>
                          <p className="text-muted-foreground">{packageById?.drop_point}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <Users className="h-6 w-6 text-primary mt-1" />
                        {/* <div>
                          <h4 className="font-semibold mb-1">Group Size</h4>
                          <p className="text-muted-foreground">{mockPackage.groupSize}</p>
                        </div> */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center">
                      <IndianRupee className="h-5 w-5" />
                      <span className="text-2xl font-bold">{packageById?.price}</span>
                    </div>
                    {packageById?.price && (
                      <>
                        <div className="flex items-center text-muted-foreground">
                          <IndianRupee className="h-4 w-4" />
                          <span className="text-lg line-through">{packageById?.price}</span>
                        </div>
                        {/* <Badge className="bg-primary">
                          {discount}% OFF
                        </Badge> */}
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Per person (all inclusive)</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span>Duration</span>
                    <span className="font-medium">{packageById?.duration}</span>
                  </div>
                  {/* <div className="flex items-center justify-between text-sm">
                    <span>Difficulty</span>
                    <Badge variant="outline" className="text-xs">{mockPackage.difficulty}</Badge>
                  </div> */}
                </div>

                <Button className="w-full mb-4" size="lg"
                onClick={(()=>packageById && handleBookNow(packageById.id,packageById.duration,"1"))}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
                
                <Button variant="outline" className="w-full">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  View Gallery
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;