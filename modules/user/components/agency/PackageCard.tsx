import { Button } from "@/shared/components/ui/button";
import { Card,CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Clock, MapPin, Users, IndianRupee } from "lucide-react";
import Link from "next/link";
import { PackageCardProps } from "../../types/package.type";

const PackageCard = ({
  id,
  title,
  image,
  duration,
  destination,
  price,
  highlights,

}: PackageCardProps) => {


  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image|| '/27478f342a4f36852244127ebf48b485.jpg'}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-6">
          {/* Title */}
          <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              {destination}
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {duration}
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {/* {highlights.slice(0, 3).map((highlight, index) => ( */}
                <Badge variant="outline" className="text-xs">
                  {highlights}
                </Badge>
              {/* ))} */}
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <IndianRupee className="h-4 w-4" />
                <span className="text-lg font-bold">{price.toLocaleString()}</span>
              </div>
              {/* {originalPrice && ( */}
                <div className="flex items-center text-muted-foreground">
                  <IndianRupee className="h-3 w-3" />
                  <span className="text-sm line-through">{price}</span>
                </div>
              {/* )} */}
            </div>
            <Link href={`/packages/${id}`}>
            <Button size="sm">
              View Details
            </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageCard;