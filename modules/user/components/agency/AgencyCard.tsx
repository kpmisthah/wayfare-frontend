"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  MapPin,
  ArrowRight,
  BadgeCheck,
  Building2,
  ExternalLink
} from "lucide-react";

interface AgencyCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  location?: string;
  specialization?: string[];
  packageCount?: number;
  isVerified?: boolean;
}

const AgencyCard = ({
  id,
  name,
  image,
  description,
  location,
  specialization = [],
  packageCount = 0,
  isVerified = true,
}: AgencyCardProps) => {

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Link href={`/agencies/${id}`} className="block group">
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-card via-card to-muted/30 shadow-md hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
        {/* Background decorative gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-bl-full opacity-60" />

        <CardContent className="p-6 relative">
          <div className="flex items-start gap-4 mb-4">
        
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/60 to-primary/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
              <Avatar className="relative w-16 h-16 border-2 border-background shadow-lg">
                <AvatarImage
                  src={image && image.trim() !== '' ? image : undefined}
                  alt={name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-lg font-bold">
                  {getInitials(name)}
                </AvatarFallback>
              </Avatar>

              {/* Verified badge */}
              {isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                  <BadgeCheck className="h-5 w-5 text-primary fill-primary/20" />
                </div>
              )}
            </div>

            {/* Agency Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold truncate group-hover:text-primary transition-colors duration-300">
                  {name}
                </h3>
              </div>

              {location && (
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                  <span className="truncate">{location}</span>
                </div>
              )}

              {/* Package count badge */}
              {packageCount > 0 && (
                <Badge variant="secondary" className="text-xs font-medium">
                  <Building2 className="h-3 w-3 mr-1" />
                  {packageCount} Packages
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {description || "Discover amazing travel experiences with this trusted agency."}
          </p>

          {specialization.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {specialization.slice(0, 3).map((spec, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs bg-primary/5 border-primary/20 text-primary hover:bg-primary/10"
                >
                  {spec}
                </Badge>
              ))}
              {specialization.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{specialization.length - 3} more
                </Badge>
              )}
            </div>
          )}

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />

          <Button
            className="w-full group/btn bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm"
            size="sm"
          >
            <span>View Agency</span>
            <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Button>
        </CardContent>

        {/* Bottom gradient accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </Link>
  );
};

export default AgencyCard;

