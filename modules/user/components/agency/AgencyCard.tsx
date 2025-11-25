import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Star, MapPin, Users, Calendar } from "lucide-react";

interface AgencyCardProps {
  id: string;
  name: string;
  image: string;
  // rating: number;
  // reviewCount: number;
  // location: string;
  // specialties: string[];
  // packageCount: number;
  // yearsExperience: number;
  description: string;
}

const AgencyCard = ({
  id,
  name,
  image,
  description,
}: AgencyCardProps) => {
  console.log(id,'agencyId');
  
  return (
    <Link href={`/agencies/${id}`} className="block">
      <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 bg-card cursor-pointer">
        <CardContent className="p-0">
          {/* Image */}
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={image && image.trim()!==''?image:'/images/agency-placeholder.jpg'}
              alt={name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-background/90 text-foreground">
                {yearsExperience}+ years
              </Badge>
            </div> */}
          </div>

          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                  {name}
                </h3>
                {/* <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {location}
                </div> */}
              </div>
              {/* <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{rating}</span>
                <span className="text-muted-foreground text-sm ml-1">({reviewCount})</span>
              </div> */}
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {description}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              {/* <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {packageCount} packages
              </div> */}
              {/* <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {reviewCount} reviews
              </div> */}
            </div>


            {/* Optional Button */}
            <Button className="w-full" variant="secondary">
              View Agency
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AgencyCard;
