
import { Star, MapPin } from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";

interface Hotel {
  hotelName: string;
  hotelAddress: string;
  price: string;
  hotelImageUrl: string;
  geoCoordinates: {
    latitude: string;
    longitude: string;
  };
  rating: string;
  description: string;
}

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  return (
    <Card className="travel-shadow hover:travel-shadow-hover transition-all duration-300 overflow-hidden group">
      <div className="aspect-[4/3] overflow-hidden bg-muted relative">
        <img
          src={hotel.hotelImageUrl}
          alt={hotel.hotelName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop";
          }}
        />
        <div className="absolute top-4 left-4">
          <div className="rating-badge">
            <Star className="w-3 h-3 fill-current" />
            {hotel.rating}
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <div className="price-badge">
            {hotel.price}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-card-foreground">{hotel.hotelName}</h3>
        <div className="flex items-start gap-2 mb-3 text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{hotel.hotelAddress}</p>
        </div>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{hotel.description}</p>
        
        <div className="flex gap-3">
          {/* <Button variant="default" className="flex-1">
            View Details
          </Button> */}
          <Button variant="outline" className="flex-1">
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  );
}