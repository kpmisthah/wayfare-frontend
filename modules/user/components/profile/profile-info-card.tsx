import {MapPin} from "lucide-react";
import { useUserProfile } from "../../hooks/use-userprofile";
import { useAuthStore } from "@/store/Auth";
// import { EditForm } from "./edit-from";
export const ProfileCard = () => {
    const {
        connections,
        trips
    } = useUserProfile()
    const {user} = useAuthStore()
  return (
    <div className="flex-1 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user?.name}
          </h1>
          <div className="flex items-center gap-4 text-gray-600 mb-3">
            {user?.location ? (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {user?.location}
              </div>
            ) : (
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-1" />
                Add your location
              </div>
            )}
          </div>
          {/* <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <Award className="w-3 h-3 mr-1" />
                      {userProfile.level} Level
                    </Badge> */}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{trips.length}</div>
          <div className="text-sm text-gray-600">Trips</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {connections.length}
          </div>
          <div className="text-sm text-gray-600">Connections</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">4.9</div>
          <div className="text-sm text-gray-600">Rating</div>
        </div>
      </div>
    </div>
  );
};
