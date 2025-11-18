import { MapPin, Calendar, Users, DollarSign } from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { Header } from "@/shared/components/layout/Header";

interface ItineraryOverviewProps {
  destination: string;
  duration: string;
  budget: string;
  travelerType: string;
}

export function ItineraryOverview({ destination, duration, budget, travelerType }: ItineraryOverviewProps) {

  return (
    
    <Card className="travel-shadow p-6 mb-8 bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Your {destination} Adventure</h1>
          <p className="text-primary-light text-lg">Everything you need for an amazing trip</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <MapPin className="w-5 h-5 text-primary-light" />
            <div>
              <p className="text-xs text-primary-light">Destination</p>
              <p className="font-semibold">{destination}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <Calendar className="w-5 h-5 text-primary-light" />
            <div>
              <p className="text-xs text-primary-light">Duration</p>
              <p className="font-semibold">{duration}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <DollarSign className="w-5 h-5 text-primary-light" />
            <div>
              <p className="text-xs text-primary-light">Budget</p>
              <p className="font-semibold capitalize">{budget}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <Users className="w-5 h-5 text-primary-light" />
            <div>
              <p className="text-xs text-primary-light">Travelers</p>
              <p className="font-semibold capitalize">{travelerType}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}