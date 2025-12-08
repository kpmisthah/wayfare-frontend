
import { Star, Clock, DollarSign, MapPin } from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";

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

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  const isFree = (place.ticketPricing || "").toLowerCase().includes("free");

  return (
    <Card className="travel-shadow hover:travel-shadow-hover transition-all duration-300 overflow-hidden group">
      <div className="aspect-[4/3] overflow-hidden bg-muted relative">
        <img
          src={place.placeImageUrl}
          alt={place.placeName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop";
          }}
        />
        <div className="absolute top-4 left-4">
          <div className="rating-badge">
            <Star className="w-3 h-3 fill-current" />
            {place.rating}
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant={isFree ? "secondary" : "default"} className={isFree ? "bg-success text-success-foreground" : ""}>
            {place.ticketPricing || "N/A"}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <h4 className="text-lg font-semibold mb-2 text-card-foreground">{place.placeName}</h4>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{place.placeDetails}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{place.timeToTravel}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Best time: {place.bestTimeToVisit}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}