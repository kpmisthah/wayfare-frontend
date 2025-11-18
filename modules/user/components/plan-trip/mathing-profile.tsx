import { Calendar, Check, MessageCircle, Users, Video, X } from "lucide-react";

type Traveler = {
    id: string,
    destination: string,
    startDate: string,
    name: string,
    profileImage: string,
    location: string
};

interface ProfileModalProps {
  traveler: Traveler;
  onClose: () => void;
  onConnect: (travelerId: string) => void;
  connectionStatus: "none" | "pending" | "connected";
}
interface TravelCompanionProfileProps {
  traveler: Traveler;
  onViewProfile: (traveler: Traveler) => void;
}

export function TravelCompanionProfile({ traveler, onViewProfile }:TravelCompanionProfileProps) {
  return (
    <div 
      onClick={() => onViewProfile(traveler)}
      className="bg-card rounded-xl shadow-md p-4 cursor-pointer hover:shadow-xl transition-all hover:scale-105"
    >
      <div className="flex flex-col items-center text-center">
        <img
          src={traveler.profileImage || '../../../../public/man-avatar-profile-male-face-silhouette-or-icon-isolated-on-white-background-vector.webp'}
          alt={traveler.name}
          className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-primary/20"
        />
        <h3 className="text-lg font-bold text-card-foreground mb-1">{traveler.name}</h3>
        <p className="text-sm text-muted-foreground mb-2"> •{traveler.location}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
          <Calendar className="w-3 h-3" />
          <span>{traveler.startDate}</span>
        </div>
        <div className="flex flex-wrap gap-1 justify-center">
          {/* {traveler.interests.slice(0, 2).map((interest, idx) => (
            <span key={idx} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
              {interest}
            </span>
          ))} */}
          {/* {traveler.interests.length > 2 && (
            <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
              +{traveler.interests.length - 2}
            </span>
          )} */}
        </div>
      </div>
    </div>
  );
}

// Detailed Profile Modal
export function ProfileModal({ traveler, onClose, onConnect, connectionStatus }:ProfileModalProps) {
  if (!traveler) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-card rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <img
            src={traveler.profileImage}
            alt={traveler.name}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-card-foreground mb-2">{traveler.name}</h2>
              <p className="text-lg text-muted-foreground">{traveler.destination}</p>
            </div>
            {connectionStatus === "connected" && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" />
                Connected
              </span>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">About</h3>
            {/* <p className="text-card-foreground">{traveler.bio}</p> */}
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Travel Dates</h3>
            <div className="flex items-center gap-2 text-card-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-medium">{traveler.startDate}</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Interests</h3>
            {/* <div className="flex flex-wrap gap-2">
              {traveler.interests.map((interest, idx) => (
                <span key={idx} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                  {interest}
                </span>
              ))}
            </div> */}
          </div>

          <div className="flex gap-3">
            {connectionStatus === "none" && (
              <button
                onClick={() => onConnect(traveler.id)}
                className="flex-1 py-3 px-6 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                Send Connection Request
              </button>
            )}
            
            {connectionStatus === "pending" && (
              <div className="flex-1 py-3 px-6 bg-secondary text-secondary-foreground rounded-lg font-semibold text-center">
                Request Pending...
              </div>
            )}
            
            {connectionStatus === "connected" && (
              <>
                <button className="flex-1 py-3 px-6 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Chat
                </button>
                <button className="flex-1 py-3 px-6 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <Video className="w-5 h-5" />
                  Video Call
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
