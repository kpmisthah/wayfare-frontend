"use client"
import { useState } from "react";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { PlaceCard } from "./PlaceCard";
import { cn } from "@/lib/utils";

interface Place {
  placeName: string;
  placeDetails: string;
  placeImageUrl: string;
  geoCoordinates: {
    latitude: string;
    longitude: string;
  };
  ticketPricing: string;
  rating: string;
  timeToTravel: string;
  bestTimeToVisit: string;
}

interface DayItineraryProps {
  day: string;
  places: Place[];
  isOpen?: boolean;
}

export function DayItinerary({ day, places, isOpen = false }: DayItineraryProps) {
  const [expanded, setExpanded] = useState(isOpen);

  return (
    <Card className="travel-shadow overflow-hidden">
      <Button
        variant="ghost"
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 justify-between hover:bg-muted/50 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{day}</h3>
            <p className="text-muted-foreground text-sm">
              {places.length} {places.length === 1 ? 'place' : 'places'} to visit
            </p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </Button>
      
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          expanded ? "max-h-none opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place, index) => (
              <PlaceCard key={index} place={place} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
  }