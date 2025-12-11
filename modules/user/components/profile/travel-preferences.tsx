import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Check, Heart, Plane, Plus, Star, TrendingUp, UserPlus } from "lucide-react";
import { useAuthStore } from "@/store/Auth";
import { Button } from "@/shared/components/ui/button";
import { PreferenceTag } from "@/modules/admin/types/user.type";

export const TravelPreferences = () => {
  const { user } = useAuthStore();
  const preferences: PreferenceTag[] = user?.preference || [];
  return (
    <>
      <div className="space-y-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Travel Preferences
              </CardTitle>
              {preferences.length === 0 &&
                <p className="mb-2 italic">
                  No Preferences
                </p>
              }

            </div>
          </CardHeader>
          <CardContent>
            {preferences.length !== 0 &&
              (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {preferences.map((preference: PreferenceTag) => {
                      return (
                        <span key={preference.id} className="text-sm px-3 py-1">
                          {preference.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <TrendingUp className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Plane className="w-4 h-4 text-blue-600 mr-2" />
                <span>Booked trip to Bali</span>
              </div>
              <div className="flex items-center text-sm">
                <UserPlus className="w-4 h-4 text-green-600 mr-2" />
                <span>Connected with Sarah Johnson</span>
              </div>
              <div className="flex items-center text-sm">
                <Star className="w-4 h-4 text-yellow-600 mr-2" />
                <span>Rated Swiss Alps trip</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}