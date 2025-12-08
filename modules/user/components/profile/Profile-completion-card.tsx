import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Heart, MapPin, Sparkles, User } from "lucide-react";
import { useUserProfile } from "../../hooks/use-userprofile";
export const ProfileCompletionCard = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { userProfile } = useUserProfile() as any;

  return (
    <Card className="border-2 border-dashed border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 mb-6">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Complete Your Profile & Get Discovered!
            </h3>
            <p className="text-blue-700 mb-4">
              Add your travel preferences, location, and bio to connect with
              like-minded travelers and get personalized recommendations.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {!userProfile?.location && (
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-300"
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  Add Location
                </Badge>
              )}
              {!userProfile?.preference && (
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-300"
                >
                  <User className="w-3 h-3 mr-1" />
                  Add Bio
                </Badge>
              )}
              {(userProfile?.preference?.length ?? 0) === 0 && (
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-300"
                >
                  <Heart className="w-3 h-3 mr-1" />
                  Add Preferences
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
