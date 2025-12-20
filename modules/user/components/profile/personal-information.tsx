"use client";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Edit3, Loader2, Mail, MapPin, Phone, Plus, User } from "lucide-react";
import { useUserProfile } from "../../hooks/use-userprofile";
import { useAuthStore } from "@/store/Auth";
export const PersonalInformation = () => {
  const {
    isEditingProfile,
    handleChange,
    setIsEditingProfile,
    handleSaveProfile,
    isSavingProfile,
  } = useUserProfile();
  const { user } = useAuthStore();
  console.log(user, "zustand user in personal-infromation in front end");

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center text-xl">
          <User className="w-5 h-5 mr-2" />
          Personal Information
        </CardTitle>

        {!isEditingProfile && (
          <Button
            onClick={() => setIsEditingProfile(true)}
            size="sm"
            variant="outline"
            className="hover:bg-blue-50 hover:border-blue-300"
          >
            <Edit3 className="w-4 h-4 mr-1" />
            Edit
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {isEditingProfile ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                value={user?.name}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={user?.email}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone
              </Label>
              <Input
                id="phone"
                value={user?.phone}
                onChange={handleChange}
                placeholder="Add your phone number"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-sm font-medium">
                Location
              </Label>
              <Input
                id="location"
                value={user?.location}
                onChange={handleChange}
                placeholder="Where are you based?"
                className="mt-1"
              />
            </div>
            <Button
              className="bg-blue-600 data-[state=active]:text-white rounded-lg"
              onClick={handleSaveProfile}
              disabled={isSavingProfile}
            >
              {isSavingProfile ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center">
              <User className="w-4 h-4 text-gray-500 mr-3" />
              <span>{user?.name}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-gray-500 mr-3" />
              <span>{user?.email}</span>
            </div>
            {user?.phone ? (
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-gray-500 mr-3" />
                <span>{user.phone}</span>
              </div>
            ) : (
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-3" />
                <span className="italic">Add your phone number</span>
                <Button
                  onClick={() => setIsEditingProfile(true)}
                  variant="ghost"
                  size="sm"
                  className="ml-2 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </div>
            )}
            {user?.location ? (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-gray-500 mr-3" />
                <span>{user?.location}</span>
              </div>
            ) : (
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-3" />
                <span className="italic">Add your location</span>
                <Button
                  onClick={() => setIsEditingProfile(true)}
                  variant="ghost"
                  size="sm"
                  className="ml-2 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
