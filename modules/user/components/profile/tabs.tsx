import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { PersonalInformation } from "./personal-information";
import { TravelPreferences } from "./travel-preferences";
import { useUserProfile } from "../../hooks/use-userprofile";
import { Connection } from "./tabs/connection";
import { Trips } from "./tabs/trip";
import { Wallet } from "./tabs/wallet";
import { Settings } from "./tabs/settings";
import ShortTrip from "./tabs/short-trip";
export const UserProfileTabs = () => {
  const { activeTab, setActiveTab } = useUserProfile();
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="flex justify-between w-full max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-1">
        <TabsTrigger
          value="overview"
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="trips"
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg"
        >
          Trips
        </TabsTrigger>

        <TabsTrigger
          value="shortTrips"
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg"
        >
          Short Trips
        </TabsTrigger>

        <TabsTrigger
          value="connections"
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg"
        >
          Connections
        </TabsTrigger>
        <TabsTrigger
          value="wallet"
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg"
        >
          Wallet
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg"
        >
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PersonalInformation />
          <TravelPreferences />
        </div>
      </TabsContent>

      {/* Trips Tab Content */}
      <Trips />

      <TabsContent value="shortTrips" className="space-y-6">
        <ShortTrip />
      </TabsContent>

      <Connection />
      <Wallet activeTab={activeTab}/>
      <Settings />
    </Tabs>
  );
};
